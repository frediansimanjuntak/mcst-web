import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, DevelopmentService } from '../../services/index';
import { User } from '../../models/index';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';


import { EqualValidator } from '../user/equal-validator.directive';

@Component({
    // moduleId: module.id,
    selector: 'edit-contact',
    templateUrl: '../../templates/edit-contact.html',
})

export class EditContactComponent {
    model: any = {};
    contact: any = {};
    id: string;
    name: any;
    loading: boolean = true;

    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        
        private _notificationsService: NotificationsService,
        private developmentService: DevelopmentService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.userService.getById(this.id)
            .subscribe(contact => {
                this.contact = contact;
                setTimeout(() => this.loading = false, 1000);
            });
        };
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            setTimeout(() => this.loading = false, 1000);
        })
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    updateSetting(){
        this.loading = true
		this.userService.update(this.contact)
	    .then(
            data => {
                this._notificationsService.success('Success', 'Update contact successful')
                this.router.navigate([this.name.default_development.name_url + '/contact']);
            },
            error => {
                this.userService.checkError(error.json().code)
                this._notificationsService.error('Error', 'Update contact failed, server Error')
                setTimeout(() => this.loading = false, 1000);
            }
        );
	}

    number(event: any) {
        const pattern = /[0-9\+\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    text(event: any) {
        const pattern = /[a-z\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/contact' ]);
    }
}
