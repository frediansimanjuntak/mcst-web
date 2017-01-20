import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Location }               from '@angular/common';
import { Observable} from 'rxjs/Observable';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'view-unit',
  templateUrl: 'app/templates/view-unit.html'
})

export class ViewUnitComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
    @ViewChild('secondModal') secondModal;
    public items:Array<any> = [];
    public addSubmitted: boolean;
    public vehicleSubmitted: boolean;
    public developmentId;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
	unit: any;
    units: any;
    users: any;
    model: any = {};
    residents :any;
    resident :any = {};
    selectedResident : any = {};
    vehicles : any;
    vehicle :any = {};
    id: string;
    
    myForm: FormGroup;
    myForm2: FormGroup;
    myOptions: Array<any>;

    name: any;

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
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                if( this.id != null) {
                                    this.unitservice
                                        .getById(this.id, this.name.default_development.name)
                                           .subscribe(unit => {
                                               this.unit = unit.properties;
                                               console.log(unit.properties);
                                        });
                                }
                            });

        this.getUsers();

        this.myForm = this.formbuilder.group({
                resident: [''],
                type: ['', <any>Validators.required],
                added_on: [''],
                social_page: [''],
                remarks: [''],
        });

        this.myForm2 = this.formbuilder.group({
                license_plate: ['', <any>Validators.required],
                owner: [''],
                transponder: [''],
                document: [''],
                registered_on: [''],
                remarks: [''],
        });

        
        
            // this.unitservice
            //     .getDevelopments()
            //        .then(development => {
            //            this.units = development[0].properties
            //            this.unit = this.units.find(unit => unit._id === this.id);
            //            this.unit.owner = this.users.find(myObj => myObj._id ===  this.unit.landlord ).username;

            //            this.residents = this.unit.tenant;
            //            this.vehicles  = this.unit.registered_vehicle;

            //             for (var i = 0; i < this.residents.length; i++) {
            //                 this.residents[i].resident_name = this.users.find(myObj => myObj._id ===  this.residents[i].resident ).username;
            //                 this.residents[i].phone         = this.users.find(myObj => myObj._id ===  this.residents[i].resident ).phone;
            //                 this.residents[i].email         = this.users.find(myObj => myObj._id ===  this.residents[i].resident ).email;
            //                 this.residents[i].id            = this.residents[i].resident;
            //                 this.residents[i].text          = this.residents[i].resident_name;
            //                 this.residents[i].i = i+1;
            //             }

            //             for (var i = 0; i < this.vehicles.length; i++) {
            //                 this.vehicles[i].owner_name = this.users.find(myObj => myObj._id ===  this.vehicles[i].owner ).username;
            //                 this.vehicles[i].i = i+1;
            //             }

            //         });

            
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
        this.selectedResident = value;
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

    openVehicleDetail(vehicle: any){
        this.vehicle = vehicle;
    }

    goToUnit(){
        this.router.navigate([this.name.default_development.name + '/unit']);  
    }

    addResident(model: any, isValid: boolean){
         this.addSubmitted = true;
         model.resident = this.selectedResident.id;
         model.added_on = new Date();
        if(isValid && this.selectedResident){
            this.unit.tenant.push(model);
            this.firstModal.close();
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
            this.ngOnInit();
        }
    }


    addVehicle(model: any, isValid: boolean){
         this.vehicleSubmitted = true;
         model.owner = this.selectedResident.id;
         model.registered_on = new Date();
        if(isValid && this.selectedResident){
            this.unit.registered_vehicle.push(model);
            this.secondModal.close();
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
            this.vehicleSubmitted = false;
            this.ngOnInit();
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
