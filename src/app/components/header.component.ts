import { Component, OnInit, ElementRef } from '@angular/core';
import { Notification } from '../models/index';
import { Router} from '@angular/router';
import { NotificationService, AlertService, UserService, AuthenticationService, LostFoundService} from '../services/index';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../app.component';

@Component({
	// moduleId: module.id,
	selector: 'headers',
	templateUrl: '../templates/header.html',
	styleUrls: [ '../templates/styles/header.css' ]
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
    user: string;
    NotificationClicked: boolean;
    name: any;
    lostFounds: any[];

	constructor(
                private notificationService: NotificationService,
                private alertService: AlertService,
                private userService: UserService,
                private authService: AuthenticationService,
                private lostFoundService:LostFoundService,
                
                private router: Router,
                ) {
    }

    ngOnInit(){
    	this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
             this.lostFoundService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.lostFounds      = data.filter(data => data.development._id == this.name.default_development._id);
                })
            })
            if(this.name){
                this.loadUnread();
            }
        })
        this.NotificationClicked = false;

	}

	private loadUnread() {        
        this.notificationService.getUnread()
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
        if(this.NotificationClicked === false && this.notificationsIds._ids.length > 0){
            this.notificationService.read(this.notificationsIds)
        }
        
        this.NotificationClicked = true;
    }

    goToPage(notification: Notification){
        var link = this.notificationService.generateLink(notification);
        this.router.navigate([this.name.default_development.name_url + link]);
    }

    logout(){
        this.authService.logout()
        this.userService.getByToken()
        .subscribe(
            name => {
                  this.name = name.user;
            },
            error => {
                this.name = '';
                this.router.navigate(['login']);
            }
        )
    }

    createDummyNotif(){
        var dummyNotif :any = {
                                        _id  : '1',
                                        user : this.name._id,
                                        type : '1',
                                        message : 'New ' + this.lostFounds[0].type + ' From XXX' ,
                                        ref: 'lost_found',
                                        ref_id: this.lostFounds[0]._id,
                                        created_by: '',
                                        read_at : '',
                                        created_at : '2017-03-05T03:31:07'
                              }
        this.router.navigate([this.name.default_development.name_url + '/dashboard',]);                                
        this.unreadNotificationsToShow.unshift(dummyNotif);
        this.unreadNotificationTotal = this.unreadNotificationsToShow.length;
    }
}