import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Incident } from '../../models/index';
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
	incident: Incident;
    incidents: Incident[] = [];
    model: any = {};
    images: any[];
    id: string;
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
        private unitService: UnitService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllIncident();
        }else{
        	this.incidentService.getById(this.id)
            .subscribe(incident => {
                this.incident = incident;
                console.log(incident.attachment)
                this.images = [];
                this.images.push({source:incident.attachment.url}); 
                this.incident.created_at = this.incident.created_at.slice(0,10);
                // for (var i = 0; i < this.incident.attachment.length; ++i) {
                //     this.images.push({source:this.incident.attachment[i].url});
                // };
                console.log(this.images)

            });
        }
    }

    deleteIncident(incident: Incident) {
    	console.log(incident._id)
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
                    console.log(this.incidents)
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
                    this.unitService.getAll(this.name.default_development.name)
                    .subscribe(units => {
                        this.units = units.properties;
                        for (var i = 0; i < this.incidents.length; ++i) {
                            let a = this.units.find(data => data._id == this.incidents[i].property);
                            this.incidents[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                        }
                        for (var i = 0; i < this.dataInProgress.length; ++i) {
                            let a = this.units.find(data => data._id == this.dataInProgress[i].property);
                            this.dataInProgress[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                        }
                        for (var i = 0; i < this.dataResolved.length; ++i) {
                            let a = this.units.find(data => data._id == this.dataResolved[i].property);
                            this.dataResolved[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                        }
                    })
		});
    }

    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }

    view(incident: Incident){
        this.router.navigate([this.name.default_development.name + '/incident/view', incident._id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/incident/add']);
    }

    add_project(reference_no:any){
        this.router.navigate([this.name.default_development.name + '/contract/add',reference_no]);    
    }

    archive(incident:Incident){
        this.incidentService.archieve(incident._id);
        this.ngOnInit()
    }

    unarchive(incident:Incident){
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
