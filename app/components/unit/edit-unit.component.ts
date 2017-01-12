import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location }               from '@angular/common';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
// import { User } from '../../models/index';
// import { Unit } from '../../models/unit.interface';

@Component({
  // moduleId: module.id,
  selector: 'edit-unit',
  templateUrl: 'app/templates/edit-unit.html'
})

export class EditUnitComponent implements OnInit {
	unit: any;
    units: any;

    model: any = {};
    id: string;
    public developmentId;
    myForm: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    status = [
        { value: 'inactive', name: 'Inactive' },
        { value: 'active', name: 'Active' }
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private location: Location ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.developmentId = '585b36585d3cc41224fe518a';

        this.myForm = this.formbuilder.group({
                address: this.formbuilder.group({
                    unit_no : ['',  <any>Validators.required],
                    unit_no_2 : ['', <any>Validators.required],
                    block_no : ['', <any>Validators.required],
                    street_name : ['', <any>Validators.required],
                    postal_code : ['', <any>Validators.required],
                    country : ['', <any>Validators.required],
                    full_address : ['', <any>Validators.required]
                }),
                status: ['', <any>Validators.required],
                created_by: ['583e4e9dd97c97149884fef5']
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.unitservice
                .getDevelopments()
                   .then(development => {
                       this.units = development[0].properties
                       this.unit = this.units.find(unit => unit._id === this.id);
                    });
        }
    }

    createUnit(model: Development, isValid: boolean) {
        this.submitted = true;
        console.log(Developments[0]);
        Developments[0].properties.push(model);
        console.log(Developments[0].properties);
        this.router.navigate(['/unit']);
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        if(isValid == true){
            console.log(model);
            this.unitservice.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Create Unit successful', true);
                    this.router.navigate(['/unit']);
                },
                error => {
                    console.log(error);
                    alert(`The Unit could not be save, server Error.`);
                }
            );
        }
    }

     updateUnit(){
         console.log(this.unit);
        // this.unitservice.update(model)
        // .then(
        //     response => {
        //         this.alertService.success('Update development successful', true);
        //         this.router.navigate(['/development']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
    }

    goBack(): void {
        this.location.back();
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
