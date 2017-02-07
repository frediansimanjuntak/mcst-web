import { Component, OnInit } from '@angular/core';
import { MENUS } from '../models/menu';
import { UserService } from '../services/index';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-loading-bar';
@Component({
	// moduleId: module.id,
	selector: 'navbar',
	templateUrl: 'app/templates/navbar.html',
	styleUrls: [ 'app/templates/styles/navbar.css' ]
})

export class NavbarComponent implements OnInit {
	menus = MENUS;
	name : any;
	constructor(private slimLoadingBarService: SlimLoadingBarService, private userService: UserService) { }

	ngOnInit(){
		this.userService.getByToken().subscribe(name => { this.name = name;})
	}

	start() {
        this.slimLoadingBarService.start(() => {});
    }
}
