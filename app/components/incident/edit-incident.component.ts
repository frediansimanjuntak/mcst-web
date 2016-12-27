import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Incident } from '../../models/index';
import { IncidentService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-incident',
 templateUrl: '/app/templates/edit-incident.html'
})

export class EditIncidentComponent implements OnInit { 
	incident: Incident;
    incidents: Incident[] = [];
    model: any = {};
    id: string;
    myForm: FormGroup;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    types = [
        { value: 'general', name: 'General' },
        { value: 'hygiene', name: 'Hygiene' },
        { value: 'damage', name: 'Damage' },
        
    ];
    selectedType = '';

    constructor(private router: Router,
    	private incidentService: IncidentService,
    	private alertService: AlertService,
        private route: ActivatedRoute) {      
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {   
    	this.selectedType = 'general';
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.incidentService.getIncident(this.id).then(incident => {this.incident = incident; this.selectedType = incident.incident_type;});
        }
    }

    createIncident() {
        console.log(this.model);
        this.model.attachment = {
              "name": this.uploader.queue[0]._file.name,
              "type": this.uploader.queue[0]._file.type,
              "information": "Optional",
              "created_by" : "583e4e9dd97c97149884fef5",
        }
        this.incidentService.create(this.model)
        .then(
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

    updateIncident(){
		this.incidentService.update(this.incident)
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
