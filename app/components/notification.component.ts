import { Component, OnInit } from '@angular/core';
import { Notification, Notifications } from '../models/index';
import { NotificationService, AlertService} from '../services/index';
import '../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
	// moduleId: module.id,
	selector: 'headers',
	templateUrl: 'app/templates/header.html',
	styleUrls: [ 'app/templates/styles/header.css' ]
})

export class HeaderComponent implements OnInit {
	notification: Notification;
	allNotifications: Notification[] = [];
	unreadNotifications: Notification[] = [];
	unreadNotificationTotal: number;
	userId: string;

	constructor(
                private notificationService: NotificationService,
                private alertService: AlertService,
                ) {
		this.userId = "1"
    }

    ngOnInit(): void {
    	
       	this.loadNotifications();

	}

	private loadNotifications() {
        //---------------------------Call To Api-------------- //
        // this.notificationService.getAll(this.userId)
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.unreadNotifications = data;
        //             this.unreadNotificationTotal = this.unreadNotifications.length;
        //         }, 1000);
        //     });

        this.notificationService.getNotifications().then(data => {
            this.allNotifications 		= data.filter(data => data.user == this.userId );
            console.log(this.unreadNotificationTotal);
        });
    }

    onNotificationClick(){
    	this.unreadNotificationTotal = 0;
    }
}
