import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AlertService, UserService, DevelopmentService } from '../../services/index';
import { User } from '../../models/index';
import 'rxjs/add/operator/switchMap';
import '../../rxjs-operators';

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
        private developmentService: DevelopmentService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.userService.getUser(this.id).then(user => this.user = user);
        };
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    updateSetting(){
        this.user.details.identification_proof.front = this.model.front;
        this.user.details.identification_proof.back = this.model.back;

            console.log(this.user);
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

    onChange(event: any) {
        let files = [].slice.call(event.target.files);
        this.model.front =  files;
    }

    onChange1(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.back =  files;
    }

    remove(i: any){
        this.model.front.splice(i, 1)
    }

    remove1(i: any){
        this.model.back.splice(i, 1)
    }

    cancel(){
        this.userService.getByToken().subscribe(name => this.name = name)
        this.router.navigate([this.name.default_development.name + '/setting' ]);
    }
}
