import { Component, OnInit } from '@angular/core';
import { Notification, Notifications } from '../models/index';
import { NotificationService, AlertService, UserService} from '../services/index';
import { Router} from '@angular/router';
import '../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
	// moduleId: module.id,
	selector: 'notification',
	templateUrl: 'app/templates/notification.html',
})

export class NotificationComponent implements OnInit {
	notification: Notification;
	allNotifications: Notification[];
    dataToShow: Notification[];
	unreadNotifications: Notification[] = [];
	allNotificationTotal: number;
	userId: string;
    name: any;

	constructor(
                private notificationService: NotificationService,
                private alertService: AlertService,
                private userService: UserService,
                private router: Router,
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
        this.notificationService.getAll(this.userId)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.allNotifications = data;
                    this.allNotificationTotal = this.allNotifications.length;
                    this.dataToShow            = this.allNotifications.slice(0, 10);
                }, 1000);
            });
    }

    loadLazy(event) {
        setTimeout(() => {
            if(this.allNotifications) {
                this.dataToShow = this.allNotifications.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }

    goToPage(notification: Notification){
        switch (notification.ref)
        {
            case 'petition' :
                this.router.navigate([this.name.default_development.name + '/petition/view', notification.ref_id]);
            break;
            case 'incident' :
                this.router.navigate([this.name.default_development.name + '/incident/view', notification.ref_id]);
            break;
            case 'payment' :
                this.router.navigate([this.name.default_development.name + '/payment/view', notification.ref_id]);
            break;
            case 'contract' :
                this.router.navigate([this.name.default_development.name + '/contract/view', notification.ref_id]);
            break;
            case 'facility' :
                this.router.navigate([this.name.default_development.name + '/facility/view', notification.ref_id]);
            break;
            case 'booking' :
                this.router.navigate([this.name.default_development.name + '/booking/view', notification.ref_id]);
            break;
            case 'unit' :
                this.router.navigate([this.name.default_development.name + '/unit/view', notification.ref_id]);
            break;
            case 'lost_found' :
                this.router.navigate([this.name.default_development.name + '/lost_found/view', notification.ref_id]);
            break;
            case 'poll' :
                this.router.navigate([this.name.default_development.name + '/poll/view', notification.ref_id]);
            break;     
        }
    }
}