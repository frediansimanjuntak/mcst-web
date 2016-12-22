import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { UnitService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import '../../rxjs-operators';
import { User } from '../../models/index';

const TYPES: any[] = [
  { value: 'agm', name: 'AGM' },
  { value: 'circular', name: 'Circular' },
];

@Component({
  moduleId: module.id,
  selector: 'edit-unit',
  templateUrl: '/app/templates/edit-unit.html'
})

export class EditUnitComponent  { 
	development: Development;
    developments: Development[] = [];
    model: any;
    myForm: FormGroup;
    user: User;
    types = TYPES;

    constructor(private router: Router,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {
        
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.myForm = this.formbuilder.group({
            newsletter: this.formbuilder.group({
                title: [''],
                description: [''],
                type: [''],
                attachment: [''],
                released: [''],
                pinned: this.formbuilder.group({
                    rank: [''],
                }),
                released_by: [''],
                // created_by: [this.user._id],
                // if(released = "true" , released_by = "") {
                //     released_by = this.user._id
                // }
            })
        })
    }

    createUnit() {
        this.model.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        console.log(this.model);
        this.unitservice.create(this.model)
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
