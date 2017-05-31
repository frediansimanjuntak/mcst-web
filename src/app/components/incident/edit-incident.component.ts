import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident, Incidents } from '../../models/index';
import { IncidentService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { NotificationsService } from 'angular2-notifications';

import 'rxjs/add/operator/switchMap';


@Component({
  // moduleId: module.id,
  selector: 'edit-incident',
 templateUrl: '../../templates/edit-incident.html'
})

export class EditIncidentComponent implements OnInit {
	incident: Incident;
    incidents: Incident[] = [];
    model: any = {};
    id: string;
    name: any;
    refno: any[] = [];
    no:any
    myForm: FormGroup;
    types = [
        { value: 'general', name: 'General' },
        { value: 'hygiene', name: 'Hygiene' },
        { value: 'damage', name: 'Damage' },

    ];
    selectedType = '';
    loading: boolean = true;

    constructor(private router: Router,
    	private incidentService: IncidentService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        
        private _notificationsService: NotificationsService,
        private userService: UserService) {
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.incidentService.getById(this.id)
            .subscribe(incident => {
                this.incident = incident;
                setTimeout(() => this.loading = false, 1000);
            });
        }
        this.model.incident_type = 'general';
        this.model.attachment = [];
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            setTimeout(() => this.loading = false, 1000);
        })
    }

    createIncident(event: any) {
        if(this.model.attachment.length > 0) {
            this.loading = true
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
                    this._notificationsService.success('Success', 'Create incident report successful')
                    this.router.navigate([this.name.default_development.name_url + '/incident']);
                },
                error => {
                    if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                    setTimeout(() => this.loading = false, 1000);
                }
            );
        }
    }

    updateIncident(){
        this.loading = true
		this.incidentService.update(this.incident)
		.then(
			response => {
                this._notificationsService.success('Success', 'Update incident successful')
                this.router.navigate([this.name.default_development.name_url + '/incident']);
            },
            error => {
                if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                setTimeout(() => this.loading = false, 1000);
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
        this.router.navigate([this.name.default_development.name_url + '/incident' ]);
    }
}
