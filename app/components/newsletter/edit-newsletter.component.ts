import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { NewsletterService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import '../../rxjs-operators';
import { User } from '../../models/index';



@Component({
  // moduleId: module.id,
  selector: 'edit-newsletter',
  templateUrl: 'app/templates/edit-newsletter.html'
})

export class EditNewsletterComponent  {
	development: Development;
    developments: Development[] = [];
    model: any = {};
    myForm: FormGroup;
    user: User;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});


    constructor(private router: Router,
    	private newsletterService: NewsletterService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.model.released = false;
        this.model.type = 'agm';
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
        Developments[0].newsletter.push(this.model);
        this.router.navigate(['/newsletter']);
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

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }
}
