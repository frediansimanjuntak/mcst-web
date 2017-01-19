import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement, } from '../../models/index';
import { AnnouncementService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
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
    announcements: Announcement[] = [];
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
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.validTillDateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'Forever (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };

        this.loadAllAnnouncements();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteAnnouncement(announcement) {
      console.log(announcement);
        // this.announcementService.delete(announcement._id)
        //   .then(
        //     response => {
        //       if(response) {
        //         console.log(response);
        //         // console.log(response.error());
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //       } else {
        //         this.alertService.success('Create user successful', true);
        //         alert(`Delete Newsletter successful`);
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> {
        //       console.log(error);
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //     }
        // );
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
        // this.announcementService.publish(this.announcement._id)
        //   .then(
        //     response => {
        //       if(response) {
        //         alert(`The Announcement could not be publish, server Error.`);
        //       } else {
        //         alert(`Delete Newsletter successful`);
        //         this.firstModal.close();
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> {
        //       console.log(error);
        //         alert(`The Announcement could not be deleted, server Error.`);
        //     }
        // );
        this.firstModal.close();
        this.ngOnInit();
    }

    validTillDateChanged(event:any) {
      // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
       this.valid_tillStatus = event.formatted.replace(/-/g, "/");;
    }

    private loadAllAnnouncements() {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //                   this.announcements            = data;
        //                   this.announcementsDrafted     = this.announcements.filter(data => data.publish === false );
        //                   this.announcementsPublished   = this.announcements.filter(data => data.publish === true );
        //         }, 1000);
        //     });

        this.announcementService.getAnnouncements().then(data => {
            this.announcements            = data;
            this.announcementsDrafted     = this.announcements.filter(data => data.publish === false );
            this.announcementsPublished   = this.announcements.filter(data => data.publish === true );
        });
    }

    add(){
        this.router.navigate([this.name.development.name + '/announcement/add']);  
    }

    editAnnouncement(anouncement: Announcement){
        this.router.navigate([this.name.default_development.name + '/announcement/edit', anouncement._id]);
    }

}
