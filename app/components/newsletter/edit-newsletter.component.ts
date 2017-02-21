import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { NewsletterService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
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
    public developmentId;
    name: any;

    constructor(private router: Router,
    	private newsletterService: NewsletterService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private userService: UserService,
        private appComponent: AppComponent, ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.model.released = false;
        this.model.type = 'agm';
        this.model.attachment = [];
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
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    createNewsletter() {
        this.appComponent.loading = true
        if (this.model.attachment.length > 0){
            let formData:FormData = new FormData();
        
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment[]", this.model.attachment[i]);
            }

            formData.append("title", this.model.title);
            formData.append("description", this.model.description);
            formData.append("type", this.model.type);
            formData.append("released", this.model.released);
            
            if(this.model.released == true){
                this.model.released_at =  Date.now();
                formData.append("released", this.model.released);
                formData.append("release_at", this.model.released_at);
            } 

            this.newsletterService.create(formData, this.name.default_development.name_url)
            .then(
                data => {
                    this.alertService.success('Create newsletter successful', true);
                    this.router.navigate([this.name.default_development.name_url + '/newsletter']);
                },
                error => {
                    console.log(error);
                    alert(`The Newsletter could not be save, server Error.`);
                }
            );
        }
    }

    updateNewsletter(){
        this.appComponent.loading = true
		this.newsletterService.update(this.model, this.name.default_development.name_url)
		.then(
			response => {
				if(response.error) {
	                this.alertService.error(response.error);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
                     this.alertService.success('Update newsletter successful', true);
                     this.router.navigate([this.name.default_development.name_url, '/newsletter']);
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

    goToNewsletters(){
        this.router.navigate([this.name.default_development.name_url + '/newsletter']);  
    }
}
