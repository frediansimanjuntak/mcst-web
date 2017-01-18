import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';

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

    constructor(private router: Router,private userService: UserService,private alertService: AlertService) {
        // this.user = JSON.parse(localStorage.getItem('user'));
        // console.log(this.user)
    }

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadAllUsers();
    }

    deleteUser(user:User) {
        this.userService.delete(user._id)
        .then(response => {
                  this.alertService.success('Create user successful', true);
	                this.loadAllUsers()
              },
              error => {
                  alert(`The user could not be deleted, server Error.`);
              }
        );
    }


    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users });
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/user/add' ]);
    }

    edit(user: User){
        this.router.navigate([this.name.default_development.name + '/user/edit', user._id ]);
    }
}
