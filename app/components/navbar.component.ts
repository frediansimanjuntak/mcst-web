import { Component } from '@angular/core';
import { MENUS } from '../models/menu';

@Component({
	moduleId: module.id,
	selector: 'navbar',
	templateUrl: '../templates/navbar.html',
	styleUrls: [ '../templates/styles/navbar.css' ]
})

export class NavbarComponent {
	menus = MENUS;
}