import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../services/index';
import { User } from '../../models/index';
import '../../rxjs-operators';

@Component({
    moduleId: module.id,
    templateUrl: '/app/templates/edit-user.html',
})
 
export class EditUserComponent {
    user: User;
    users: User[] = [];
    model: any = {};
 
    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService) {}
 
    createUser() {
        console.log(this.model);
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
}