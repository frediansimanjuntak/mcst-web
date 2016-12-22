import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { NewsletterService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import '../../rxjs-operators';
import { User } from '../../models/index';

const TYPES: any[] = [
  { value: 'agm', name: 'AGM' },
  { value: 'circular', name: 'Circular' },
];

@Component({
  moduleId: module.id,
  selector: 'edit-development',
  templateUrl: '/app/templates/edit-newsletter.html'
})

export class EditNewsletterComponent  { 
	development: Development;
    developments: Development[] = [];
    model: any = {};
    myForm: FormGroup;
    user: User;
    types = TYPES;

    constructor(private router: Router,
    	private newsletterService: NewsletterService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {
        
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.myForm = this.formbuilder.group({
            newsletter: this.formbuilder.group({
                title: [''],
                description: [''],
                type: [''],
                attachment: [''],
                released: [''],
                pinned: this.formbuilder.group({
                    rank: [''],
                }),
                released_by: [''],
                // created_by: [this.user._id],
                // if(released = "true" , released_by = "") {
                //     released_by = this.user._id
                // }
            })
        })
    }

    createNewsletter() {
        if(this.model.released == true){
            this.model.released_by = '583e4e9dd97c97149884fef5';
            this.model.released_at =  Date.now();
        } else {
            this.model.released_by = null;
            this.model.released_at = null;
        }
        this.model.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        console.log(this.model);
        this.newsletterService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success('Create newsletter successful', true);
                this.router.navigate(['/newsletter']);
            },
            error => {
                console.log(error);
                alert(`The Newsletter could not be save, server Error.`);
            }
        );
    }

    updateNewsletter(){
		this.newsletterService.update(this.model)
		.subscribe(
			response => {
				if(response.error) { 
	                this.alertService.error(response.error);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
                     this.alertService.success('Update newsletter successful', true);
                     this.router.navigate(['/newsletter']);
	            }
            },
            error=> { 
            	this.alertService.error(error);
            }
        );
	}
}
