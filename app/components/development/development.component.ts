import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  // moduleId: module.id,
  selector: 'development',
  templateUrl: 'app/templates/development.html',
})

export class DevelopmentComponent implements OnInit {
	development: Development;
    developments: Development[] = [];
    model: any = {};
    name: any;

    constructor(private router: Router,
                private developmentService: DevelopmentService,
                private appComponent: AppComponent,
                private alertService: AlertService,
                private confirmationService: ConfirmationService,
                private userService: UserService,
                private _notificationsService: NotificationsService,) {}

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.loadAllDevelopments();
    }

    deleteDevelopment(development: Development) {
        this.appComponent.loading = true
        this.developmentService.delete(development._id)
        .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete development successful',
                    )
                    this.loadAllDevelopments()
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The Development could not be deleted, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
        );
    }

    deleteConfirmation(development) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this development?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteDevelopment(development)
            }
        });
    }

    private loadAllDevelopments() {
        this.developmentService.getAll()
        .subscribe(developments => { 
            this.developments = developments; 
            setTimeout(() => this.appComponent.loading = false, 1000);
        });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/development/add']);
    }

    edit(development: Development){
        this.router.navigate([this.name.default_development.name_url + '/development/edit', development._id]);
    }
}
