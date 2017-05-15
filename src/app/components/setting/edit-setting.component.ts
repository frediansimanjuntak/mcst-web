import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, DevelopmentService } from '../../services/index';
import { User } from '../../models/index';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';


import { EqualValidator } from '../user/equal-validator.directive';

@Component({
    // moduleId: module.id,
    selector: 'edit-setting',
    templateUrl: '../../templates/edit-setting.html',
})

export class EditSettingComponent {
    user: User;
    loading: boolean = true;
    model: any = {};
    name: any;
    id: string;
    emailError: boolean = false;
    emailErrorMessage: string = 'any';
    oldPasswordError: boolean = false;
    oldPasswordErrorMessage: string = 'any';
    passwordValue: string
    passwordError: boolean = false;
    passwordErrorMessage: string = 'any';
    passwordConfirmationValue: string
    passwordConfirmationError: boolean = false;
    passwordConfirmationErrorMessage: string = 'any';
    valid: boolean = true;

    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        
        private _notificationsService: NotificationsService,
        private developmentService: DevelopmentService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.userService.getById(this.id)
            .subscribe(user => {
                this.user = user;
                setTimeout(() => this.loading = false, 1000);
            });
        };
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            setTimeout(() => this.loading = false, 1000);
        })
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    updateSetting(){
        if (this.valid) {
            this.loading = true
            this.userService.update(this.user)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Update setting successful',
                    )
                    this.router.navigate([this.name.default_development.name_url + '/user']);
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Update setting failed, server Error',
                    )
                    setTimeout(() => this.loading = false, 1000);
                }
            );
        }
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

    validate(event: any, field: any) {
        if (field == 'oldPassword') {
            if (event.target.value.length < 6) {
                this.oldPasswordError = true;
                this.valid = false
                this.oldPasswordErrorMessage = "Passwords at least 6 characters.";
            }else {
                this.oldPasswordError = false
                this.valid = true
            }
        }else if (field == 'newPassword') {
            this.passwordValue = event.target.value
            if (this.passwordValue.length < 6) {
                this.passwordError = true;
                this.valid = false
                this.passwordErrorMessage = "Passwords at least 6 characters.";
            }
            else {
                this.passwordError = false;
                if (this.passwordValue != this.passwordConfirmationValue) {
                    this.passwordConfirmationError = true;
                    this.valid = false
                    this.passwordConfirmationErrorMessage = "Passwords doesn't match.";
                }
                else {
                    this.passwordConfirmationError = false;
                    this.valid = true
                }
            }
        }else if (field == 'confirmPassword'){
            this.passwordConfirmationValue = event.target.value
            if (event.target.value.length < 6) {
                this.passwordConfirmationError = true;
                this.valid = false
                this.passwordConfirmationErrorMessage = "Passwords at least 6 characters.";
            }
            else {
                if (this.passwordConfirmationValue != this.passwordValue) {
                    this.passwordConfirmationError = true;
                    this.valid = false
                    this.passwordConfirmationErrorMessage = "Passwords doesn't match.";
                }
                else {
                    this.passwordConfirmationError = false;
                    this.valid = true
                }
            }
        }else {
            if (event.target.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                this.emailError = false;
                this.valid = true
            } else {
                this.emailError = true;
                this.valid = false
                this.emailErrorMessage = "Invalid email address.";
            }
        }
    }

    // onChange(event: any) {
    //     let files = [].slice.call(event.target.files);
    //     this.model.front =  files;
    // }

    // onChange1(event: any) {
    //    let files = [].slice.call(event.target.files);
    //    this.model.back =  files;
    // }

    // remove(i: any){
    //     this.model.front.splice(i, 1)
    // }

    // remove1(i: any){
    //     this.model.back.splice(i, 1)
    // }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/setting' ]);
    }
}
