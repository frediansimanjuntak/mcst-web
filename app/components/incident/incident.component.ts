import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident } from '../../models/index';
import { EditContractComponent } from '../index';
import { IncidentService, AlertService, UserService, UnitService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    // moduleId: module.id,
    selector: 'incident',
    templateUrl: 'app/templates/incident.html',
    inputs: ['isFavorite :is-favorite'],
    outputs: ['change']
})

export class IncidentComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
    reference_type: any; 
    reference_id: any; 
    users: any[]
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
    resolveIncident: any;
    change = new EventEmitter();
    public data;
    public dataNew;
    public dataInProgress;
    public dataResolved;
    public dataArchieved;

    constructor(private router: Router, 
        private incidentService: IncidentService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private unitService: UnitService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private editcontractComponent: EditContractComponent,) {}

    ngOnInit(): void {
        // this.status = [];
        // this.status.push({label: 'All Brands', value: null});
        // this.status.push({label: 'New', value: 'new'});
        // this.status.push({label: 'In Progress', value: 'in progress'});
        // this.status.push({label: 'Resolved', value: 'resolved'});
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
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        }
    }

    openModal(incident){
        this.appComponent.loading = true
        this.resolveIncident = incident;
        this.userService.getAll()
        .subscribe(users => {
            this.users = users;
            setTimeout(() => this.appComponent.loading = false, 1000);
        })
    }

    updateIncident(incident){
        this.firstModal.close();
        this.appComponent.loading = true
        this.model._id = incident._id
        this.model.attachment = null
        this.incidentService.resolve(this.model)
        .then(
            response => {
                this._notificationsService.success(
                            'Success',
                            'Update incident successful',
                )
                this.ngOnInit()
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

    deleteIncident(incident: Incident) {
        this.appComponent.loading = true
        this.incidentService.delete(incident._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Delete incident successfu',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'The incident could not be deleted, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                        }
            );
    }

	private loadAllIncident() {
		this.incidentService.getAll().subscribe(incidents => {
	        this.incidents = incidents.filter(incidents => incidents.archieve === false); ;
            this.dataNew = this.incidents.filter(incidents => incidents.status === 'new' && incidents.archieve === false);
            this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'in progress' && incidents.archieve === false);
            this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' && incidents.archieve === false);
            this.dataArchieved   = this.incidents.filter(incidents => incidents.archieve === true );
            setTimeout(() => this.appComponent.loading = false, 1000);
		});
    }

    view(incident: Incident){
        this.router.navigate([this.name.default_development.name_url + '/incident/view', incident._id]);
    }

    viewPhoto(incident: Incident){
        this.router.navigate([this.name.default_development.name_url + '/incident/view/photo', incident._id]);
    }

    viewContract(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/view', id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/incident/add']);
    }

    goBack(){
        this.router.navigate([this.name.default_development.name_url + '/incident']);
    }

    add_project(reference_no:any, id:any){
        this.appComponent.loading = true
        this.reference_id = id;
        this.reference_type = 'incident';
        this.router.navigate([this.name.default_development.name_url + '/add/contract/' + this.reference_type ,id ,reference_no]);    
    }

    public archieve(incident:Incident){
        this.appComponent.loading = true
        this.incidentService.archieve(incident._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Archieve incident successfu',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'The incident could not be archieve, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                        }
            );
    }

    archieveConfirmation(incident) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to archieve this incident?',
            header: 'Archieve Confirmation',
            accept: () => {
                this.archieve(incident)
            }
        });
    }

    public unarchieve(incident:Incident){
        this.appComponent.loading = true
        this.incidentService.unarchieve(incident._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Unarchieve incident successfu',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'The incident could not be unarchieve, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                        }
            );
    }

    starred(incident:Incident) {
        this.appComponent.loading = true
        this.incidentService.starred(incident._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Starred successful',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'Failed, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                        }
            );
    }

    starredConfirmation(incident) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to star this incident?',
            header: 'Star Confirmation',
            accept: () => {
                this.starred(incident)
            }
        });
    }

    unstarred(incident:Incident) {
        this.appComponent.loading = true
        this.incidentService.unstarred(incident._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Unstarred incident successful',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'Failed, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                        }
            );
    }
}
