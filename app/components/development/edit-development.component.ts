import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'edit-development',
  templateUrl: '/app/templates/edit-development.html',
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
        .then(
            response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate(['/development']);
            },
            error => { 
                this.alertService.error(error);
            }
        );
    }

    updateDevelopment(){
		this.developmentService.update(this.model)
		.then(
			response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate(['/development']);
            },
            error => { 
            	this.alertService.error(error);
            }
        );
	}
}
