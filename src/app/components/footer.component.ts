import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/index';

@Component({
	// moduleId: module.id,
	selector: 'footers',
	templateUrl: '../templates/footer.html',
})

export class FooterComponent implements OnInit {
	name : any;
	title : string;
	constructor(private userService: UserService) { }

	ngOnInit(){
		this.title = "MCST MANAGEMENT SYSTEM"
	}
}
