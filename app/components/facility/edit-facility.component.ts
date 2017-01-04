import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Facility } from '../../models/index';
import { FacilityService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-facility',
  templateUrl: '/app/templates/edit-facility.html',
})

export class EditFacilityComponent  { 
	facility: Facility;
    model: any = {};
    id: string;

    constructor(private router: Router,
    	private facilityService: FacilityService,
    	private alertService: AlertService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {   
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.facilityService.getFacility(this.id).then(facility => this.facility = facility);
        }
    }

    createFacility() {
        this.facilityService.create(this.model)
        .then(
            response => {
                this.alertService.success('Update facility successful', true);
                this.router.navigate(['/facility']);
            },
            error => { 
                this.alertService.error(error);
            }
        );
    }

    updateFacility(){
		this.facilityService.update(this.facility)
		.then(
			response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate(['/development']);
            },
            error => { 
            	this.alertService.error(error);
            }
        );
	}
}
