import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Location }               from '@angular/common';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  // moduleId: module.id,
  selector: 'view-unit',
  templateUrl: 'app/templates/view-unit.html'
})

export class ViewUnitComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
    @ViewChild('secondModal') secondModal;
    public items:Array<any> = [];
    public addSubmitted: boolean = false;
    public vehicleSubmitted: boolean;
    public developmentId;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
	unit: any;
    units: any;
    user: any;
    users: any;
    allUsers: any;
    model: any = {};
    data: any = {};
    filesToUpload: Array<File>;
    residents :any;
    resident :any;
    selectedResident : any = {};
    vehicles : any;
    vehicle :any = {};
    id: string;
    errorMessage: string;
    hasLandlord: boolean;
    hasTenants: boolean;
    tenantTotal: number;
    loading: boolean;
    myForm: FormGroup;
    myForm2: FormGroup;
    valid: boolean;

    name: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private userService: UserService,
        private formbuilder: FormBuilder,
        private location: Location,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private appComponent: AppComponent, ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.getUsers();
                            });
        this.model.option = "new";                    
        this.model.document = [];
        this.myForm = this.formbuilder.group({
                resident: [''],
                type: ['', <any>Validators.required],
                added_on: [''],
                social_page: [''],
                remarks: [''],
        });

        this.myForm2 = this.formbuilder.group({
                license_plate: ['', <any>Validators.required],
                owner: ['', <any>Validators.required],
                transponder: [''],
                document: [''],
                registered_on: [''],
                remarks: [''],
        });
    }

    getUsers(): void {
        this.userService.getAll().subscribe(users => {
            this.allUsers =this.users = users;
            
            let roleFilter =  ['master' , 'super admin', 'admin'];
            for (var i = 0; i < roleFilter.length; i++) {
                this.users = this.users.filter(data => data.role != roleFilter[i]); 
            }
            if( this.id != null) {
                    this.unitservice
                        .getById(this.id, this.name.default_development.name_url)
                            .subscribe(unit => {

                                this.unit = unit.properties[0];
                                this.residents = this.unit.tenant;
                                this.tenantTotal = this.unit.tenant.length;
                                this.vehicles = this.unit.registered_vehicle;
                                
                                if(this.residents){
                                    this.hasTenants = true;
                                }else{
                                    this.hasTenants = false;
                                }

                                if(this.unit.landlord){ 
                                    var landlordForResidentTable :any = {
                                    type : 'owner',
                                    i    :  1,
                                    resident : this.unit.landlord
                                    }
                                    
                                    this.residents.unshift(landlordForResidentTable);
                                    this.hasLandlord = true;
                                    this.model.type  = 'tenant'
                                }else{
                                    this.hasLandlord = false;
                                    this.model.type  = 'landlord'
                                }

                                if(this.residents){
                                    for (var i = 0; i < this.residents.length; i++) {
                                        this.users = this.users.filter(data => data._id != this.residents[i].resident._id);
                                    }
                                    for (var i = 0; i < this.residents.length; i++) {
                                             this.residents[i].i = i + 1;
                                    }
                                }

                                if(this.vehicles){
                                    for (var i = 0; i < this.vehicles.length; i++) {
                                        this.vehicles[i].i = i + 1;
                                        this.vehicles[i].user = this.allUsers.find(data => data._id == this.vehicles[i].owner).username;
                                    }
                                }
                                setTimeout(() => this.appComponent.loading = false, 1000);
                                console.log(this.tenantTotal);
                            });
            }
        });
    }

    public refreshValueResident(value:any):void {
        this.selectedResident = value;
    }

    public selected(value:any):void {
    }

    deleteResident(resident: any){
        this.appComponent.loading = true
        if(resident.type == 'owner'){
            this.unitservice.deleteLandlord(this.unit._id, this.name.default_development.name_url, resident.resident)
            .then(
                response => {
                  if(response) {
                    console.log(response);
                    this._notificationsService.error(
                            'Error',
                            'Landlord could not to delete, server error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                  } else {
                    this._notificationsService.success(
                            'Success',
                            'Delete landlord successful',
                    )
                    this.ngOnInit()
                  }
                },
                error=> {
                  console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Landlord could not to delete, server error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            ); 
        }else if (resident.type == 'tenant'){
           this.unitservice.deleteTenant(resident._id, this.unit._id, this.name.default_development.name_url, resident.resident)
            .then(
                response => {
                  if(response) {
                    console.log(response);
                    this._notificationsService.error(
                            'Error',
                            'Resident could not to delete, server error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                  } else {
                    this._notificationsService.success(
                            'Success',
                            'Delete resident successful',
                    )
                    this.ngOnInit()
                  }
                },
                error=> {
                  console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Resident could not to delete, server error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            ); 
        }
        
    }

    deleteResidentConfirmation(resident) {
        console.log(resident)
        if(resident.type == 'owner'){
            if(this.unit.tenant.length < 0){
                this.confirmationService.confirm({
                    message: 'Are you sure that you want to delete this landlord?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.deleteResident(resident)
                    }
                });    
            }else if(this.unit.tenant.length > 0){
                this.confirmationService.confirm({
                    message: 'This unit has tenant, Are you sure that you want to delete this landlord?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.deleteResident(resident)
                    }
                });
            }
                
        }else if(resident.type == 'tenant'){
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this resident?',
                header: 'Delete Confirmation',
                icon: 'fa fa-warning',
                accept: () => {
                    this.deleteResident(resident)
                }
            });    
        }
        
    }

    deleteVehicle(vehicle: any){
        this.appComponent.loading = true
        this.unitservice.deleteRegVehicle(vehicle._id, this.unit._id, this.name.default_development.name_url)
            .then(
                 data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete Vehicle successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Data failed to delete, server error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }

    deleteVehicleConfirmation(vehicle) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this vehicle?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteVehicle(vehicle)
            }
        });
    }

    openResidentDetail(resident: any){
        this.resident = resident;
    }

    openVehicleDetail(vehicle: any){
        this.vehicle = vehicle;
    }

    goToUnit(){
        window.history.back();
    }

    addResident(){
        this.addSubmitted = true;
         if(this.model.type == "tenant" && !this.hasLandlord){
            this.errorMessage = "This unit did not has landlord yet, please add landlord first"
         }else if(this.model.type == "landlord" && this.hasLandlord){
            this.errorMessage = "This unit already has a landlord, please remove landlord first"
         }else if(this.model.option == 'new' && this.tenantTotal <= this.unit.max_tenant){
            this.router.navigate([this.name.default_development.name_url + '/user/add', this.unit._id, this.model.type]);  
         }else if(this.model.option == 'new' && this.tenantTotal >= this.unit.max_tenant){
            this.errorMessage = "This unit has reach max. number of tenant ( max :" + this.tenantTotal + ") , please remove a tenant first"
         }
    }

    addExistResident(){
        this.addSubmitted = true;
         if(this.model.type == "tenant" && !this.hasLandlord){
            this.errorMessage = "This unit did not has landlord yet, please add landlord first"
         }else if(this.model.type == "landlord" && this.hasLandlord){
            this.errorMessage = "This unit already has a landlord, please remove landlord first"
         }else if(this.model.type == "tenant" && this.tenantTotal >= this.unit.max_tenant){
            this.errorMessage = "This unit has reach max. number of tenant ( max :" + this.tenantTotal + ") , please remove a tenant first"
         }else {
             this.loading = true;
             this.appComponent.loading = true
             this.data.id_user         = this.model.user;
             this.data.id_development  = this.name.default_development._id;
             this.data.id_property     = this.unit._id;
             this.data.type            = this.model.type;
             this.unitservice.createResident(this.data)
                .then(
                    data => {
                        this._notificationsService.success(
                                'Success',
                                'Add Resident successful',
                        )
                        this.firstModal.close();
                        this.addSubmitted = false;
                        this.loading = false;
                        this.ngOnInit();
                    },
                    error => {
                        console.log(error);
                        this._notificationsService.error(
                                'Error',
                                'Data failed to save, server error',
                        )
                        this.firstModal.close();
                        this.loading = false;
                        this.appComponent.loading = false
                    }
            );
         }
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
         this.loading = true;
         model.registered_on = new Date();

        if(isValid && this.model.document.length > 0){
            this.appComponent.loading = true
            let formData:FormData = new FormData();
                for (var i = 0; i < this.model.document.length; i++) {
                    formData.append("document[]", this.model.document[i]);
                }
            
            formData.append("license_plate", model.license_plate);
            formData.append("owner", model.owner);
            formData.append("transponder", model.transponder);
            formData.append("remarks", model.remarks);

            this.unitservice.createRegVehicle(formData, this.name.default_development.name_url, this.unit._id)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Add Vehicle successful',
                    )
                    this.secondModal.close();
                    this.loading = false;
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Data failed to save, server error',
                    )
                    this.secondModal.close();
                    this.loading = false;
                    this.appComponent.loading = false
                }
            );
            this.vehicleSubmitted = false;
        }
        this.loading = true;
        this.vehicleSubmitted = false;
    }

}
