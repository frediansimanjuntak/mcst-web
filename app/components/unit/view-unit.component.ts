import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    filesToUpload: Array<File>;
    residents :any;
    resident :any = {};
    selectedResident : any = {};
    vehicles : any;
    vehicle :any = {};
    id: string;
    hasLandlord: boolean;
    hasTenants: boolean;
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
                                               this.unit = unit.properties[0];
                                               this.residents = this.unit.tenant;

                                               if(this.unit.landlord){
                                                   this.hasLandlord = true;
                                               }else{
                                                   this.hasLandlord = false;
                                               }

                                               if(this.residents){
                                                   this.hasTenants = true;
                                               }else{
                                                   this.hasTenants = false;
                                               }

                                                this.unitservice
                                                .getRegVehicles(this.id, this.name.default_development.name)
                                                   .subscribe(data => {
                                                       this.vehicles = data[0].properties[0].registered_vehicle;
                                                });
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
    }

    updateUnit(){
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

    deleteResident(resident: any){
        this.unitservice.deleteTenant(resident._id, this.unit._id, this.name.default_development.name)
    }

    deleteVehicle(vehicle: any){
         this.unitservice.deleteRegVehicle(vehicle._id, this.unit._id, this.name.default_development.name)   
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

    addResident(){
        this.router.navigate([this.name.default_development.name + '/user/add', this.unit._id, this.model.type]);  
    }

    onChange(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.document = this.filesToUpload;
    }

    remove(i: any){
        this.model.document.splice(i, 1)
    }

    addVehicle(model: any, isValid: boolean){
         this.vehicleSubmitted = true;
         model.registered_on = new Date();

        if(isValid && this.selectedResident){
            let formData:FormData = new FormData();
                for (var i = 0; i < this.model.document.length; i++) {
                    formData.append("document[]", this.model.document[i]);
                }
            
            formData.append("license_plate", model.license_plate);
            formData.append("owner", model.owner);
            formData.append("transponder", model.transponder);
            formData.append("remarks", model.remarks);

            this.unitservice.createRegVehicle(formData, this.name.default_development.name, this.unit._id)
            .then(
                data => {
                    this.alertService.success('Add guest successful', true);
                    this.router.navigate([this.name.default_development.name + '/unit']);
                },
                error => {
                    console.log(error);
                    alert(`Guest register could not be save, server Error.`);
                }
            );
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
