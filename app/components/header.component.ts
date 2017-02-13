import { Component, OnInit, ElementRef } from '@angular/core';
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
    authToken : any;
	notification: Notification;
	allNotifications: Notification[] = [];
	unreadNotifications: Notification[] = [];
    unreadNotificationsToShow: Notification[] = [];
    notificationsIds: any ={};
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
    	this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                if(this.authToken){
                                    this.loadUnread();
                                }
                            })
        this.NotificationClicked = false;

	}

	private loadUnread() {        this.notificationService.getUnread(this.name._id)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.unreadNotifications = data;
                    this.unreadNotificationsToShow  = data.slice(0, 10);
                    this.unreadNotificationTotal = this.unreadNotifications.length;
                    this.notificationsIds._ids = [];    
                    for (var i = 0; i < this.unreadNotificationsToShow.length; i++) {
                        this.notificationsIds._ids.push(this.unreadNotificationsToShow[i]._id)
                    }
                }, 1000);
            });

    }

    onNotificationClick(){
    	this.unreadNotificationTotal = 0;
        
        if(this.NotificationClicked === false){
            this.notificationService.read(this.notificationsIds, this.name._id)
        }
        
        this.NotificationClicked = true;
    }

    goToPage(notification: Notification){
        switch (notification.ref)
        {
            case 'petition' :
                this.router.navigate([this.name.default_development.name_url + '/petition/view', notification.ref_id]);
            break;
            case 'incident' :
                this.router.navigate([this.name.default_development.name_url + '/incident/view', notification.ref_id]);
            break;
            case 'payment' :
                this.router.navigate([this.name.default_development.name_url + '/payment/view', notification.ref_id]);
            break;
            case 'contract' :
                this.router.navigate([this.name.default_development.name_url + '/contract/view', notification.ref_id]);
            break;
            case 'facility' :
                this.router.navigate([this.name.default_development.name_url + '/facility/view', notification.ref_id]);
            break;
            case 'booking' :
                this.router.navigate([this.name.default_development.name_url + '/booking/view', notification.ref_id]);
            break;
            case 'unit' :
                this.router.navigate([this.name.default_development.name_url + '/unit/view', notification.ref_id]);
            break;
            case 'lost_found' :
                this.router.navigate([this.name.default_development.name_url + '/lost_found/view', notification.ref_id]);
            break;
            case 'poll' :
                this.router.navigate([this.name.default_development.name_url + '/poll/view', notification.ref_id]);
            break;     
        }
    }

    logout(){
        this.authService.logout()
        this.appComponent.getToken();
    }
}
