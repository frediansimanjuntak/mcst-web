import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { NewsletterService, AlertService } from '../../services/index';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'development',
  template: ``,
})

export class NewsletterComponent implements OnInit { 
	newsletter: Development;
    newsletters: Development[] = [];
    model: any = {};

    constructor(private newsletterservice: NewsletterService,private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllNewsletters();
    }
 
    deleteUser(id: string) {
        this.newsletterservice.delete(id) 
        // .subscribe(() => { this.loadAllUsers() });
        .subscribe(
			response => {
				if(response.error) { 
	                alert(`The development could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete development successful', true);
	                this.loadAllNewsletters()
	            }
            },
            error=> { 
                alert(`The Development could not be deleted, server Error.`);
            }
        );
    }

   
    private loadAllNewsletters() {
        this.newsletterservice.getAll().subscribe(newsletters => { this.newsletters = newsletters; console.log(newsletters) });
    }
}
