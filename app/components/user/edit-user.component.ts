import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../services/index';
import { User } from '../../models/index';
 
@Component({
    moduleId: module.id,
    template: `
    <div class="col-md-6 col-md-offset-3">
    <h1>Hi {{user.username}}!</h1>
    <p>You're logged in with Angular 2!!</p>
    <h3>All registered users:</h3>
    <ul>
        <li *ngFor="let user of users">
            {{user.username}}
            - <a (click)="deleteUser(user.id)">Delete</a>
        </li>
    </ul>
    <p><a [routerLink]="['/login']">Logout</a></p>
</div>
  `,
})
 
export class EditUserComponent {
    user: User;
    users: User[] = [];
    model: any = {};
 
    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
    }
 
    createUser() {
        this.userService.create(this.model)
        .subscribe(
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
		this.userService.update(this.model)
		.subscribe(
			response => {
				if(response.error) { 
	                this.alertService.error(response.error);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
                     this.alertService.success('Update User successful', true);
                     this.router.navigate(['/user']);
	            }
            },
            error=> { 
            	this.alertService.error(error);
            }
        );
	}

 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; console.log(users) });
    }
}