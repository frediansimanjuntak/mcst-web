import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroup, User } from '../../models/index';
import { UserGroupService, UserService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  // moduleId: module.id,
  selector: 'user-group',
  templateUrl: 'app/templates/user-group.html',
})

export class UserGroupComponent implements OnInit {
	usergroup: any;
    usergroups: any = [];
    users: any[] = [];
	model: any = {};
    cols: any[];
    public developmentId;
    public data;
    public dataAgm;
    public dataCircular;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    name: any;

    constructor(
                private router: Router,
                private userGroupService: UserGroupService,
    			private userService: UserService,
    			private alertService: AlertService,
                private appComponent: AppComponent,
                private confirmationService: ConfirmationService,
                private _notificationsService: NotificationsService) {
    }

    ngOnInit(): void {
        this.userService.getByToken()
                        .subscribe(name => {
                            this.name = name;
                            this.loadAllUserGroup();
                        })
    }

    loadAllUserGroup(){
        this.userGroupService.getAll()
            .subscribe((data)=> {
                    this.usergroups          = data.filter(data => data.development._id == this.name.default_development._id);
                    setTimeout(() => this.appComponent.loading = false, 1000);
                   
            });
    }

    deleteUserGroup(usergroup: UserGroup) {
        this.appComponent.loading = true;
        this.userGroupService.delete(usergroup._id)
        .then(
            data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete usergroup successful',
                    )
                    this.loadAllUserGroup()
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The Usergroup could not be deleted, server Error',
                    )
                    this.appComponent.loading = false;
            }
        );
    }

    deleteConfirmation(usergroup) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this usergroup?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteUserGroup(usergroup)
            }
        });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/user_group/add']);
    }

    editUserGroup(usergroup: UserGroup){
        this.router.navigate([this.name.default_development.name_url + '/user_group/edit', usergroup._id]);
    }
}
