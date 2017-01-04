import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Petition } from '../../models/index';
import { PetitionService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-petition',
 templateUrl: '/app/templates/edit-petition.html'
})

export class EditPetitionComponent implements OnInit { 
	petition: Petition;
    petitions: Petition[] = [];
    model: any = {};
    id: string;
    myForm: FormGroup;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    types = [
        { value: 'Maintenance', name: 'Maintenance' },
        { value: 'Moving In', name: 'Moving In' },
        { value: 'Renovation', name: 'Renovation' },
        { value: 'Add Tenant/ family', name: 'Add Tenant/ family' },
        
    ];
    selectedType = '';

    constructor(private router: Router,
    	private petitionService: PetitionService,
    	private alertService: AlertService,
        private route: ActivatedRoute) {      
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {   
    	this.selectedType = 'Maintenance';
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.petitionService.getPetition(this.id).then(petition => {this.petition = petition;});
        }
    }

    createPetition() {
    	this.model.petition_type = this.selectedType;
    	console.log(this.model)
        // this.petitionService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create Petition successful', true);
        //         this.router.navigate(['/incident']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The petition could not be save, server Error.`);
        //     }
        // );
    }

    updateIncident(){
    	console.log(this.petition);
		// this.petitionService.update(this.petition)
		// .then(
		// 	response => {
  //               this.alertService.success('Update incident successful', true);
  //               this.router.navigate(['/incident']);
  //           },
  //           error => { 
  //           	this.alertService.error(error);
  //           }
  //       );
	}

    onChange(event: any) {
       let files = [].slice.call(event.target.files); 
       this.model.attachment = files;
    }

    remove(i: any){ 
        this.model.attachment.splice(i, 1)
    }
}
