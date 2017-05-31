import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident } from '../../models/index';
import { EditContractComponent } from '../index';
import { IncidentService, AlertService, UserService, UnitService } from '../../services/index';
import { ModalDirective } from 'ng2-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

import { ConfirmationService } from 'primeng/primeng';

@Component({
    // moduleId: module.id,
    selector: 'incident',
    templateUrl: '../../templates/incident.html',
    inputs: ['isFavorite :is-favorite'],
    outputs: ['change']
})

export class IncidentComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
     @ViewChild('photoModal') photoModal: ModalDirective;
    reference_type: any; 
    reference_id: any; 
    users: any[]
	incident: Incident;
    incidents: Incident[] = [];
    datas: any
    model: any = {};
    images: any[] = [];
    id: string;
    _id: string;
    name: any;
    units: any;
    isFavorite = false;
    isArchieved = false;
    resolveIncident: any;
    dataFilter: string = '';
    all: any[] = [];
    typeFilter: any = '';
    change = new EventEmitter();
    loading: boolean = true;
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
        
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        private editcontractComponent: EditContractComponent,) {}

    ngOnInit(): void {
        // this.status = [];
        // this.status.push({label: 'All Brands', value: null});
        // this.status.push({label: 'New', value: 'new'});
        // this.status.push({label: 'In Progress', value: 'in progress'});
        // this.status.push({label: 'Resolved', value: 'resolved'});
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
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
                setTimeout(() => this.loading = false, 1000);
            });
        }
    }

    openModal(incident){
        this.loading = true
        this.resolveIncident = incident;
        this.userService.getAll()
        .subscribe(users => {
            this.users = users;
            setTimeout(() => this.loading = false, 1000);
        })
    }

    updateIncident(incident){
        this.firstModal.close();
        this.loading = true
        this.model._id = incident._id
        this.model.attachment = null
        this.incidentService.resolve(this.model)
        .then(
            response => {
                this._notificationsService.success('Success','Update incident successful')
                this.ngOnInit()
            },
            error => {
                this.userService.checkError(error.json().code)
                this._notificationsService.error('Error','The incident report could not be update, server Error')
                setTimeout(() => this.loading = false, 1000);
            }
        );
    }

    deleteIncident(incident: Incident) {
        this.loading = true
        this.incidentService.delete(incident._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Delete incident successful')
                this.ngOnInit();
            },
            error => {
                this.userService.checkError(error.json().code)
                this._notificationsService.error('Error', error.json().message)
                setTimeout(() => this.loading = false, 1000);
            }
        );
    }

	private loadAllIncident() {
		this.incidentService.getAll().subscribe(incidents => {
            this.all = incidents
            for (let z = 0; z < incidents.length; ++z) {
                if (incidents[z].attachment.length < 1) {
                    incidents[z].attachment = null
                }
            }
	        this.incidents = incidents.filter(incidents => incidents.archieve === false);
            this.dataNew = this.incidents.filter(incidents => incidents.status === 'new');
            this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'in progress');
            this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolve');
            this.dataArchieved   = this.all.filter(incidents => incidents.archieve === true );
            console.log(incidents)
            setTimeout(() => this.loading = false, 1000);
		});
    }

    filter(){
        this.loading=true;
        if(this.typeFilter != ''){
            this.incidents  = this.all.filter(data =>  data.reference_no ? data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 : false  &&
                data.incident_type ? data.incident_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1 : false &&
                data.archieve ? data.archieve === false : false
                
            );
            this.dataNew = this.incidents.filter(incidents => incidents.status === 'new' && incidents.archieve === false);
            this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'in progress' && incidents.archieve === false);
            this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' && incidents.archieve === false);
            this.dataArchieved   = this.incidents.filter(data => 
                    data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                    data.archieve === true
                );
            setTimeout(() => this.loading = false, 500);
        }else{
            this.incidents  = this.all.filter(data => 
                data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                data.archieve === false
            );
            this.dataNew = this.incidents.filter(incidents => incidents.status === 'new' && incidents.archieve === false);
            this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'in progress' && incidents.archieve === false);
            this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' && incidents.archieve === false);
            this.dataArchieved   = this.all.filter(data => 
                    data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                    data.archieve === true
                );
            setTimeout(() => this.loading = false, 500);
        }
        
        
  
    }

    filterType(event:any){
        this.loading = true
        if(this.dataFilter != ''){
            this.incidents = this.all.filter(data => data.incident_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1 && data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);    
        }else{
            this.incidents = this.all.filter(data => data.incident_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1 && data.archieve === false);
        }
        setTimeout(() => this.loading = false, 500);
    }

    view(incident: Incident){
        this.router.navigate([this.name.default_development.name_url + '/incident/view', incident._id]);
    }

    viewPhoto(incident: Incident){
        this.loading = true
        this.images = []
        this.datas = incident
        console.log(this.datas)
        for (var i = 0; i < this.datas.attachment.length; ++i) {
            this.images.push({source:this.datas.attachment[i].url});
        };
        console.log(this.images)
        setTimeout(() => { this.loading = false }, 1000);
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
        this.loading = true
        this.reference_id = id;
        this.reference_type = 'incident';
        this.router.navigate([this.name.default_development.name_url + '/add/contract/' + this.reference_type ,id ,reference_no]);    
    }

    public archieve(incident:Incident){
        this.loading = true
        this.incidentService.archieve(incident._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Archieve incident successful')
                this.ngOnInit();
            },
            error => {
                this.userService.checkError(error.json().code)
                this._notificationsService.error('Error', error.json().message)
                setTimeout(() => this.loading = false, 1000);
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
        this.loading = true
        this.incidentService.unarchieve(incident._id)
            .then(
                data => {
                    this._notificationsService.success('Success', 'Unarchieve incident successful')
                    this.ngOnInit();
                },
                error => {
                    this.userService.checkError(error.json().code)
                    this._notificationsService.error('Error', error.json().message)
                    setTimeout(() => this.loading = false, 1000);
                }
            );
    }

    starred(incident:Incident) {
        this.loading = true
        this.incidentService.starred(incident._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Starred successful')
                this.ngOnInit();
            },
            error => {
                this.userService.checkError(error.json().code)
                this._notificationsService.error('Error', error.json().message)
                setTimeout(() => this.loading = false, 1000);
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
        this.loading = true
        this.incidentService.unstarred(incident._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Unstarred incident successful')
                this.ngOnInit();
            },
            error => {
                this.userService.checkError(error.json().code)
                this._notificationsService.error('Error', error.json().message)
                setTimeout(() => this.loading = false, 1000);
            }
        );
    }
}
