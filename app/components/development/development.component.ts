import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'development',
  template: ``,
})

export class DevelopmentComponent implements OnInit { 
	development: Development;
    developments: Development[] = [];
    model: any = {};

    constructor(private developmentService: DevelopmentService,private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllDevelopments();
    }
 
    deleteUser(id: string) {
        this.developmentService.delete(id) 
        // .subscribe(() => { this.loadAllUsers() });
        .subscribe(
			response => {
				if(response.error) { 
	                alert(`The development could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete development successful', true);
	                this.loadAllDevelopments()
	            }
            },
            error=> { 
                alert(`The Development could not be deleted, server Error.`);
            }
        );
    }

   
    private loadAllDevelopments() {
        this.developmentService.getAll().subscribe(developments => { this.developments = developments; console.log(developments) });
    }
}
