import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident, Incidents } from '../../models/index';
import { IncidentService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
import { AppComponent } from '../index';

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
    refno: any[] = [];
    no:any
    myForm: FormGroup;
    types = [
        { value: 'general', name: 'General' },
        { value: 'hygiene', name: 'Hygiene' },
        { value: 'damage', name: 'Damage' },

    ];
    selectedType = '';

    constructor(private router: Router,
    	private incidentService: IncidentService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private appComponent: AppComponent,
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
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        }
        this.model.incident_type = 'general';
        this.model.attachment = [];
        this.incidentService.getAll().subscribe(incidents => {
            this.incidents = incidents ;
            if(incidents.length > 0) { 
                var a = this.incidents.length - 1;
                this.no = +this.incidents[a].reference_no + 1
                if(this.no > 1 && this.no < 10) {
                    this.model.reference_no = '000' + this.no.toString();
                }if(this.no > 10 && this.no < 100) {
                    this.model.reference_no = '00' + this.no.toString();
                }if(this.no > 100 && this.no < 1000) { 
                    this.model.reference_no = '0' + this.no.toString();
                }if(this.no > 1000) {
                    this.model.reference_no = this.no.toString();
                }
            }else {
                this.model.reference_no = '0001'
            }  
        });
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name;
            setTimeout(() => this.appComponent.loading = false, 1000);
        })
    	this.selectedType = 'general';
        
        
    }

    createIncident(event: any) {
        this.appComponent.loading = true
        if(this.model.attachment.length > 0) {
           let formData:FormData = new FormData();
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment", this.model.attachment[i]);
            }
            formData.append("reference_no", this.model.reference_no);
            // formData.append("status", this.model.status);
            formData.append("incident_type", this.model.incident_type);
            formData.append("title", this.model.title);
            formData.append("remark", this.model.remark);
            this.incidentService.create(formData)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Create incident report successful',
                    )
                    this.router.navigate([this.name.default_development.name_url + '/incident']);
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The incident report could not be save, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
        }
    }

    updateIncident(){
        this.appComponent.loading = true
		this.incidentService.update(this.incident)
		.then(
			response => {
                this._notificationsService.success(
                            'Success',
                            'Update incident successful',
                )
                this.router.navigate([this.name.default_development.name_url + '/incident']);
            },
            error => {
                this._notificationsService.error(
                            'Error',
                            'The incident report could not be update, server Error',
                )
                setTimeout(() => this.appComponent.loading = false, 1000);
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
