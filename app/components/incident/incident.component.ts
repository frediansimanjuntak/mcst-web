import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Incident } from '../../models/index';
import { IncidentService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

@Component({
  moduleId: module.id,
  selector: 'incident',
  templateUrl: '/app/templates/incident.html',
  styleUrls: [ '/app/templates/styles/newsletter.css' ]
})

export class IncidentComponent implements OnInit {
	incident: Incident;
    incidents: Incident[] = [];
    model: any = {};
    images: any[];
    id: string;
    public data;
    public dataNew;
    public dataReviewing; 
    public dataInProgress;
    public dataResolved;
    public dataUrgent;   

    constructor(private router: Router, private incidentService: IncidentService, private alertService: AlertService,private route: ActivatedRoute) {}  

    ngOnInit(): void {
        this.images = [];
        this.images.push({source:'/assets/image/1.png'});
        this.images.push({source:'/assets/image/2.png'});
        this.images.push({source:'/assets/image/3.png'});
        this.images.push({source:'/assets/image/4.png'});
        this.images.push({source:'/assets/image/5.png'});
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllIncident();
        }else{
        	this.incidentService.getIncident(this.id).then(incident => {this.incident = incident;});
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
		this.incidentService.getIncidents().then(incidents => { 
					this.incidents = incidents ;
                    this.dataNew        = this.incidents.filter(incidents => incidents.status === 'new' ); 
                    this.dataReviewing  = this.incidents.filter(incidents => incidents.status === 'reviewing' ); 
                    this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'inprogress' ); 
                    this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' ); 
                    this.dataUrgent     = this.incidents.filter(incidents => incidents.status === 'urgent' );
		});
        // this.incidentService.getIncidents()
        //     .then((){
        //             this.data           = ( incidents => this.incidents = incidents );
        //             this.dataNew        = this.incidents.filter(incidents => incidents.status === 'new' ); 
        //             this.dataReviewing  = this.incidents.filter(incidents => incidents.status === 'reviewing' ); 
        //             this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'inprogress' ); 
        //             this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' ); 
        //             this.dataUrgent     = this.incidents.filter(incidents => incidents.status === 'urgent' );
        //     });
    }

    public tabs:Array<any> = [
        {title: 'All', content: ''},
        {title: 'New', content: ''},
        {title: 'Reviewing', content: ''},
        {title: 'In-Progress', content: ''},
        {title: 'Resolved', content: ''},
        {title: 'Urgent', content: ''}
    ];
     
    public setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };

    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }

    view(incident: Incident){
        this.router.navigate(['/incident/view', incident._id]);
    }

    add(){
        this.router.navigate(['/incident/add']);
    }
}
