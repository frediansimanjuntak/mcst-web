import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { UnitService, AlertService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import '../../rxjs-operators';
// import { User } from '../../models/index';
// import { Unit } from '../../models/unit.interface';

@Component({
  moduleId: module.id,
  selector: 'edit-unit',
  templateUrl: '/app/templates/edit-unit.html'
})

export class EditUnitComponent implements OnInit { 
	development: Development;
    developments: Development[] = [];
    // model: any;
    public myForm: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
 

    constructor(private router: Router,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {
        
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.myForm = this.formbuilder.group({
            address: this.formbuilder.group({
                street: [''],
                postcode: [''],
                unit_no : [''],
                unit_no_2 : [''],
                block_no : [''],
                street_name : [''],
                postal_code : [''],
                country : [''],
                full_address : ['']
            }),
            status: [''],
            created_by: ['583e4e9dd97c97149884fef5']
        });
        this.subcribeToFormChanges();
    }
    

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    // save(model: Unit, isValid: boolean) {
    //     this.submitted = true; // set form submit to true

    //     // check if model is valid
    //     // if valid, call API to save customer
    //     console.log(model, isValid);
    // }

    createUnit(model: Development) {
        this.submitted = true;
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        console.log(model);
        this.unitservice.create(model)
        .subscribe(
            data => {
                this.alertService.success('Create Unit successful', true);
                this.router.navigate(['/newsletter']);
            },
            error => {
                console.log(error);
                alert(`The Unit could not be save, server Error.`);
            }
        );
    }

 //    updateNewsletter(){
	// 	this.unitservice.update(this.model)
	// 	.subscribe(
	// 		response => {
	// 			if(response.error) { 
	//                 this.alertService.error(response.error);
	//             } else {
	//                 // EmitterService.get(this.userList).emit(response.users);
 //                     this.alertService.success('Update newsletter successful', true);
 //                     this.router.navigate(['/newsletter']);
	//             }
 //            },
 //            error=> { 
 //            	this.alertService.error(error);
 //            }
 //        );
	// }
}
