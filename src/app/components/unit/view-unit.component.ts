import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService, AttachmentService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Location }               from '@angular/common';
import { Observable} from 'rxjs/Observable';


import 'rxjs/add/operator/switchMap';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  // moduleId: module.id,
  selector: 'view-unit',
  templateUrl: '../../templates/view-unit.html'
})

export class ViewUnitComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
    @ViewChild('secondModal') secondModal;
    @ViewChild('codeModal') codeModal;
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
    attachments: any;
    allUsers: any;
    codeType: string;
    modelForCode: any = {};
    model: any = {};
    data: any = {};
    filesToUpload: Array<File>;
    residents :any;
    resident :any;
    selectedResident : any = {};
    vehicles : any;
    vehicle :any;
    id: string;
    errorMessage: string;
    hasLandlord: boolean;
    hasTenants: boolean;
    tenantTotal: number;
    myForm: FormGroup;
    myForm2: FormGroup;
    valid: boolean;
    useAutocomplete: boolean;
    loading: boolean = true;
    name: any;
    filteredBrands: any[];
    username: string;
    makeAsDefaultProperty:string = 'no';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
    	private alertService: AlertService,
        private userService: UserService,
        private attachmentService :AttachmentService,
        private formbuilder: FormBuilder,
        private location: Location,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
         ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.errorMessage = "";
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.getUsers();
        });
        this.model.option = "new";                    
        this.model.document = [];
        this.useAutocomplete= false;
        // this.myForm = this.formbuilder.group({
        //         resident: [''],
        //         type: ['', <any>Validators.required],
        //         added_on: [''],
        //         remarks: [''],
        // });
        this.myForm2 = this.formbuilder.group({
                license_plate: ['', <any>Validators.required],
                owner: ['', <any>Validators.required],
                transponder: [''],
                document: [''],
                registered_on: [''],
                remarks: [''],
        });
        this.myForm = this.formbuilder.group({
                    username : ['', Validators.required],
                    email : ['', Validators.required],
                    phone : ['', Validators.required],
                    role : ['user'],
                    default_property: this.formbuilder.group({
                        property: [''],
                        role : ['']
                    }),
                    rented_property: this.formbuilder.group({
                        development: [''],
                        property: [this.id]
                    }),
                    remarks: [''],
                    details:  this.formbuilder.group({
                        first_name: [''],
                        last_name: [''],
                        identification_no: [''],
                    }),
                    owned_property: this.formbuilder.array([this.formbuilder.group({
                                                development: [''],
                                                property: [this.id]
                                            })
                    ]),
                    gender: ['Male', Validators.required],
                    salulation: ['', Validators.required]
                }); 
    }

    getUsers(): void {
        this.userService.getAll().subscribe(users => {
            this.allUsers =this.users = users;
            this.attachmentService.getAll().subscribe(attachments => {
                this.attachments =attachments;
                let roleFilter =  ['master' , 'super admin', 'admin', 'superadmin', 'super_admin'];
                for (var i = 0; i < roleFilter.length; i++) {
                    this.users = this.users.filter(data => data.role != roleFilter[i]); 
                }
                if( this.id != null) {
                        this.unitservice
                            .getById(this.id, this.name.default_development.name_url)
                                .subscribe(unit => {
                                    this.unit = unit.properties[0];
                                    this.residents = this.unit.tenant.data;
                                    this.tenantTotal = this.unit.tenant.data.length;
                                    this.vehicles = this.unit.vehicles;
                                    if(this.residents){
                                        this.hasTenants = true;
                                    }else{
                                        this.hasTenants = false;
                                    }

                                    if(this.unit.landlord.data){ 
                                        var landlordForResidentTable :any = {
                                        type : 'owner',
                                        i    :  1,
                                        resident : this.unit.landlord.data.resident,
                                        created_at : this.unit.landlord.data.created_at,
                                        remarks : this.unit.landlord.data.remarks
                                        }
                                        
                                        this.residents.unshift(landlordForResidentTable);
                                        this.hasLandlord = true;
                                        this.model.type  = 'tenant';
                                        this.myForm = this.formbuilder.group({
                                            username : ['', Validators.required],
                                            email : ['', Validators.required],
                                            phone : ['', Validators.required],
                                            role : ['user'],
                                            default_property: this.formbuilder.group({
                                                property: [''],
                                                role : ['']
                                            }),
                                            rented_property: this.formbuilder.group({
                                                development: [''],
                                                property: [this.id]
                                            }),
                                            details:  this.formbuilder.group({
                                                first_name: [''],
                                                last_name: [''],
                                                identification_no: [''],
                                            }),
                                            authorized_property: this.formbuilder.array([this.initAuthorized()]),
                                            remarks: [''],
                                            gender: ['Male', Validators.required],
                                            salulation: ['', Validators.required]
                                            });    
                                    }else{
                                        this.hasLandlord = false;
                                        this.model.type  = 'landlord'
                                        this.myForm = this.formbuilder.group({
                                            username : ['', Validators.required],
                                            email : ['', Validators.required],
                                            phone : ['', Validators.required],
                                            role : ['user'],
                                            default_property: this.formbuilder.group({
                                                property: [''],
                                                role : ['']
                                            }),
                                            details:  this.formbuilder.group({
                                                first_name: [''],
                                                last_name: [''],
                                                identification_no: [''],
                                            }),
                                            owned_property: this.formbuilder.array([this.initOwned()]),
                                            authorized_property: this.formbuilder.array([this.initAuthorized()]),
                                            remarks: [''],
                                            gender: ['Male', Validators.required],
                                            salulation: ['', Validators.required]
                                            });  
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
                                            this.vehicles[i].doc = this.attachments.find(data => data._id == this.vehicles[i].document);
                                        }
                                    }
                                    setTimeout(() => this.loading = false, 1000);
                                });
                }
            })
        });
    }

    public openDoc(file:any){
        if(file.type=="application/pdf"){
            this.attachmentService.downloadPDF(file.url).subscribe(
                (res) => {
                var fileURL = URL.createObjectURL(res);
                window.open(fileURL, '_blank');
                }
            );  
        }
        else if(file.type.indexOf("image")!==  -1){
            var myWindow = window.open("", file.name, "_blank");
            myWindow.document.write("<head><title>" + file.name + "</title></head>");
            myWindow.document.write("<img src=" + file.url + ">");
            return myWindow;
        }
    }

    public refreshValueResident(value:any):void {
        this.selectedResident = value;
    }

    public selected(value:any):void {
    }

    initOwned() {
        return this.formbuilder.group({
            development: [''],
            property: [this.id]
        }); 
    }

    initAuthorized() {
        return this.formbuilder.group({
            development: [''],
            property: ['']
        });
    }

    deleteResident(resident: any){
        this.loading = true
        if(resident.type == 'owner'){
            this.unitservice.deleteLandlord(this.unit._id, this.name.default_development.name_url)
            .then(
                response => {
                  if(response) {
                    console.log(response);
                    this._notificationsService.error(
                            'Error',
                            'Owner could not to delete, server error',
                    )
                    setTimeout(() => this.loading = false, 1000);
                  } else {
                    this._notificationsService.success(
                            'Success',
                            'Delete owner successful',
                    )
                    this.ngOnInit()
                  }
                },
                error=> {
                  console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Owner could not to delete, server error',
                    )
                    setTimeout(() => this.loading = false, 1000);
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
                    setTimeout(() => this.loading = false, 1000);
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
                    setTimeout(() => this.loading = false, 1000);
                }
            ); 
        }
        
    }

    deleteResidentConfirmation(resident) {
        if(resident.type == 'owner'){
            if(this.unit.tenant.data.length < 0){
                this.confirmationService.confirm({
                    message: 'Are you sure that you want to delete this owner?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.deleteResident(resident)
                    }
                });    
            }else if(this.unit.tenant.data.length > 0){
                this.confirmationService.confirm({
                    message: 'This unit has tenant, Are you sure that you want to delete this owner?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.deleteResident(resident)
                    }
                });
            }
                
        }else if(resident.type == 'tenant'){
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this tenant?',
                header: 'Delete Confirmation',
                icon: 'fa fa-warning',
                accept: () => {
                    this.deleteResident(resident)
                }
            });    
        }
        
    }

    deleteCodeConfirmation(type:string){
         this.confirmationService.confirm({
                    message: 'Are you sure that you want to delete this code?',
                    header: 'Delete Confirmation',
                    icon: 'fa fa-trash',
                    accept: () => {
                        this.deleteCode(type)
                    }
        });    
    }

    deleteVehicle(vehicle: any){
        this.loading = true
        this.unitservice.deleteRegVehicle(vehicle._id)
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
                    setTimeout(() => this.loading = false, 1000);
                }
            );
    }

    generateCode(){
        this.loading = true;
        this.loading = true
        this.modelForCode.type = this.codeType;
        this.unitservice.generateCode(this.unit._id, this.name.default_development.name_url, this.modelForCode)
            .then(
                 data => {
                    this._notificationsService.success(
                            'Success',
                            'Generate unit code successful',
                    )
                    this.loading = false;
                    this.codeModal.close();
                    this.modelForCode = {}
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Failed to generate code, server error',
                    )
                    this.codeModal.close();
                    this.loading = false;
                    this.loading = false
                    this.modelForCode = {}
                }
            );
    }

    deleteCode(type:string){
        this.loading = true
        this.modelForCode.type = type;
        this.unitservice.deleteCode(this.unit._id, this.name.default_development.name_url, this.modelForCode)
            .then(
                 data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete unit code successful',
                    )
                    this.codeModal.close();
                    this.modelForCode = {}
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Failed to delete code, server error',
                    )
                    this.codeModal.close();
                    this.loading = false
                    this.modelForCode = {}
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

    addResident(model: any){
        this.addSubmitted = true;
         if(this.model.type == "tenant" && !this.hasLandlord){
            this.errorMessage = "This unit did not has owner yet, please add owner first"
         }else if(this.model.type == "landlord" && this.hasLandlord){
            this.errorMessage = "This unit already has a owner, please remove owner first"
         }else if(this.tenantTotal >= this.unit.max_tenant){
            this.errorMessage = "This unit has reach max. number of tenant ( max :" + this.tenantTotal + ") , please remove a tenant first"
         }else if(this.tenantTotal < this.unit.max_tenant){
            this.createUser(model);
         }
    }

    addExistResident(){
        this.addSubmitted = true;
         if(this.model.type == "tenant" && !this.hasLandlord){
            this.errorMessage = "This unit did not has owner yet, please add owner first"
         }else if(this.model.type == "landlord" && this.hasLandlord){
            this.errorMessage = "This unit already has an owner, please remove owner first"
         }else if(this.model.type == "tenant" && this.tenantTotal >= this.unit.max_tenant){
            this.errorMessage = "This unit has reach max. number of tenant ( max :" + this.tenantTotal + ") , please remove a tenant first"
         }else {
             this.loading = true;
             this.loading = true
             this.data.id_user         = this.user._id;
             this.data.id_development  = this.name.default_development._id;
             this.data.id_property     = this.unit._id;
             this.data.type            = this.model.type;
             this.data.remarks         = this.model.remarks;
             var defaultProperty: string;
             var role: string;
             if(this.makeAsDefaultProperty == 'yes'){
                defaultProperty = this.id
                if(this.model.type == "tenant"){
                    role = "tenant";
                }else{
                    role = "owner";
                }
             }else{
                defaultProperty = this.user.default_property.property
                role = this.user.default_property.role
             }

             this.data.default_property = {
                 property: defaultProperty,
                 role: role
             }
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
                        this.username = '';
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
                        this.loading = false
                    }
            );
         }
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.document = files;
    }

    remove(i: any){
        this.model.document.splice(i, 1)
    }

    addVehicle(model: any, isValid: boolean){
         this.vehicleSubmitted = true;
         model.registered_on = new Date();

        if(isValid && this.model.document.length > 0){
            this.loading = true
            this.loading = true;
            let formData:FormData = new FormData();
                for (var i = 0; i < this.model.document.length; i++) {
                    formData.append("document[]", this.model.document[i]);
                }
            
            formData.append("license_plate", model.license_plate);
            formData.append("owner", model.owner);
            formData.append("transponder", model.transponder);
            formData.append("remarks", model.remarks);
            formData.append("property", this.unit._id);
            this.unitservice.createRegVehicle(formData)
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
                }
            );
        }
    }

    createUser(model:any) {
        this.loading= true;
        model.username = this.username;
        model.remarks = this.model.remarks;
        model.default_property = {
             property: this.id
        }
        if(this.model.type=='tenant'){
               model.rented_property.development = this.name.default_development._id;
             if(model.owned_property){
                 delete model.owned_property;
             }
        }

        if(this.model.type=='landlord'){
            if(model.rented_property){
                delete model.rented_property;
            }
            for (let i = 0; i < model.owned_property.length; i++) {
                model.owned_property[i].development = this.name.default_development._id;
            }
        }
        if(model.username && model.email && 
            model.phone && model.details.first_name && model.details.last_name && model.details.identification_no && model.salulation && model.gender)
            {
                this.loading = true;
                this.userService.createResident(model)
                .then(
                    data => {
                        this._notificationsService.success(
                                    'Success',
                                    'Create ' + this.model.type + ' successful',
                                )
                        this.firstModal.close();
                        this.addSubmitted = false;
                        this.loading = false;
                        this.useAutocomplete = false;
                        this.username = '';
                        this.ngOnInit();
                    },
                    error => {
                        var errorBody = JSON.parse(error._body)
                        var message = 'Data could not be save, server Error.';
                        if(errorBody.code == 11000){
                            message = 'Username Already exist';
                        }else if(errorBody.errors.email){
                            message = errorBody.errors.email.message;
                        }else if(errorBody.message){
                            message = errorBody.message;
                        }
                        this._notificationsService.error(
                                    'Error',
                                    message,
                            )
                        this.loading = false;
                    }
                );   
            }else{
                this.loading= false;
            }
        
    }


    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if(user.username.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(user);
            }
        }
        if(this.filteredBrands.length==0){
            this.useAutocomplete = false;
             this.myForm = this.formbuilder.group({
                    username : ['', Validators.required],
                    email : ['', Validators.required],
                    phone : ['', Validators.required],
                    role : ['user'],
                    default_property: this.formbuilder.group({
                        property: [''],
                        role : ['']
                    }),
                    rented_property: this.formbuilder.group({
                        development: [''],
                        property: [this.id]
                    }),
                    remarks: [''],
                    details:  this.formbuilder.group({
                        first_name: [''],
                        last_name: [''],
                        identification_no: [''],
                    }),
                    owned_property: this.formbuilder.array([this.formbuilder.group({
                                                development: [''],
                                                property: [this.id]
                                            })
                    ]),
                    gender: ['Male', Validators.required],
                    salulation: ['', Validators.required]
                });    
        }
    }

    onAutoCompleteChange(event){
        this.addSubmitted= false;
        this.useAutocomplete = true;
        this.user = event;
        this.myForm = this.formbuilder.group({
                    username :[{value: event.username, disabled: true}],
                    email : [{value: event.email, disabled: true}],
                    phone : [{value: event.phone, disabled: true}],
                    remarks: [''],
                    details:  this.formbuilder.group({
                        first_name:  [{value: event.details.first_name, disabled: true}],
                        last_name:  [{value: event.details.last_name, disabled: true}],
                        identification_no:  [{value: event.details.identification_no, disabled: true}],
                    }),
                    gender:  [{value: event.gender, disabled: true}],
                    salulation: [{value: event.salulation, disabled: true}]
                }); 
    }

    resetForm(){
         this.username= '';
         this.model.remarks= '';
         this.addSubmitted= false;
         this.useAutocomplete = false;
         this.myForm = this.formbuilder.group({
                    username : ['', Validators.required],
                    email : ['', Validators.required],
                    phone : ['', Validators.required],
                    role : ['user'],
                    default_property: this.formbuilder.group({
                        property: [''],
                        role : ['']
                    }),
                    rented_property: this.formbuilder.group({
                        development: [''],
                        property: [this.id]
                    }),
                    remarks: [''],
                    details:  this.formbuilder.group({
                        first_name: [''],
                        last_name: [''],
                        identification_no: [''],
                    }),
                    owned_property: this.formbuilder.array([this.formbuilder.group({
                                                development: [''],
                                                property: [this.id]
                                            })
                    ]),
                    gender: ['Male', Validators.required],
                    salulation: ['', Validators.required]
                });  
    }

    residentTypeChange(event){
        if(this.model.type=='tenant'){
            this.myForm = this.formbuilder.group({
                username : ['', Validators.required],
                email : ['', Validators.required],
                phone : ['', Validators.required],
                role : ['user'],
                default_property: this.formbuilder.group({
                    property: [''],
                    role : ['']
                }),
                rented_property: this.formbuilder.group({
                    development: [''],
                property: [this.id]
                }),
                details:  this.formbuilder.group({
                        first_name: [''],
                        last_name: [''],
                        identification_no: [''],
                    }),
                authorized_property: this.formbuilder.array([this.initAuthorized()]),
                remarks: [''],
                gender: ['Male', Validators.required],
                salulation: ['', Validators.required]
                });    
        }else{
            this.myForm = this.formbuilder.group({
                username : ['', Validators.required],
                email : ['', Validators.required],
                phone : ['', Validators.required],
                role : ['user'],
                default_property: this.formbuilder.group({
                    property: [''],
                    role : ['']
                }),
                details:  this.formbuilder.group({
                        first_name: [''],
                        last_name: [''],
                        identification_no: [''],
                }),
                owned_property: this.formbuilder.array([this.initOwned()]),
                authorized_property: this.formbuilder.array([this.initAuthorized()]),
                remarks: [''],
                gender: ['Male', Validators.required],
                salulation: ['', Validators.required]
                });  
        }
        this.useAutocomplete = false;
    }
    

}
