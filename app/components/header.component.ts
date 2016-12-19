import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'header',
	templateUrl: '../templates/header.html',
	styleUrls: [ '../templates/styles/header.css' ]
})

export class HeaderComponent {
	user: User;	
    users: User[] = [];	
	title = 'MCST'; 

	constructor(private userService: UserService) {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
    }
}