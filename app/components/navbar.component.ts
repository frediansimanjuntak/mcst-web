import { Component } from '@angular/core';
import { MENUS } from '../models/menu';

@Component({
	moduleId: module.id,
	selector: 'navbar',
	templateUrl: '/app/templates/navbar.html',
	styleUrls: [ '/app/templates/styles/navbar.css' ]
})

export class NavbarComponent {
	menus = MENUS;
}