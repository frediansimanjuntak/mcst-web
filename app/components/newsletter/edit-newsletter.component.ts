import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { NewsletterService, AlertService, UserService } from '../../services/index';
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
    public developmentId;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    name: any;
    filesToUpload: Array<File>;

    constructor(private router: Router,
    	private newsletterService: NewsletterService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private userService: UserService ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
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

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.attachment = this.filesToUpload;
    }

    createNewsletter() {
        var formData: any = new FormData();
        
        for(var i = 0; i < this.model.attachment.length; i++) {
            formData.append("attachment[]", this.model.attachment.length[i], this.model.attachment.length[i].name);
        }

        this.model.attachment = formData;
        if(this.model.released === true){
            this.model.released_at =  Date.now();
        } else {
            this.model.released_by = '';
            this.model.released_at = '';
        }
        console.log(this.model);
       
        this.newsletterService.create(this.model, this.name.default_development.name)
        .then(
            data => {
                this.alertService.success('Create newsletter successful', true);
                this.router.navigate([this.name.default_development.name,'/newsletter']);
            },
            error => {
                console.log(error);
                alert(`The Newsletter could not be save, server Error.`);
            }
        );
    }

    updateNewsletter(){
		this.newsletterService.update(this.model, this.name.default_development.name)
		.then(
			response => {
				if(response.error) {
	                this.alertService.error(response.error);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
                     this.alertService.success('Update newsletter successful', true);
                     this.router.navigate([this.name.default_development.name, '/newsletter']);
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
        this.router.navigate([this.name.default_development.name + '/newsletter']);  
    }
}
