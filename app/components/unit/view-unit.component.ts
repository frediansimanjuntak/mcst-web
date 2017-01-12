import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location }               from '@angular/common';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
// import { User } from '../../models/index';
// import { Unit } from '../../models/unit.interface';

@Component({
  // moduleId: module.id,
  selector: 'view-unit',
  templateUrl: 'app/templates/view-unit.html'
})

export class ViewUnitComponent implements OnInit {
    public items:Array<any> = [];
    public addSubmitted: boolean;
	unit: any;
    units: any;
    users: any;
    model: any = {};
    private resident :any = {};
    id: string;
    public developmentId;
    myForm: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    myOptions: Array<any>;
    status = [
        { value: 'inactive', name: 'Inactive' },
        { value: 'active', name: 'Active' }
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private userService: UserService,
        private formbuilder: FormBuilder,
        private location: Location ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.getUsers();
        this.developmentId = '585b36585d3cc41224fe518a';

        this.myForm = this.formbuilder.group({
                resident: ['', <any>Validators.required],
                type: ['', <any>Validators.required],
                added_on: ['', <any>Validators.required],
                social_page: ['', <any>Validators.required],
                remarks: ['', <any>Validators.required],
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


                        for (var i = 0; i < this.unit.tenant.length; i++) {
                            this.unit.tenant[i] = this.users.find(myObj => myObj._id ===  this.unit.tenant[i] );
                            this.unit.tenant[i].i = i+1;
                        }
                        console.log(this.unit.tenant[0]);
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

    getUsers(): void {
        this.userService.getUsers().then(users => {
            this.users = users;
            let numOptions =  this.users.length;
            let opts = new Array(numOptions);

            for (let i = 0; i < numOptions; i++) {
                opts[i] = {
                    id: this.users[i]._id,
                    text: this.users[i].username
                };
            }

            this.myOptions = opts.slice(0);
            this.items = this.myOptions;




        });
    }

    public refreshValueResident(value:any):void {
        this.resident = value;
    }

     public selected(value:any):void {
        // console.log('Selected value is: ', value);
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

    deleteResident(resident){
        console.log(resident);
    }

    openResidentDetail(resident: any){
        this.resident = resident;
    }


    addResident(model: any, isValid: boolean){
         this.addSubmitted = true;
       
        if(isValid == true){
            console.log(model);
            // this.visits.push(model);
            // this.firstModal.close();
            // console.log(model);
            // this.visitService.create(model)
            // .subscribe(
            //     data => {
            //         this.alertService.success('Add guest successful', true);
            //         this.router.navigate(['/unit']);
            //     },
            //     error => {
            //         console.log(error);
            //         alert(`Guest register could not be save, server Error.`);
            //     }
            // );
            this.addSubmitted = false;
        }
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
