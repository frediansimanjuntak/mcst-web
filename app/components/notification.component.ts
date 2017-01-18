import { Component, OnInit } from '@angular/core';
import { Notification, Notifications } from '../models/index';
import { NotificationService, AlertService, UserService} from '../services/index';
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
                private userService: UserService
                ) {}

    ngOnInit(): void {
    	this.userService.getByToken()
            .subscribe(name => {
                   this.name = name;
                   this.userId = this.name._id;
               })
       	this.loadNotifications();

	}

	private loadNotifications() {
        //---------------------------Call To Api-------------- //
        // this.notificationService.getAll(this.userId)
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.allNotifications = data;
        //             this.allNotificationTotal = this.allNotifications.length;
        //             this.dataToShow            = this.allNotifications.slice(0, 10);
        //         }, 1000);
        //     });

        this.notificationService.getNotifications().then(data => {
            this.allNotifications 	   = data.filter(data => data.user == this.userId );
            this.allNotificationTotal  = this.allNotifications.length;
            this.dataToShow            = this.allNotifications.slice(0, 10);
            console.log(this.allNotificationTotal);
        });
    }

    loadLazy(event) {
        setTimeout(() => {
            if(this.allNotifications) {
                this.dataToShow = this.allNotifications.slice(event.first, (event.first + event.rows));
            }
        }, 250);
    }
}
