import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Facility } from '../../models/index';
import { FacilityService, AlertService, UserService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

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
        private appComponent: AppComponent,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
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
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    deleteFacility(facility: Facility) {
        this.appComponent.loading = true
        this.facilityService.delete(facility._id)
        .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete facility successful',
                    )
                    this.loadAllFacilities()
                },
                error => {
                    this._notificationsService.error(
                            'Error',
                            'The facility could not be deleted, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
        );
    }

    deleteConfirmation(facility) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this facility?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteFacility(facility)
            }
        });
    }

    private loadAllFacilities() {
        this.facilityService.getAll().subscribe(facilities => { this.facilities = facilities; });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/facility/add']);
    }

    edit(facility: Facility){
        this.router.navigate([this.name.default_development.name_url + '/facility/edit', facility._id]);
    }

    view(facility: Facility){
        this.router.navigate([this.name.default_development.name_url + '/facility/view', facility._id]);
    }
}
