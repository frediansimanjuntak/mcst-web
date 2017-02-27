import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, DevelopmentService } from '../../services/index';
import { User } from '../../models/index';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';
import '../../rxjs-operators';
import { AppComponent } from '../index';
import { EqualValidator } from '../user/equal-validator.directive';

@Component({
    // moduleId: module.id,
    selector: 'edit-setting',
    templateUrl: 'app/templates/edit-setting.html',
})

export class EditSettingComponent {
    user: User;
    model: any = {};
    name: any;
    id: string;

    constructor(private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService,
        private developmentService: DevelopmentService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.userService.getById(this.id)
            .subscribe(user => {
                this.user = user;
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        };
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name;
            setTimeout(() => this.appComponent.loading = false, 1000);
        })
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    updateSetting(){
        this.appComponent.loading = true
        console.log(this.user)
		this.userService.update(this.user)
		    .then(
                    data => {
                        this._notificationsService.success(
                                'Success',
                                'Update setting successful',
                        )
                        this.router.navigate([this.name.default_development.name_url + '/user']);
                    },
                    error => {
                        console.log(error);
                        this._notificationsService.error(
                                'Error',
                                'Update setting failed, server Error',
                        )
                        setTimeout(() => this.appComponent.loading = false, 1000);
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

    // onChange(event: any) {
    //     let files = [].slice.call(event.target.files);
    //     this.model.front =  files;
    // }

    // onChange1(event: any) {
    //    let files = [].slice.call(event.target.files);
    //    this.model.back =  files;
    // }

    // remove(i: any){
    //     this.model.front.splice(i, 1)
    // }

    // remove1(i: any){
    //     this.model.back.splice(i, 1)
    // }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/setting' ]);
    }
}
