import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../services/index';
import { User } from '../../models/index';
import 'rxjs/add/operator/switchMap';
import '../../rxjs-operators';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/edit-user.html',
})
 
export class EditUserComponent {
    user: User;
    model: any = {};
    id: string;
 
    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService) {}

    ngOnInit(): void {   
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.userService.getById(this.id).subscribe(user => this.user = user);
        }
    }
 
    createUser() {
        console.log(this.model);
        this.userService.create(this.model)
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
		    this.userService.update(this.model)
		    .then(response => {
                  this.alertService.success('Update User successful', true);
                  this.router.navigate(['/user']);
	            },
              error=> { 
            	    this.alertService.error(error);
              }
        );
	  }
}