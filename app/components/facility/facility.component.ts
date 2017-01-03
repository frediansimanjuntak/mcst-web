import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Facility } from '../../models/index';
import { FacilityService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'facility',
  templateUrl: '/app/templates/facility.html',
})

export class FacilityComponent implements OnInit { 
	facility: Facility;
    facilities: Facility[] = [];
    model: any = {};

    constructor(private router: Router,private facilityService: FacilityService,private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllFacilities();      
    }
 
    deleteFacilities(facility: Facility) {
        this.facilityService.delete(facility._id) 
        .then(
			response => {
				if(response) { 
	                alert(`The facility could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete facility successful', true);
	                this.loadAllFacilities()
	            }
            },
            error=> { 
                alert(`The Development could not be deleted, server Error.`);
            }
        );
    }
   
    private loadAllFacilities() {
        this.facilityService.getAll().subscribe(facilities => { this.facilities = facilities; });
    }

    add(){
        this.router.navigate(['/facility/add']);
    }

    edit(facility: Facility){
        this.router.navigate(['/facility/edit', facility._id]);
    }

    view(facility: Facility){
        this.router.navigate(['/facility/view', facility._id]);
    }
}
