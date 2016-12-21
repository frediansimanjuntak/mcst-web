import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    templateUrl: '/app/templates/user.html',
})
 
export class UserComponent implements OnInit {
    user: User;
    users: User[] = [];
    model: any = {};
 
    constructor(private router: Router,private userService: UserService,private alertService: AlertService) {
        // this.user = JSON.parse(localStorage.getItem('user'));
        // console.log(this.user)
    }
 
    ngOnInit() {
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
        this.userService.getAll().subscribe(users => { this.users = users; console.log(users) });
    }

    add(){
        this.router.navigate(['/user/add']);
    }

    edit(user: User){
        this.router.navigate(['/user/edit', user._id]);
    }
}