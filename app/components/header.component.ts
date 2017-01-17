import { Component, OnInit } from '@angular/core';
import { Notification, Notifications } from '../models/index';
import { NotificationService, AlertService, UserService, AuthenticationService} from '../services/index';
import '../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
	// moduleId: module.id,
	selector: 'headers',
	templateUrl: 'app/templates/header.html',
	styleUrls: [ 'app/templates/styles/header.css' ]
})

export class HeaderComponent implements OnInit{
	title = 'MCST';
	notification: Notification;
	allNotifications: Notification[] = [];
	unreadNotifications: Notification[] = [];
	unreadNotificationTotal: number;
	userId: string;
    user: string;

	constructor(
                private notificationService: NotificationService,
                private alertService: AlertService,
                private userService: UserService,
                private authService: AuthenticationService,
                ) {
		this.userId = "1"
    }

    ngOnInit(){
    	this.userService.getByToken().subscribe(user => { this.user = user; console.log(user.username);})
       	this.loadUnread();

	}

	private loadUnread() {
        //---------------------------Call To Api-------------- //
        // this.notificationService.getUnread(this.userId)
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.unreadNotifications = data;
        //             this.unreadNotificationTotal = this.unreadNotifications.length;
        //         }, 1000);
        //     });

        this.notificationService.getNotifications().then(data => {
            this.allNotifications      		= data;
            this.unreadNotifications 		= this.allNotifications.filter(data => data.read_at == '' && data.user == this.userId );
            this.unreadNotificationTotal 	= this.unreadNotifications.length;
            console.log(this.unreadNotificationTotal);
        });
    }

    onNotificationClick(){
    	this.unreadNotificationTotal = 0;
    }

    logout(){
        this.authService.logout()
    }
}
