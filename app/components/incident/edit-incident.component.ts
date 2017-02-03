import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident, Incidents } from '../../models/index';
import { IncidentService, AlertService, UserService } from '../../services/index';
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
    name: any;
    filesToUpload: Array<File>;
    myForm: FormGroup;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    types = [
        { value: 'General', name: 'General' },
        { value: 'Hygiene', name: 'Hygiene' },
        { value: 'Damage', name: 'Damage' },

    ];
    selectedType = '';

    constructor(private router: Router,
    	private incidentService: IncidentService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService) {
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
    	this.selectedType = 'general';
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.incidentService.getById(this.id).subscribe(incident => {this.incident = incident;});
        }
    }

    createIncident(event: any) {
        let formData:FormData = new FormData();
        
        for (var i = 0; i < this.model.attachment.length; i++) {
            formData.append("attachment", this.model.attachment[i]);
        }

        formData.append("incident_type", this.model.incident_type);
        formData.append("title", this.model.title);
        formData.append("remark", this.model.remark);
        
        this.incidentService.create(formData)
        .then(
            data => {
                this.alertService.success('Create incident report successful', true);
                this.router.navigate([this.name.default_development.name + '/incident']);
            },
            error => {
                console.log(error);
                alert(`The incident report could not be save, server Error.`);
            }
        );
    }

    updateIncident(){
    	console.log(this.incident);
		this.incidentService.update(this.incident)
		.then(
			response => {
                this.alertService.success('Update incident successful', true);
                this.router.navigate([this.name.default_development.name + '/incident']);
            },
            error => {
            	this.alertService.error(error);
            }
        );
	}

    // fileChangeEvent(fileInput: any){
    //     this.filesToUpload = <Array<File>> fileInput.target.files;
    //     this.model.attachment = this.filesToUpload;
    //     console.log(this.model.attachment)
    // }

    onChange(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.attachment = this.filesToUpload;
    }

    // onChange(event: any) {
    //    let files = [].slice.call(event.target.files);
    //    this.model.attachment = files;
    // }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    cancel(){
        this.router.navigate([this.name.default_development.name + '/incident' ]);
    }
}
