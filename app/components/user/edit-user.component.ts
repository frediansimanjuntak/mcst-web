import { Component, OnInit ,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, UnitService } from '../../services/index';
import { User, Development, Users } from '../../models/index';
import { EqualValidator } from './equal-validator.directive';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationService } from 'primeng/primeng';
import { AppComponent } from '../index';
import 'rxjs/add/operator/switchMap';
import '../../rxjs-operators';

@Component({
    // moduleId: module.id,
    selector: 'edit-user',
    templateUrl: 'app/templates/edit-user.html',
})

export class EditUserComponent implements OnInit {
     @Input('group')
    user: User;
    users: User[] = [];
    model: any = {};
    id: string;
    type: string;
    developmentID = "585b36585d3cc41224fe518a";
    units: any[] = [];
    myForm: FormGroup;
    public submitted: boolean;
    name: any;
    // developmentID: string;

    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private formbuilder: FormBuilder,
        private unitService: UnitService,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private appComponent: AppComponent, ) {}



    ngOnInit(): void {
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name;
            this.unitService.getAll(this.name.default_development.name_url)
                            .subscribe(units => {
                                this.units = units.properties
                                setTimeout(() => this.appComponent.loading = false, 1000);
                            ;})
        })
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.type = params['type'];
        });
        if(this.id == null){
            this.myForm = this.formbuilder.group({
                username : ['', Validators.required],
                email : ['', Validators.required],
                password : ['', Validators.required],
                confirmpassword : ['', Validators.required],
                phone : ['', Validators.required],
                role : ['', Validators.required],
                default_property: this.formbuilder.group({
                    property: [''],
                    role : ['']
                }),
                rented_property: this.formbuilder.group({
                    property: ['']
                }),
                owned_property: this.formbuilder.array([this.initOwned()]),
                authorized_property: this.formbuilder.array([this.initAuthorized()]),
                active: ['', Validators.required],

            });
        }
        
        if( this.id != null &&  this.type == null) {
            this.userService.getById(this.id)
            .subscribe(user => {
                this.user = user;
                this.myForm = this.formbuilder.group({
                    _id : [''],
                    username : ['', Validators.required],
                    email : ['', Validators.required],
                    password : ['', Validators.required],
                    phone : ['', Validators.required],
                    role : ['', Validators.required],
                    default_property: this.formbuilder.group({
                        development: ['', Validators.required],
                        property: ['', Validators.required],
                        role : ['', Validators.required]
                    }),
                    rented_property: this.formbuilder.group({
                        development: [''],
                        property: ['']
                    }),
                    owned_property: this.formbuilder.array([]),
                    authorized_property: this.formbuilder.array([]),
                    active: ['', Validators.required],
                    default_development: [],
                    salt: [],
                    __v: [],
                });
                for (let i = 0; i < this.user.owned_property.length; i++) {
                    const control = <FormArray>this.myForm.controls['owned_property'];
                    control.push(this.initOwned());
                }
                for (let i = 0; i < this.user.authorized_property.length; i++) {
                    const control = <FormArray>this.myForm.controls['authorized_property'];
                    control.push(this.initAuthorized());
                }
                this.myForm.patchValue(this.user);
            });
        }else if( this.id != null &&  this.type != null){
            if(this.type == 'tenant'){
                this.myForm = this.formbuilder.group({
                    username : ['', Validators.required],
                    email : ['', Validators.required],
                    password : ['', Validators.required],
                    confirmpassword : ['', Validators.required],
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
                    authorized_property: this.formbuilder.array([this.initAuthorized()]),
                    active: [''],
                    });    
            }else if(this.type == 'landlord'){
                     this.myForm = this.formbuilder.group({
                    username : ['', Validators.required],
                    email : ['', Validators.required],
                    password : ['', Validators.required],
                    confirmpassword : ['', Validators.required],
                    phone : ['', Validators.required],
                    role : ['user'],
                    default_property: this.formbuilder.group({
                        property: [''],
                        role : ['']
                    }),
                    owned_property: this.formbuilder.array([this.initOwned()]),
                    authorized_property: this.formbuilder.array([this.initAuthorized()]),
                    active: [''],
                    });    
            }
            
        }
     // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    initOwned() {
        if(this.type == null || this.type == 'tenant'){
            return this.formbuilder.group({
                development: [''],
                property: ['']
            });    
        }else if(this.type != null && this.type == 'landlord'){
            return this.formbuilder.group({
                development: [''],
                property: [this.id]
            }); 
        }
        
    }

    initAuthorized() {
        return this.formbuilder.group({
            development: [''],
            property: ['']
        });
    }

    addOwned() {
        const control = <FormArray>this.myForm.controls['owned_property'];
        const ownedCtrl = this.initOwned();

        control.push(ownedCtrl);

    }

    removeOwned(i: number) {
        const control = <FormArray>this.myForm.controls['owned_property'];
        control.removeAt(i);
    }

    addAuthorized() {
        const control = <FormArray>this.myForm.controls['authorized_property'];
        const authCtrl = this.initAuthorized();

        control.push(authCtrl);

    }

    removeAuthorized(i: number) {
        const control = <FormArray>this.myForm.controls['authorized_property'];
        control.removeAt(i);
    }

    createUser(model:any , isValid: boolean) {
        if(this.type=='tenant'){
           model.rented_property.development = this.name.default_development._id;
           
        }

        if(this.type=='landlord'){
            for (let i = 0; i < model.owned_property.length; i++) {
                 model.owned_property[i].development = this.name.default_development._id;
            }
        }

        if(model.username && model.email && model.password && model.confirmpassword && 
           model.phone && model.role)
           {
            this.appComponent.loading = true;
            this.userService.create(model)
            .then(
                data => {
                    this._notificationsService.success(
                                'Success',
                                'Create ' + this.type + ' successful',
                            )
                    this.router.navigate([this.name.default_development.name_url + '/unit/view', this.id]);
                },
                error => {
                    this._notificationsService.error(
                                'Error',
                                'Data could not be save, server Error.',
                        )
                    this.appComponent.loading = false;
                }
            );   
        }
    }

    updateUser(user:User){
        this.userService.update(this.user)
        .then(
            response => {
                 this._notificationsService.success(
                                'Success',
                                'Update User successful',
                            )
                this.router.navigate([this.name.default_development.name_url + '/user']);
            },
            error=> {
                this._notificationsService.error(
                                'Error',
                                'Update failed, server Error.',
                        )
            }
        );
    }

    number(event: any) {
        const pattern = /[0-9\+\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/user' ]);
    }

    text(event: any) {
        const pattern = /[a-z\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}
