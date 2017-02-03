import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Facility } from '../../models/index';
import { FacilityService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'facility',
  templateUrl: 'app/templates/facility.html',
})

export class FacilityComponent implements OnInit {
	facility: Facility;
    facilities: Facility[] = [];
    model: any = {};
    id: string;
    name: any;

    constructor(private router: Router,
        private facilityService: FacilityService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService) {}

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllFacilities();
        }else{
            this.facilityService.getFacility(this.id).then(facility => {this.facility = facility;});
        }
    }

    deleteFacility(facility: Facility) {
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
        this.router.navigate([this.name.default_development.name + '/facility/add']);
    }

    edit(facility: Facility){
        this.router.navigate([this.name.default_development.name + '/facility/edit', facility._id]);
    }

    view(facility: Facility){
        this.router.navigate([this.name.default_development.name + '/facility/view', facility._id]);
    }
}
