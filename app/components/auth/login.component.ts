import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../index';
import { NotificationsService } from 'angular2-notifications';

@Component({
    // moduleId: module.id,
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'app/templates/login.html',
    styles: [`
        body
        {
            background-color: #30333e;
        }

        .form-signin
        {
            max-width: 330px;
            padding: 15px;
            margin: 0 auto;
        }

        .form-signin .form-signin-heading, .form-signin .checkbox
        {
            margin-bottom: 10px;
        }
        .form-signin .checkbox
        {
            font-weight: normal;
        }
        .form-signin .form-control
        {
            position: relative;
            font-size: 16px;
            height: auto;
            padding: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .form-signin .form-control:focus
        {
            z-index: 2;
        }
        .form-signin input[type="text"]
        {
            margin-bottom: -1px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
        .form-signin input[type="password"]
        {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        .account-wall
        {
            margin-top: 20px;
            padding: 40px 0px 20px 0px;
            background-color: #b6ad96;
            -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        }
        .login-title
        {
            color: #555;
            font-size: 18px;
            font-weight: 400;
            display: block;
        }
        .profile-img
        {
            margin: 0 auto 10px;
            display: block;
        }
        .need-help
        {
            margin-top: 10px;
        }
        .new-account
        {
            display: block;
            margin-top: 10px;
        }
    `]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    name:any;
    authToken:any;
    public errorMsg = '';

    constructor(
        private router: Router,
        private AuthService: AuthenticationService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService,
        private userService: UserService   ) { }

    ngOnInit() {
        // reset login status
        setTimeout(() => this.appComponent.loading = false, 1000);  
    }

    login() {
        this.loading = true;
        this.AuthService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.userService.getByToken()
                    .subscribe(name => {
                        this.name = name;
                        this.appComponent.getToken()
                        this.router.navigate([this.name.default_development.name_url, 'dashboard']);
                    })
                },
                error => {
                    setTimeout(() => this.loading = false, 1000);
                    this.error = 'Username or password is incorrect';
                    this._notificationsService.error(
                        'Login Failed',
                        this.error,
                    )
                });
    }
}
