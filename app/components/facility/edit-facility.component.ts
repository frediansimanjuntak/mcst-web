import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';  
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Facility,Facilities } from '../../models/index';
import { FacilityService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-facility',
  templateUrl: '/app/templates/edit-facility.html',
})

export class EditFacilityComponent  { 
	facility: Facility;
    model: any = {};
    id: string;
    myForm: FormGroup;
    start_time:any;
    
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
        private route: ActivatedRoute,) {}

    ngOnInit(): void { 
        this.myForm = this.formbuilder.group({
            _id : [''],
            name : ['', Validators.required],
            development : ['123123', Validators.required],
            description : ['', Validators.required],
            facility_type : ['', Validators.required],
            payment_type : ['', Validators.required],
            booking_type : ['', Validators.required],
            schedule: this.formbuilder.array([]),
            status: ['', Validators.required],
            maintenance_start : [''],
            maintenance_end : [''],
            created_by : [''],
            created_at : ['']   
        });  
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.facilityService.getFacility(this.id)
            .then(facility => {
                this.facility = facility;
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
        console.log('model=',this.model)
        Facilities.push(this.model);
        console.log('facilities=',Facilities);
        this.router.navigate(['/facility']);
        // console.log(model)
        // this.facilityService.create(model)
        // .then(
        //     response => {
        //         this.alertService.success('Update facility successful', true);
        //         this.router.navigate(['/facility']);
        //     },
        //     error => { 
        //         this.alertService.error(error);
        //     }
        // );
    }


    updateFacility(facility:Facility){
        console.log(facility)
		this.facilityService.update(facility)
		.then(
			response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate(['/development']);
            },
            error => { 
            	this.alertService.error(error);
            }
        );
	}
}
