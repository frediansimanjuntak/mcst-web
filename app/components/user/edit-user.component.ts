import { Component, OnInit ,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, UnitService } from '../../services/index';
import { User, Development } from '../../models/index';
import { EqualValidator } from './equal-validator.directive';
import 'rxjs/add/operator/switchMap';
import '../../rxjs-operators';

@Component({
    moduleId: module.id,
    templateUrl: '/app/templates/edit-user.html',
})
 
export class EditUserComponent implements OnInit {
     @Input('group')
    user: User;
    model: any = {};
    id: string;
    developmentID = "585b36585d3cc41224fe518a";
    unit: Development;
    myForm: FormGroup;
    // developmentID: string;
 
    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private formbuilder: FormBuilder,
        private unitService: UnitService) {}



    ngOnInit(): void {
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
        let self = this; 
        this.unitService.getAll("585b36585d3cc41224fe518a")
            .subscribe(unit => {
                self.unit = unit;
                console.log(unit);
            });
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        
        if( this.id != null) {
            this.userService.getById(this.id).subscribe(user => {this.user = user;console.log(user);});
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

    createUser(model:User) {
        this.userService.create(model)
        .then(
            data => {
                this.alertService.success('Create user successful', true);
                this.router.navigate(['/user']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    updateUser(){
		this.userService.update(this.user)
		.then(
            response => {
                this.alertService.success('Update User successful', true);
                this.router.navigate(['/user']);
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

    text(event: any) {
        const pattern = /[a-z\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}