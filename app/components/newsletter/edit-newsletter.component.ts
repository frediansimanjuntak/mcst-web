import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { NewsletterService, AlertService } from '../../services/index';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'edit-development',
  template: ``,
})

export class EditNewsletterComponent  { 
	development: Development;
    developments: Development[] = [];
    model: any = {};

    constructor(private router: Router,
    	private newsletterService: NewsletterService,
    	private alertService: AlertService) {}

    createUser() {
        console.log(this.model);
        this.newsletterService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success('Create development successful', true);
                this.router.navigate(['/development']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    updateUser(){
		this.newsletterService.update(this.model)
		.subscribe(
			response => {
				if(response.error) { 
	                this.alertService.error(response.error);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
                     this.alertService.success('Update development successful', true);
                     this.router.navigate(['/development']);
	            }
            },
            error=> { 
            	this.alertService.error(error);
            }
        );
	}
}
