import { Component, OnInit } from '@angular/core';
import { MENUS } from '../models/menu';
import { UserService } from '../services/index';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-progress-bar';
@Component({
	// moduleId: module.id,
	selector: 'navbar',
	templateUrl: '../templates/navbar.html',
	styleUrls: [ '../templates/styles/navbar.css' ]
})

export class NavbarComponent implements OnInit {
	menus = MENUS;
	name : any;
	constructor(private slimLoadingBarService: SlimLoadingBarService, private userService: UserService) { }

	ngOnInit(){
		this.userService.getByToken().subscribe(name => { this.name = name.user;})
	}

	start() {
        this.slimLoadingBarService.start(() => {});
    }
}
