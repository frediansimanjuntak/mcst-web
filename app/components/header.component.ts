import { Component, OnInit } from '@angular/core';
import { Notification, Notifications } from '../models/index';
import { Router} from '@angular/router';
import { NotificationService, AlertService, UserService, AuthenticationService} from '../services/index';
import '../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from './index';

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
    name: any;

	constructor(
                private notificationService: NotificationService,
                private alertService: AlertService,
                private userService: UserService,
                private authService: AuthenticationService,
                private appComponent: AppComponent,
                private router: Router,
                ) {
		this.userId = "1"
    }

    ngOnInit(){
    	this.userService.getByToken().subscribe(name => this.name = name)
       	this.loadUnread();
        this.NotificationClicked = false;

	}

	private loadUnread() {
        //---------------------------Call To Api-------------- //
        // this.notificationService.getUnread(this.userId)
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.unreadNotifications = data;
        //             this.unreadNotificationsToShow  = data.slice(0, 10);
        //             this.unreadNotificationTotal = this.unreadNotifications.length;

        //             for (var i = 0; i < this.unreadNotificationsToShow.length; i++) {
        //                 this.notificationsIds[i] = this.unreadNotificationsToShow[i]._id;
        //             }

        //             console.log(this.notificationsIds);
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

        });
    }

    onNotificationClick(){
    	this.unreadNotificationTotal = 0;

        if(this.NotificationClicked == false){
            this.notificationService.read(this.notificationsIds, this.name._id)
        }
        
        this.NotificationClicked = true;
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

    logout(){
        this.authService.logout()
        this.appComponent.ngOnInit();
    }
}
