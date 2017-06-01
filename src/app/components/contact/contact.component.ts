import { Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';



@Component({
  selector: 'contact',
  templateUrl: '../../templates/contact.html'

})

export class ContactComponent  implements OnInit{ 
	contactEmergency: any = [];
	contactOthers: any = [];
	name: any;
	loading: boolean;
	editEmergency: boolean = false;
	editOthers: boolean = false;
    submitted: boolean = false;
	@ViewChild('modalEmergencyForm') modalEmergencyForm;
    @ViewChild('modalOthersForm') modalOthersForm;
    model: any = {};
	constructor(private router: Router,
                private contactService: ContactService,
                private userService: UserService,
                private _notificationsService: NotificationsService,
                private confirmationService: ConfirmationService,) {}
	
	ngOnInit(): void {
        this.loading = true;
		this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.loadContacts();
        })   
    }

    loadContacts(){
    	this.contactService.getAll().subscribe(
			contact => {
				var contacts = contact;
				this.contactEmergency = contacts.filter(data => 
					data.type_contact.indexOf("emergancy") !==  -1 || 
					data.type_contact.indexOf("emergency") !==  -1 ||
                    data.type_contact.indexOf("management") !==  -1
				)
				this.contactOthers = contacts.filter(data =>
					data.type_contact.indexOf("emergancy") ==  -1 && 
					data.type_contact.indexOf("emergency") ==  -1 &&
                     data.type_contact.indexOf("management") ==  -1
				)
				setTimeout(() => this.loading = false, 1000);   
			})
    }

    deleteContact(id: string){
    	this.contactService.delete(id).then(
    		data => {
                this.ngOnInit()
                this._notificationsService.success('Success', 'Delete contact successful')
            },
            error => {
                if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                
                setTimeout(() => this.loading = false, 1000);
            }
    	)
    }

    deleteConfirmation(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this contact?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteContact(id)
            }
        });
    }

    saveEmergency(valid: boolean){
        if(valid){
            if(this.editEmergency){
                this.updateContact();
            }else{
                this.createContact();
            }
        }
    }

    saveOthers(valid: boolean){
        if(valid){
            if(this.editOthers){
                this.updateContact();
            }else{
                this.createContact();
            }
        }
    }

    createContact(){
        this.loading = true;

        console.log(this.model)
        this.contactService.create(this.model)
            .then(
                data => {
                    this._notificationsService.success("Success", "Contact saved")    
                    this.loading = false;
                    this.submitted =false;
                    this.modalOthersForm.close()
                    this.modalEmergencyForm.close()
                    this.ngOnInit()
                },
                error => {
                    if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                    this.loading = false;
                }
            )
    }

    updateContact(){
        this.loading = true;
        this.contactService.update(this.model, this.model._id)
            .then(
                data => {
                    this._notificationsService.success( "Success" ,"Contact saved")    
                    this.submitted =false;
                    this.loading = false;
                    this.modalOthersForm.close()
                    this.modalEmergencyForm.close()
                    this.ngOnInit()
                },
                error => {
                    if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                    this._notificationsService.error("Error", error.json().message)    
                    this.loading = false;
                }
            )
    }

    preUpdate(contact){
        this.model = contact;
    }

    clearModel(){
        this.model = {};
    }
   
}
