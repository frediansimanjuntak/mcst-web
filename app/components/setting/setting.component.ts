import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
    // moduleId: module.id,
    templateUrl: 'app/templates/setting.html',
})

export class SettingComponent implements OnInit {
    user: User;
    users: User[] = [];
    model: any = {};

    constructor(private router: Router,private userService: UserService,private alertService: AlertService) {
        // this.user = JSON.parse(localStorage.getItem('user'));
        // console.log(this.user)
    }

    ngOnInit() {
        this.loadSetting();
    }

    private loadSetting() {
        this.userService.getUser("1").then(user => { this.user = user; console.log(user) });
    }

    edit(user: User){
        this.router.navigate(['/setting/edit', user._id]);
    }
}
