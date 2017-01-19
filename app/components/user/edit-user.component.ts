import { Component, OnInit ,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, UnitService } from '../../services/index';
import { User, Development, Users } from '../../models/index';
import { EqualValidator } from './equal-validator.directive';
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
        private unitService: UnitService) {}



    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.myForm = this.formbuilder.group({
            username : ['', Validators.required],
            email : ['', Validators.required],
            password : ['', Validators.required],
            confirmpassword : ['', Validators.required],
            phone : ['', Validators.required],
            role : ['', Validators.required],
            default_property: this.formbuilder.group({
                development: [''],
                property: [''],
                role : ['']
            }),
            rented_property: this.formbuilder.group({
                development: [''],
                property: ['']
            }),
            owned_property: this.formbuilder.array([]),
            authorized_property: this.formbuilder.array([]),
            active: ['', Validators.required],
            default_development: [''],
            authorized_development: ['']

        });
        this.unitService.getAll(this.name).subscribe(units => this.units = units)
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.userService.getUser(this.id)
            .then(user => {
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
                    details : this.formbuilder.group({
                        first_name : [''],
                        last_name : [''],
                        identification_type : [''],
                        identification_no : [''],
                        identification_proof : this.formbuilder.group({
                          front : [''],
                          back : ['']
                        })
                    }),
                    rented_property: this.formbuilder.group({
                        development: [''],
                        property: ['']
                    }),
                    owned_property: this.formbuilder.array([]),
                    authorized_property: this.formbuilder.array([]),
                    active: ['', Validators.required],
                    default_development: [''],
                    authorized_development: [''],
                    user_group : [''],
                    created_at : [''],
                });
                for (let entry of this.user.owned_property) {
                    const control = <FormArray>this.myForm.controls['owned_property'];
                    control.push(this.initOwned());
                }
                for (let entry of this.user.authorized_property) {
                    const control = <FormArray>this.myForm.controls['authorized_property'];
                    control.push(this.initAuthorized());
                }
                this.myForm.setValue(this.user);
            });
        };



        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    initOwned() {
        return this.formbuilder.group({
            development: ['585b36585d3cc41224fe518a'],
            property: ['']
        });
    }

    initAuthorized() {
        return this.formbuilder.group({
            development: ['585b36585d3cc41224fe518a'],
            property: ['']
        });
    }

    addOwned() {
        const control = <FormArray>this.myForm.controls['owned_property'];
        const ownedCtrl = this.initOwned();

        control.push(ownedCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeOwned(i: number) {
        const control = <FormArray>this.myForm.controls['owned_property'];
        control.removeAt(i);
    }

    addAuthorized() {
        const control = <FormArray>this.myForm.controls['authorized_property'];
        const authCtrl = this.initAuthorized();

        control.push(authCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeAuthorized(i: number) {
        const control = <FormArray>this.myForm.controls['authorized_property'];
        control.removeAt(i);
    }

    createUser(model:User , isValid: boolean) {
        this.userService.create(model)
        .then(
            data => {
                this.alertService.success('Create user successful', true);
                this.router.navigate([this.name.default_development.name + '/user']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    updateUser(user:User){
		this.userService.update(this.user)
		.then(
            response => {
                this.alertService.success('Update User successful', true);
                this.router.navigate([this.name.default_development.name + '/user']);
	        },
            error=> {
            	this.alertService.error(error);
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
        this.router.navigate([this.name.default_development.name + '/user' ]);
    }

    text(event: any) {
        const pattern = /[a-z\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}
