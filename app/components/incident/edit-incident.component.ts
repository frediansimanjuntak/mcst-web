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
    refno: any[] = [];
    no:any
    myForm: FormGroup;
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eda06c2d36ad38a7eeb0c9d5e29171da1942a423
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
                    this.alertService.success('Create incident report successful', true);
                    this.router.navigate([this.name.default_development.name_url + '/incident']);
                },
                error => {
                    console.log(error);
                    alert(`The incident report could not be save, server Error.`);
                }
            );
<<<<<<< HEAD
=======
        let formData:FormData = new FormData();
        for (var i = 0; i < this.model.attachment.length; i++) {
            formData.append("attachment", this.model.attachment[i]);
>>>>>>> ad077b63ccbda43ce0df54c8289848b8a943ed2e
=======
>>>>>>> eda06c2d36ad38a7eeb0c9d5e29171da1942a423
        }
    }

    updateIncident(){
		this.incidentService.update(this.incident)
		.then(
			response => {
                this.alertService.success('Update incident successful', true);
                this.router.navigate([this.name.default_development.name_url + '/incident']);
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
        this.router.navigate([this.name.default_development.name_url + '/incident' ]);
    }
}
