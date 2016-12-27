import { Component } from '@angular/core';
import { MENUS } from '../models/menu';

@Component({
	moduleId: module.id.replace("/dist/", "/"),
	selector: 'navbar',
	templateUrl: '/app/templates/navbar.html',
	styleUrls: [ '../templates/styles/navbar.css' ]
})

export class NavbarComponent {
	menus = MENUS;
}