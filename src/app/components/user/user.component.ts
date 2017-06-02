import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';

import { Observable} from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

import { ConfirmationService } from 'primeng/primeng';

@Component({
    // moduleId: module.id,
    selector: 'user',
    templateUrl: '../../templates/user.html',
})

export class UserComponent implements OnInit {
    user: User;
    users: User[] = [];
    model: any = {};
    developmentID = "1";
    name: any;
    loading: boolean = true;

    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private _notificationsService: NotificationsService,
        private confirmationService: ConfirmationService,
        ) {}

    ngOnInit() {
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.loadAllUsers();
        })
    }

    deleteUser(user:User) {
        this.loading = true
        this.model.development = this.name.default_development._id;
        if(user.user_group){
            this.model.user_group = user.user_group; 
        }
        this.userService.delete(user._id, this.model)
        .then(response => {
                    this._notificationsService.success('Success', 'Delete user successful')
	                this.loadAllUsers()
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

    deleteConfirmation(user) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this user?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteUser(user)
            }
        });
    }


    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { 
            if(this.name.role == 'admin'){
                this.users = users.filter(data=> data.role == 'user')
            }else if(this.name.role == 'super admin'){
                this.users = users.filter(data=> data.role == 'user' || data.role == 'admin')
            }else{
                this.users = users;  
            }
            setTimeout(() => this.loading = false, 1000);
        });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/user/add' ]);
    }

    edit(user: User){
        this.router.navigate([this.name.default_development.name_url + '/user/edit', user._id ]);
    }
}
