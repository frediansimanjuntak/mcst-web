import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, DevelopmentService } from '../../services/index';
import { User } from '../../models/index';
import { EqualValidator } from './equal-validator.directive';
import 'rxjs/add/operator/switchMap';
import '../../rxjs-operators';

@Component({
    moduleId: module.id,
    templateUrl: '/app/templates/edit-user.html',
})
 
export class EditUserComponent {
    user: User;
    model: any = {};
    id: string;
 
    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private developmentService: DevelopmentService) {}

    ngOnInit(): void {   
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.userService.getById(this.id).subscribe(user => this.user = user);
        };
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    updateSetting(){
		    this.userService.update(this.user)
		    .then(response => {
                  this.alertService.success('Update User successful', true);
                  this.router.navigate(['/user']);
	            },
              error=> { 
            	    this.alertService.error(error);
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
}