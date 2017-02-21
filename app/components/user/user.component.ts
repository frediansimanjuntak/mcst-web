import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';

@Component({
    // moduleId: module.id,
    selector: 'user',
    templateUrl: 'app/templates/user.html',
})

export class UserComponent implements OnInit {
    user: User;
    users: User[] = [];
    model: any = {};
    developmentID = "1";
    name: any;

    constructor(private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private appComponent: AppComponent,) {}

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadAllUsers();
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    deleteUser(user:User) {
        this.appComponent.loading = true
        this.model.development = this.name.default_development._id;
        if(user.user_group){
            this.model.user_group = user.user_group; 
        }
        this.userService.delete(user._id, this.model)
        .then(response => {
                  this.alertService.success('Delete user successful', true);
	                this.loadAllUsers()
              },
              error => {
                  alert(`The user could not be deleted, server Error.`);
              }
        );
    }


    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { 
                                            this.users = users;
                                            console.log(users) ;
                                        });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/user/add' ]);
    }

    edit(user: User){
        this.router.navigate([this.name.default_development.name_url + '/user/edit', user._id ]);
    }
}
