import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
	// moduleId: module.id,
	selector: 'headers',
	templateUrl: 'app/templates/header.html',
	styleUrls: [ 'app/templates/styles/header.css' ]
})

export class HeaderComponent {
	title = 'MCST';
}
