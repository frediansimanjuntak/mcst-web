import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'header',
	templateUrl: '../templates/header.html',
	styleUrls: [ '../templates/styles/header.css' ]
})

export class HeaderComponent {
	title = 'MCST'; 
}