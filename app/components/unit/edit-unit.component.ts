import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Development } from '../../models/index';
import { UnitService, AlertService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
// import { User } from '../../models/index';
// import { Unit } from '../../models/unit.interface';

@Component({
  moduleId: module.id,
  selector: 'edit-unit',
  templateUrl: '/app/templates/edit-unit.html'
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
 

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {
        
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.unitservice
                .getDevelopments()
                   .then(development => {
                       this.units = development[0].properties
                       this.unit = this.units.find(unit => unit._id === this.id);
                       console.log(this.unit);

                       this.myForm = this.formbuilder.group({
                        address: this.formbuilder.group({
                            unit_no : [this.unit.address.unit_no],
                            unit_no_2 : [this.unit.address.unit_no_2],
                            block_no : [this.unit.address.block_no],
                            street_name : [this.unit.address.street_name],
                            postal_code : [this.unit.address.postal_code],
                            country : [this.unit.address.country],
                            full_address : [this.unit.address.full_address]
                        }),
                        _id: [this.unit._id],
                        status: [this.unit.status],
                        created_by: ['583e4e9dd97c97149884fef5']
                    })
                   });

            // this.unitservice
            //     .getById(this.id, this.developmentId)

            //     .subscribe((unit)=> {
            //     setTimeout(()=> {
                    
            //          this.unit = unit;
            //         // this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
                   
            //          this.myForm = this.formbuilder.group({
            //             address: this.formbuilder.group({
            //                 unit_no : [this.unit.properties[0].address.unit_no],
            //                 unit_no_2 : [this.unit.properties[0].address.unit_no_2],
            //                 block_no : [this.unit.properties[0].address.block_no],
            //                 street_name : [this.unit.properties[0].address.street_name],
            //                 postal_code : [this.unit.properties[0].address.postal_code],
            //                 country : [this.unit.properties[0].address.country],
            //                 full_address : [this.unit.properties[0].address.ful_address]
            //             }),
            //             _id: [this.unit.properties[0]._id],
            //             status: [this.unit.properties[0].status],
            //             created_by: ['583e4e9dd97c97149884fef5']
            //         })
            //     }, 1000);
            // });
                // console.log(this.unit);
               
        }else{
            this.myForm = this.formbuilder.group({
                address: this.formbuilder.group({
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
        }
        // this.subcribeToFormChanges();
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
                this.router.navigate(['/unit']);
            },
            error => {
                console.log(error);
                alert(`The Unit could not be save, server Error.`);
            }
        );
    }

     updateUnit(model: Development){
         console.log(model);
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
