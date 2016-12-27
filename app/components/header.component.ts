import { Component } from '@angular/core';

@Component({
	moduleId: module.id.replace("/dist/", "/"),
	selector: 'headers',
	templateUrl: '/app/templates/header.html',
	styleUrls: [ '../templates/styles/header.css' ]
})

export class HeaderComponent {
	title = 'MCST'; 
}