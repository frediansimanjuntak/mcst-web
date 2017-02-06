import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement, Announcements} from '../../models/index';
import { AnnouncementService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'announcement',
  templateUrl: 'app/templates/announcement.html',
})

export class AnnouncementComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
	announcement: Announcement;
    announcements: any[] = [];
    validTillDateOptions: any = {};
    model: any = {};
    cols: any[];
    public developmentId;
    public data;
    public announcementsDrafted;
    public announcementsPublished;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    valid_tillStatus: string;
    stickyStatus: string;
    name: any;
    
    constructor(
                private router: Router,
                private announcementService: AnnouncementService,
                private alertService: AlertService,
                private userService: UserService
                ) {

    }

    ngOnInit(): void {
        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadAllAnnouncements();
                            })
        this.model.publish = false;                              
        this.validTillDateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'Forever (default)',
            // disableUntil: {year: 2016, month: 8, day: 10}
            selectionTxtFontSize: '16px'
        };
    }

    deleteAnnouncement(announcement) {
      console.log(announcement);
        this.announcementService.delete(announcement._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Announcement could not be deleted, server Error.`);
              } else {
                
                alert(`Delete announcement successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Announcement could not be deleted, server Error.`);
            }
        );
    }



    openModal(announcement){
        this.announcement = announcement;
        this.valid_tillStatus = announcement.valid_till;
        this.stickyStatus = announcement.sticky;

        if(this.valid_tillStatus == "forever"){
              this.valid_tillStatus = "";
        }
        console.log(this.announcement);
    }

    publishAnnouncement(){
        if ( this.valid_tillStatus == ""){
            this.announcement.valid_till = "forever";
        }else{
             this.announcement.valid_till = this.valid_tillStatus;
        }

        this.announcement.sticky = this.stickyStatus;
        this.announcement.publish = true;

        this.announcementService.publish(this.announcement._id)
          .then(
            response => {
              if(response) {
                alert(`The Announcement could not be publish, server Error.`);
              } else {
                alert(`Delete Newsletter successful`);
                this.firstModal.close();
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Announcement could not be deleted, server Error.`);
            }
        );

        this.firstModal.close();
        this.ngOnInit();
    }

    validTillDateChanged(event:any) {
      // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
       this.valid_tillStatus = event.formatted.replace(/-/g, "/");;
    }

    private loadAllAnnouncements() {
        this.announcementService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    console.log(data);
                          this.announcements            = data.filter(data => data.development._id === this.name.default_development._id );
                          this.announcementsDrafted     = this.announcements.filter(data => data.publish == false );
                          this.announcementsPublished   = this.announcements.filter(data => data.publish == true );
                }, 1000);
            });
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/announcement/add']);  
    }

    editAnnouncement(anouncement: Announcement){
        console.log(anouncement);
        this.router.navigate([this.name.default_development.name + '/announcement/edit', anouncement._id]);
    }

}
