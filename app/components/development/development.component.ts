import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';


@Component({
  // moduleId: module.id,
  selector: 'development',
  templateUrl: 'app/templates/development.html',
})

export class DevelopmentComponent implements OnInit {
	development: Development;
    developments: Development[] = [];
    model: any = {};

    constructor(private router: Router,
                private developmentService: DevelopmentService,
                private appComponent: AppComponent,
                private alertService: AlertService,
                private _notificationsService: NotificationsService,) {}

    ngOnInit() {
        this.loadAllDevelopments();
        setTimeout(() => this.appComponent.loading = false, 1000);
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

    private loadAllDevelopments() {
        this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    add(){
        this.router.navigate(['/development/add']);
    }

    edit(development: Development){
        this.router.navigate(['/development/edit', development._id]);
    }
}
