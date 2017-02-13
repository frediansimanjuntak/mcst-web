import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident } from '../../models/index';
import { EditContractComponent } from '../index';
import { IncidentService, AlertService, UserService, UnitService } from '../../services/index';
import '../../rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

@Component({
    // moduleId: module.id,
    selector: 'incident',
    templateUrl: 'app/templates/incident.html',
    inputs: ['isFavorite :is-favorite'],
    outputs: ['change']
})

export class IncidentComponent implements OnInit {
    reference_type: any; 
    reference_id: any; 
	incident: Incident;
    incidents: Incident[] = [];
    model: any = {};
    images: any[];
    id: string;
    _id: string;
    name: any;
    units: any;
    isFavorite = false;
    isArchieved = false;
    change = new EventEmitter();
    public data;
    public dataNew;
    public dataInProgress;
    public dataResolved;

    constructor(private router: Router, 
        private incidentService: IncidentService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private unitService: UnitService,
        private editcontractComponent: EditContractComponent,) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllIncident();
        }if(this.id != null) {
            this.incidentService.getById(this.id)
            .subscribe(incident => {
                this.incident = incident;
                this.images = [];
                this.incident.created_at = this.incident.created_at.slice(0,10);
                for (var i = 0; i < this.incident.attachment.length; ++i) {
                    this.images.push({source:this.incident.attachment[i].url});
                };
            });
        }
    }

    deleteIncident(incident: Incident) {
        this.incidentService.delete(incident._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Newsletter could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create user successful', true);
                alert(`Delete Newsletter successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Newsletter could not be deleted, server Error.`);
            }
        );
    }

	private loadAllIncident() {
		this.incidentService.getAll().subscribe(incidents => {
	        this.incidents = incidents ;
            this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'inprogress' );
            this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' );
            for (var i = 0; i < this.incidents.length; ++i) {
                this.incidents[i].created_at = this.incidents[i].created_at.slice(0,10);
            }
            for (var i = 0; i < this.dataInProgress.length; ++i) {
                this.dataInProgress[i].created_at = this.dataInProgress[i].created_at.slice(0,10);
            }
            for (var i = 0; i < this.dataResolved.length; ++i) {
                this.dataResolved[i].created_at = this.dataResolved[i].created_at.slice(0,10);
            }
		});
    }

    view(incident: Incident){
        this.router.navigate([this.name.default_development.name_url + '/incident/view', incident._id]);
    }

    viewPhoto(incident: Incident){
        this.router.navigate([this.name.default_development.name_url + '/incident/view/photo', incident._id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/incident/add']);
    }

    add_project(reference_no:any, id:any){
        this.reference_id = id;
        this.reference_type = 'incident';
        this.router.navigate([this.name.default_development.name_url + '/add/contract/' + this.reference_type ,id ,reference_no]);    
    }

    public archieve(incident:Incident){
        this.incidentService.archieve(incident._id);
        this.ngOnInit()
    }

    public unarchieve(incident:Incident){
        this.incidentService.unarchieve(incident._id);
        this.ngOnInit()
    }

    starred(incident:Incident) {
        this.incidentService.starred(incident._id)
        this.ngOnInit()
    }

    unstarred(incident:Incident) {
        this.incidentService.unstarred(incident._id)
        this.ngOnInit()
    }
}
