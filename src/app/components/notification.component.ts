import { Component, OnInit } from '@angular/core';
import { Notification, Notifications } from '../models/index';
import { NotificationService, AlertService, UserService} from '../services/index';
import { Router} from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';

@Component({
	// moduleId: module.id,
	selector: 'notification',
	templateUrl: '../templates/notification.html',
})

export class NotificationComponent implements OnInit {
	notification: Notification;
	allNotifications: Notification[];
    dataToShow: Notification[];
	unreadNotifications: Notification[] = [];
	allNotificationTotal: number;
	userId: string;
    name: any;
    loading: boolean = true;

	constructor(
                private notificationService: NotificationService,
                private alertService: AlertService,
                private userService: UserService,
                private router: Router,
                private _notificationsService: NotificationsService
                ) {}

    ngOnInit(): void {
    	this.userService.getByToken()
            .subscribe(name => {
                   this.name = name;
                   this.userId = this.name._id;
                   this.loadNotifications();
               })

	}

	private loadNotifications() {
        this.notificationService.getOwn()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.allNotifications = data;
                    this.allNotificationTotal = this.allNotifications.length;
                    this.dataToShow            = this.allNotifications.slice(0, 10);
                    setTimeout(() => this.loading = false, 1000);
                }, 1000);
            });
    }

    loadLazy(event) {
        this.loading = true
        setTimeout(() => {
            if(this.allNotifications) {
                this.dataToShow = this.allNotifications.slice(event.first, (event.first + event.rows));
            }
            this.loading = false
        }, 250);
    }

    goToPage(notification: Notification){
        var link = this.notificationService.generateLink(notification.ref_id);
        this.router.navigate([this.name.default_development.name_url + link]);
    }
}
