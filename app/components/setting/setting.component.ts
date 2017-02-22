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
    user: User;
    users: User[] = [];
    name: any;
    model: any = {};

    constructor(private router: Router,private userService: UserService,private appComponent: AppComponent,private alertService: AlertService) {}

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadSetting();
    }

    private loadSetting() {
        this.userService.getById(this.name._id)
        .subscribe(user => {
            this.user = user;
            setTimeout(() => this.appComponent.loading = false, 1000);
        });
    }

    edit(user: User){
        this.router.navigate([this.name.default_development.name_url + '/setting/edit', user._id]);
    }
}
