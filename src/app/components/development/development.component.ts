import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService, UserService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  // moduleId: module.id,
  selector: 'development',
  templateUrl: '../../templates/development.html',
})

export class DevelopmentComponent implements OnInit {
	development: Development;
    developments: Development[] = [];
    model: any = {};
    name: any;
    loading: boolean = true;

    constructor(private router: Router,
                private developmentService: DevelopmentService,
                private alertService: AlertService,
                private confirmationService: ConfirmationService,
                private userService: UserService,
                private _notificationsService: NotificationsService,) {}

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.loadAllDevelopments();
    }

    deleteDevelopment(development: Development) {
        this.loading = true
        this.developmentService.delete(development._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Delete development successful')
                this.loadAllDevelopments()
            },
            error => {
                if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                
                setTimeout(() => this.loading = false, 1000);
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
            setTimeout(() => this.loading = false, 1000);
        });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/development/add']);
    }

    edit(development: Development){
        this.router.navigate([this.name.default_development.name_url + '/development/edit', development._id]);
    }
}
