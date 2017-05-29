import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService, UserService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';


@Component({
  // moduleId: module.id,
  selector: 'edit-development',
  templateUrl: '../../templates/edit-development.html',
})

export class EditDevelopmentComponent implements OnInit {
	development: Development;
    model: any = {};
    id: string;
    name: any;
    loading: boolean = true;

    constructor(private router: Router,
    	private developmentService: DevelopmentService,
    	private alertService: AlertService,
        private _notificationsService: NotificationsService,
        private userService: UserService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.developmentService.getById(this.id)
            .subscribe(development => {
                this.development = development;
                setTimeout(() => this.loading = false, 1000);
            });
        }
    }

    createDevelopment() {
        this.loading = true
        this.developmentService.create(this.model)
        .then(
            response => {
                this._notificationsService.success('Success', 'Create development successful')
                this.router.navigate([ this.name.default_development.name_url + '/development']);
            },
            error => {
                this._notificationsService.error('Error', error.json().message)
                setTimeout(() => this.loading = false, 1000);
            }
        );
    }

    updateDevelopment(){
        this.loading = true
		this.developmentService.update(this.development)
		.then(
			response => {
                this._notificationsService.success('Success', 'Update development successful')
                this.router.navigate([this.name.default_development.name_url + '/development']);
            },
            error => {
            	this._notificationsService.error('Error', error.json().message)
                setTimeout(() => this.loading = false, 1000);
            }
        );
	}
}
