import { Component } from '@angular/core';
import { MENUS } from '../models/menu';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-loading-bar';
@Component({
	// moduleId: module.id,
	selector: 'navbar',
	templateUrl: 'app/templates/navbar.html',
	styleUrls: [ 'app/templates/styles/navbar.css' ]
})

export class NavbarComponent {
	menus = MENUS;

	constructor(private slimLoadingBarService: SlimLoadingBarService) { }

	start() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }
}
