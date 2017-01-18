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
    unreadNotificationsToShow: Notification[] = [];
    notificationsIds: any[] = [];
	unreadNotificationTotal: number;
	userId: string;
    user: string;
    NotificationClicked: boolean;

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
        this.NotificationClicked = false;

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
            this.unreadNotificationsToShow  = this.allNotifications.filter(data => data.read_at == '' && data.user == this.userId ).slice(0, 10);
            this.unreadNotificationTotal 	= this.unreadNotifications.length;

            for (var i = 0; i < this.unreadNotificationsToShow.length; i++) {
                this.notificationsIds[i] = this.unreadNotificationsToShow[i]._id;
            }

            console.log(this.notificationsIds);
        });
    }

    onNotificationClick(){
    	this.unreadNotificationTotal = 0;

        if(this.NotificationClicked == false){
            this.notificationService.read(this.notificationsIds, this.userId)
        }
        
        this.NotificationClicked = true;
    }

    logout(){
        this.authService.logout()
    }
}
