import { Component, OnInit } from '@angular/core';
import { MENUS } from '../models/menu';
import { Router } from '@angular/router';
import { Notification } from '../models/index';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-progress-bar';
import { UserService, NotificationService } from '../services/index';


@Component({
  // moduleId: module.id,
  selector: 'dashboard',
  templateUrl: '../templates/dashboard.html',
  // styleUrls: [ 'dashboard.css' ]
})
export class DashboardComponent implements OnInit{
  menus = MENUS;
  name : any;
  menus1: any = [];
  menus2: any = [];
  menus3: any = [];

  notification: Notification;
  allNotifications: Notification[] = [];
  unreadNotifications: Notification[] = [];
  unreadPetitionNotifications: Notification[] = [];
  unreadIncidentNotifications: Notification[] = [];
  unreadBookingNotifications: Notification[] = [];

  petitionNotificationsIds: any ={};
  incidentNotificationsIds: any ={};
  bookingNotificationsIds: any ={};
  unreadPetitionTotal: number;
  unreadIncidentTotal: number;
  unreadBookingTotal: number;
  today: number = Date.now();
    loading: boolean = true;
  constructor(private router: Router,
              private slimLoadingBarService: SlimLoadingBarService, 
              private notificationService: NotificationService,
              
              private userService: UserService) { }


  ngOnInit(): void {

    this.userService.getByToken()
    .subscribe(name => { 
      this.name = name.user;
      setTimeout(() => this.loading = false, 1000);
    })

    this.menus1[0] = this.menus[2];
    this.menus1[1] = this.menus[3];
    this.menus1[2] = this.menus[4];
    this.menus1[3] = this.menus[5];
    this.menus1[4] = this.menus[6];

    this.menus2[0] = this.menus[1].sub[0];
    this.menus2[1] = this.menus[1].sub[1];
    this.menus2[2] = this.menus[1].sub[3];
    this.menus3 = this.menus[7].sub;
  }

  start(link:any) {
        let ids:any ={};
        if(link.indexOf('petition') > -1){
          ids = this.petitionNotificationsIds; 
        }else if(link.indexOf('incident') > -1){
          ids = this.incidentNotificationsIds; 
        }else if(link.indexOf('booking') > -1){
          ids = this.bookingNotificationsIds; 
        }else{
          ids = 0;
        }

        this.slimLoadingBarService.start(() => {});
        if( ids != 0){
          this.notificationService.read(ids)  
        }
        
        this.router.navigate([this.name.default_development.name_url + link]);  
  }

  private loadUnread() {        
        this.notificationService.getUnread()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.unreadPetitionNotifications = data.filter(data => data.ref == 'petition');
                    this.unreadIncidentNotifications = data.filter(data => data.ref == 'incident');
                    this.unreadBookingNotifications  = data.filter(data => data.ref == 'booking');

                    this.unreadPetitionTotal = this.unreadPetitionNotifications.length;
                    this.unreadIncidentTotal = this.unreadIncidentNotifications.length;
                    this.unreadBookingTotal  = this.unreadBookingNotifications.length;

                    this.menus2[1].notifTOtal = this.unreadIncidentTotal;

                    this.petitionNotificationsIds._ids = [];  
                    this.incidentNotificationsIds._ids = [];  
                    this.bookingNotificationsIds._ids = [];  

                    for (var i = 0; i < this.unreadPetitionTotal; i++) {
                        this.petitionNotificationsIds._ids.push(this.unreadPetitionNotifications[i]._id)
                    }

                    for (var i = 0; i < this.unreadIncidentTotal; i++) {
                        this.incidentNotificationsIds._ids.push(this.unreadIncidentNotifications[i]._id)
                    }

                    for (var i = 0; i < this.unreadBookingTotal; i++) {
                        this.bookingNotificationsIds._ids.push(this.unreadBookingNotifications[i]._id)
                    }
                }, 1000);
            });

    }
}
