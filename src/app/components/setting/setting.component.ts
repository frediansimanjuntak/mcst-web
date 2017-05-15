import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';

import { Observable} from 'rxjs/Observable';


@Component({
    // moduleId: module.id,
    selector: 'setting',
    templateUrl: '../../templates/setting.html',
})

export class SettingComponent implements OnInit {
    user: any;
    users: User[] = [];
    name: any;
    model: any = {};
    loading: boolean = true;

    constructor(private router: Router,private userService: UserService,private alertService: AlertService) {}

    ngOnInit() {
        this.userService.getByToken()
        .subscribe(user => {
            this.user = user.user;
            setTimeout(() => this.loading = false, 1000);
        })
    }

    edit(user: User){
        this.router.navigate([this.user.default_development.name_url + '/setting/edit', user._id]);
    }
}
