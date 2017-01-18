import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident, Incidents } from '../../models/index';
import { IncidentService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-incident',
 templateUrl: 'app/templates/edit-incident.html'
})

export class EditIncidentComponent implements OnInit {
	incident: Incident;
    incidents: Incident[] = [];
    model: any = {};
    id: string;
    authToken: any;
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
            this.incidentService.getIncident(this.id).then(incident => {this.incident = incident;});
        }
    }

    createIncident() {
        console.log('model=',this.model)
        Incidents.push(this.model);
        console.log('incidents=',Incidents);
        this.router.navigate(['/incident']);
        // this.incidentService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create incident successful', true);
        //         this.router.navigate(['/incident']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The incident could not be save, server Error.`);
        //     }
        // );
    }

    updateIncident(){
    	console.log(this.incident);
		this.incidentService.update(this.incident)
		.then(
			response => {
                this.alertService.success('Update incident successful', true);
                this.router.navigate(['/incident']);
            },
            error => {
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

    cancel(){
        this.authToken = JSON.parse(localStorage.getItem('authToken'));
        this.router.navigate([this.authToken.default_development.name + '/incident' ]);
    }
}
