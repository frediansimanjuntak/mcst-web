import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/index';
import { Router } from '@angular/router';
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
           ) { }

    ngOnInit() {
        // reset login status
        this.AuhtService.logout();
    }

    login() {
        this.loading = true;
        this.AuhtService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/user']);
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
