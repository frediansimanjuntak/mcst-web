import { Component, OnInit } from '@angular/core';
 
import { User } from '../../models/index';
import { UserService } from '../../services/index';
 
@Component({
    moduleId: module.id,
    template: `
    <div class="col-md-6 col-md-offset-3">
    <h1>Hi {{user.username}}!</h1>
    <p>You're logged in with Angular 2!!</p>
    <h3>All registered users:</h3>
    <ul>
        <li *ngFor="let user of users">
            {{user.username}}
            - <a (click)="deleteUser(user.id)">Delete</a>
        </li>
    </ul>
    <p><a [routerLink]="['/login']">Logout</a></p>
</div>
  `,
})
 
export class UserComponent implements OnInit {
    user: User;
    users: User[] = [];
    model: any = {};
 
    constructor(private userService: UserService) {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
    }
 
    ngOnInit() {
        this.loadAllUsers();
    }
 
    deleteUser(id: number) {
        this.userService.delete(id) 
        // .subscribe(() => { this.loadAllUsers() });
        .subscribe(
			response => {
				if(response.error) { 
	                alert(`The user could not be deleted, server Error.`);
	            } else {
	                this.loadAllUsers()
	            }
            },
            error=> { 
                alert(`The user could not be deleted, server Error.`);
            }
        );
    }

    updateUser(){
		this.userService.update(this.model)
		.subscribe(
			response => {
				if(response.error) { 
	                alert(`The user could not be updated, server Error.`);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
	            }
            },
            error=> { 
            	alert(`The user could not be updated, server Error.`);
            }
        );
	}

 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; console.log(users) });
    }
}