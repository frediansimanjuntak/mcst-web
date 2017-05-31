import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Facility,Facilities } from '../../models/index';
import { FacilityService, AlertService, UserService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';

import 'rxjs/add/operator/switchMap';
import { TimepickerConfig } from 'ng2-bootstrap';


export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
	hourStep: 1,
	minuteStep: 0,
	showMeridian: false,
	readonlyInput: false,
	mousewheel: true,
	arrowkeys: true
  });
}

@Component({
  // moduleId: module.id,
  selector: 'edit-facility',
  templateUrl: '../../templates/edit-facility.html',
  providers: [{provide: TimepickerConfig, useFactory: getTimepickerConfig}]
})

export class EditFacilityComponent  {
	facility: Facility;
	model: any = {};
	id: string;
	myForm: FormGroup;
	start_time:any;
	name: any;
	time: any[] = [];
	choosedDay: any[] = [];
	schedule: any[] = [];
	valid:any[];
    loading: boolean = true;
	days = [
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']},
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']},
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']},
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']},
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']},
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']},
		{ day:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']}
	];
		// { value: 'monday', name: 'Monday' },
		// { value: 'tuesday', name: 'Tuesday' },
		// { value: 'wednesday', name: 'Wednesday' },
		// { value: 'thursday', name: 'Thursday' },
		// { value: 'friday', name: 'Friday' },
		// { value: 'saturday', name: 'Saturday' },
		// { value: 'sunday', name: 'Sunday' },
	

	constructor(private router: Router,
		private facilityService: FacilityService,
		private alertService: AlertService,
		private formbuilder: FormBuilder,
		private route: ActivatedRoute,
		
		private _notificationsService: NotificationsService,
		private userService: UserService) {}

	ngOnInit(): void {
		this.schedule.length = 1;
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		if( this.id != null) {
			this.facilityService.getById(this.id)
			.subscribe(facility => {
				this.facility = facility;
				this.schedule.length = this.facility.schedule.length;
				this.myForm = this.formbuilder.group({
					_id: [''],
					name : ['', Validators.required],
					development : [''],
					description : ['', Validators.required],
					payment_type : ['', Validators.required],
					booking_type : ['', Validators.required],
					fee: this.formbuilder.group({
		                deposit : ['', Validators.required],
						booking : ['', Validators.required],
						admin : ['', Validators.required],
		            }),
					schedule: this.formbuilder.array([]),
					status: ['', Validators.required],
					maintenance: this.formbuilder.group({
						start_date: [''],
						end_date: ['']
					}),
					created_by : [''],
					created_at : [''],
					__v : [''],
				});
				if(this.facility.maintenance.length) {
					this.myForm = this.formbuilder.group({
						_id: [''],
						name : ['', Validators.required],
						development : [''],
						description : ['', Validators.required],
						payment_type : ['', Validators.required],
						booking_type : ['', Validators.required],
						fee: this.formbuilder.group({
			                deposit : ['', Validators.required],
							booking : ['', Validators.required],
							admin : ['', Validators.required],
			            }),
						schedule: this.formbuilder.array([]),
						status: ['', Validators.required],
						maintenance: this.formbuilder.group({
							start_date: [''],
							end_date: ['']
						}),
						created_by : [''],
						created_at : [''],
						__v : [''],
					});
				}

				for (let i = 0; i < this.facility.schedule.length; i++) {
					const control = <FormArray>this.myForm.controls['schedule'];
					control.push(this.initSchedule());
				}
				this.myForm.patchValue(this.facility);
				setTimeout(() => this.loading = false, 1000);
			});
		}
		this.userService.getByToken()
		.subscribe(name => {
			this.name = name.user;
			if(this.id == null) {
				setTimeout(() => this.loading = false, 1000);
			}
		})
		for (let i = 0; i < 24; ++i) {
			let time = i.toString();
			if(i < 10) {
				time = '0' + i
			}
			this.time.push(time+':00')
		}
		this.myForm = this.formbuilder.group({
			name : ['', Validators.required],
			description : ['', Validators.required],
			payment_type : ['', Validators.required],
			booking_type : ['', Validators.required],
			fee: this.formbuilder.group({
                deposit : ['', Validators.required],
				booking : ['', Validators.required],
				admin : ['', Validators.required],
            }),
			schedule: this.formbuilder.array([this.initSchedule()]),
			status: ['', Validators.required],
			created_by : [''],
			created_at : ['']
		});
	}

	initSchedule() {
		return this.formbuilder.group({
			_id : [],
			day : ['', Validators.required],
			start_time : ['', Validators.required],
			end_time : ['', Validators.required]
		});
	}

	addSchedule() {
		const control = <FormArray>this.myForm.controls['schedule'];
		const scheduleCtrl = this.initSchedule();
		control.push(scheduleCtrl);
		this.schedule.push(control.length);
	}

	removeSchedule(i: number) {
		const control = <FormArray>this.myForm.controls['schedule'];
		control.removeAt(i);
	}

	createFacility(model:any) {
		this.loading = true
		this.valid = []
		for (let a = 0; a < model.schedule.length; ++a) {
			if(model.schedule[a].start_time < model.schedule[a].end_time && model.schedule[a].end_time > model.schedule[a].start_time) {
				this.valid.push(true)
			}else{
				this.valid.push(false)
			}
		}
		var i = this.valid.indexOf(false);
		if(i == -1) {
			this.facilityService.create(model)
			.then(
				response => {
					this._notificationsService.success('Success', 'Create facility successful')
					this.router.navigate([this.name.default_development.name_url + '/facility']);
				},
				error => {
                	if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
					
					setTimeout(() => this.loading = false, 1000);
				}
			);
		}else{
			setTimeout(() => this.loading = false, 1000);
		}
	}

	getDay(day,a){
		this.choosedDay.push(day)
		for (let z = 0; z < this.choosedDay.length; ++z) {
			var i = this.days[a+1].day.indexOf(this.choosedDay[z]);
			if(i != -1) {
				this.days[a+1].day.splice(i, 1);
			}
		}
	}


	updateFacility(facility:any){
		this.loading = true
		this.valid = []
		for (let a = 0; a < facility.schedule.length; ++a) {
			if(facility.schedule[a].start_time < facility.schedule[a].end_time && facility.schedule[a].end_time > facility.schedule[a].start_time) {
				this.valid.push(true)
			}else{
				this.valid.push(false)
			}
		}
		var i = this.valid.indexOf(false);
		if(i == -1) {
			this.facilityService.update(facility)
			.then(
				response => {
					this._notificationsService.success('Success', 'Update facility successful')
					this.router.navigate([this.name.default_development.name_url + '/facility']);
				},
				error => {
                	if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
					
					setTimeout(() => this.loading = false, 1000);
				}
			);
		}else{
			setTimeout(() => this.loading = false, 1000);
		}
	}

	number(event: any) {
		const pattern = /[0-9\+\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();
		}
	}

	cancel(){
		this.router.navigate([this.name.default_development.name_url + '/facility' ]);
	}
}
