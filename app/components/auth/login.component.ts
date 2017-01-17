import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/index';
import { Router } from '@angular/router';
import { AppComponent } from '../index';

@Component({
    // moduleId: module.id,
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: 'app/templates/login.html',
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    public errorMsg = '';


    constructor(
        private router: Router,
        private AuhtService: AuthenticationService,
        private appComponent: AppComponent,
           ) { }

    ngOnInit() {
        // reset login status
        this.AuhtService.logout();
        this.appComponent.ngOnInit();
    }

    login() {
        this.loading = true;
        this.AuhtService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.appComponent.ngOnInit();
                    this.router.navigate(['/dashboard']);
                }
                else {
                    // login failed
                    this.errorMsg = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    logError(err: any) {
        console.log(err);
    }
}
