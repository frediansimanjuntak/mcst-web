import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
import { AppComponent } from '../index';

@Component({
  // moduleId: module.id,
  selector: 'edit-development',
  templateUrl: 'app/templates/edit-development.html',
})

export class EditDevelopmentComponent implements OnInit {
	development: Development;
    model: any = {};
    id: string;

    constructor(private router: Router,
    	private developmentService: DevelopmentService,
    	private alertService: AlertService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.developmentService.getById(this.id)
            .subscribe(development => {
                this.development = development;
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        }
    }

    createDevelopment() {
        this.appComponent.loading = true
        this.developmentService.create(this.model)
        .then(
            response => {
                this._notificationsService.success(
                            'Success',
                            'Create development successful',
                    )
                this.router.navigate(['/development']);
            },
            error => {
                this._notificationsService.error(
                            'Error',
                            'Create data failed, server Error',
                    )
                setTimeout(() => this.appComponent.loading = false, 1000);
            }
        );
    }

    updateDevelopment(){
        this.appComponent.loading = true
		this.developmentService.update(this.development)
		.then(
			response => {
                this._notificationsService.success(
                            'Success',
                            'Update development successful',
                    )
                this.router.navigate(['/development']);
            },
            error => {
            	this._notificationsService.error(
                            'Error',
                            'Update data failed, server Error',
                    )
                setTimeout(() => this.appComponent.loading = false, 1000);
            }
        );
	}
}
