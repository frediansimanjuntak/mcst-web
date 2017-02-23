import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';

@Component({
    // moduleId: module.id,
    selector: 'setting',
    templateUrl: 'app/templates/setting.html',
})

export class SettingComponent implements OnInit {
    user: any;
    users: User[] = [];
    name: any;
    model: any = {};

    constructor(private router: Router,private userService: UserService,private appComponent: AppComponent,private alertService: AlertService) {}

    ngOnInit() {
        this.userService.getByToken()
        .subscribe(user => {
            this.user = user;
            console.log(this.user)
            // this.userService.getById(this.name._id)
            // .subscribe(user => {
            //     this.user = user;
            //     console.log(this.user)
            //     setTimeout(() => this.appComponent.loading = false, 1000);
            // });
            setTimeout(() => this.appComponent.loading = false, 1000);
        })
    }

    edit(user: User){
        this.router.navigate([this.user.default_development.name_url + '/setting/edit', user._id]);
    }
}
