import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'edit-development',
  template: ``,
})

export class EditDevelopmentComponent  { 
	development: Development;
    developments: Development[] = [];
    model: any = {};

    constructor(private router: Router,
    	private developmentService: DevelopmentService,
    	private alertService: AlertService) {}

    createDevelopment() {
        console.log(this.model);
        this.developmentService.create(this.model)
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

    updateDevelopment(){
		this.developmentService.update(this.model)
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
