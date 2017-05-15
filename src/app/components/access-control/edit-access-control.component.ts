import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AccessControl, Development, User  } from '../../models/index';
import { AccessControlService, AlertService, UserService, UnitService } from '../../services/index';

import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-development',
  templateUrl: '../../templates/edit-access-control.html',
})

export class EditAccessControlComponent implements OnInit {
	accesscontrol: AccessControl;
    model: any = {};
    unit: Development;
    users: User[];
    id: string;
    name: any;

    constructor(private router: Router,
    	private accesscontrolService: AccessControlService,
        private userService: UserService,
        private unitService: UnitService,
    	private alertService: AlertService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.unitService.getDevelopment("1")
            .then(unit => {
                this.unit = unit;
            });
        this.userService.getUsers()
            .then(users => {
                this.users = users;
            });
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.accesscontrolService.getAccessControl(this.id).then(accesscontrol => this.accesscontrol = accesscontrol);
        }
    }

    createAccessControl() {
        this.accesscontrolService.create(this.model)
        .then(
            response => {
                this.alertService.success('Create access control successful', true);
                this.router.navigate([this.name.development.name + '/access_control']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    updateAccessControl(){
		this.accesscontrolService.update(this.accesscontrol)
		.then(
			response => {
                this.alertService.success('Update access control successful', true);
                this.router.navigate([this.name.development.name + '/access_control']);
            },
            error => {
            	this.alertService.error(error);
            }
        );
	}

    cancel(){
        this.router.navigate([this.name.development.name + '/access_control' ]);
    }
}
