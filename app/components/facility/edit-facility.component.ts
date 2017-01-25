import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Facility,Facilities } from '../../models/index';
import { FacilityService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-facility',
  templateUrl: 'app/templates/edit-facility.html',
})

export class EditFacilityComponent  {
	facility: Facility;
    model: any = {};
    id: string;
    myForm: FormGroup;
    start_time:any;
    name: any;

    days = [
        { value: 'monday', name: 'Monday' },
        { value: 'tuesday', name: 'Tuesday' },
        { value: 'wednesday', name: 'Wednesday' },
        { value: 'thursday', name: 'Thursday' },
        { value: 'friday', name: 'Friday' },
        { value: 'saturday', name: 'Saturday' },
        { value: 'sunday', name: 'Sunday' },
    ];

    constructor(private router: Router,
    	private facilityService: FacilityService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.myForm = this.formbuilder.group({
            name : ['', Validators.required],
            description : ['', Validators.required],
            facility_type : ['', Validators.required],
            payment_type : ['', Validators.required],
            booking_type : ['', Validators.required],
            booking_fee : ['', Validators.required],
            schedule: this.formbuilder.array([this.initSchedule()]),
            status: ['', Validators.required],
            created_by : [''],
            created_at : ['']
        });
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.facilityService.getById(this.id)
            .subscribe(facility => {
                this.facility = facility;
                this.myForm = this.formbuilder.group({
                    _id: [''],
                    name : ['', Validators.required],
                    development : [''],
                    description : ['', Validators.required],
                    facility_type : ['', Validators.required],
                    payment_type : ['', Validators.required],
                    booking_type : ['', Validators.required],
                    booking_fee : ['', Validators.required],
                    schedule: this.formbuilder.array([]),
                    status: ['', Validators.required],
                    maintenance: [''],
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
                        facility_type : ['', Validators.required],
                        payment_type : ['', Validators.required],
                        booking_type : ['', Validators.required],
                        booking_fee : ['', Validators.required],
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
                for (let entry of this.facility.schedule) {
                    const control = <FormArray>this.myForm.controls['schedule'];
                    control.push(this.initSchedule());
                }
                this.myForm.setValue(this.facility);
            });
        }
    }

    initSchedule() {
        return this.formbuilder.group({
            _id : [],
            day : [''],
            start_time : [this.start_time],
            end_time : ['']
        });
    }

    addSchedule() {
        const control = <FormArray>this.myForm.controls['schedule'];
        const scheduleCtrl = this.initSchedule();
        control.push(scheduleCtrl);
    }

    removeSchedule(i: number) {
        const control = <FormArray>this.myForm.controls['schedule'];
        control.removeAt(i);
    }

    createFacility(model:Facility) {
        console.log(model)
        this.facilityService.create(model)
        .then(
            response => {
                this.alertService.success('Create facility successful', true);
                this.router.navigate([this.name.default_development.name + '/facility']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }


    updateFacility(facility:Facility){
		this.facilityService.update(facility)
		.then(
			response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate([this.name.default_development.name + '/facility']);
            },
            error => {
            	this.alertService.error(error);
            }
        );
	}

    cancel(){
        this.router.navigate([this.name.default_development.name + '/facility' ]);
    }
}
