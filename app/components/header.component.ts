import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'headers',
	templateUrl: '/app/templates/header.html',
	styleUrls: [ '/app/templates/styles/header.css' ]
})

export class HeaderComponent {
	title = 'MCST'; 
}