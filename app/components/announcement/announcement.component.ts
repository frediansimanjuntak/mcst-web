import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement, Announcements} from '../../models/index';
import { AnnouncementService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import {IMyOptions} from 'mydatepicker';
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
     private validTillDateOptions: IMyOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,    
            disableUntil: {year: 0, month: 0, day: 0},
            editableDateField: false,
            selectionTxtFontSize: '16px'
        };


    @ViewChild('firstModal') firstModal;
	announcement: Announcement;
    announcements: any[] = [];
    model: any = {};
    publishData: any = {};
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
    
    private validTillDateTxt: string = 'Forever (default)';

    ngOnInit(): void {
        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadAllAnnouncements();
                            })
        let copy: IMyOptions = this.getCopyOfValidTillDateOptions();
        let today = new Date();
        let month = today.getUTCMonth() + 1; //months from 1-12
        let day = today.getUTCDate();
        let year = today.getUTCFullYear();
        copy.disableUntil = {
            year: year,
            month: month,
            day: day
        };
        this.validTillDateOptions = copy;

        this.model.publish = false;                              
    }

    getCopyOfValidTillDateOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.validTillDateOptions));
    }

    deleteAnnouncement(announcement) {
        this.announcementService.delete(announcement._id)
          .then(
            response => {
              if(response) {
                alert(`The Announcement could not be deleted, server Error.`);
              } else {
                
                alert(`Delete announcement successful`);
                this.ngOnInit()
              }
            },
            error=> {
                alert(`The Announcement could not be deleted, server Error.`);
            }
        );
    }



    openModal(announcement){
        this.announcement = announcement;
        this.valid_tillStatus = announcement.valid_till;
        this.stickyStatus = announcement.sticky;

        if(this.valid_tillStatus == ""){
              this.valid_tillStatus = "";
        }
    }

    publishAnnouncement(){
        if ( this.valid_tillStatus == ""){
            this.announcement.valid_till = "forever";
        }else{
             this.announcement.valid_till = this.valid_tillStatus;
        }

        
        this.publishData.sticky = this.stickyStatus;
        this.publishData.valid_till = this.announcement.valid_till;

        this.announcementService.publish(this.announcement._id , this.publishData)
          .then(
            response => {
              if(response) {
                alert(`The Announcement could not be publish, server Error.`);
              } else {
                alert(`Publish Announcement successful`);
                this.firstModal.close();
                this.ngOnInit()
              }
            },
            error=> {
                alert(`The Announcement could not be deleted, server Error.`);
            }
        );

        this.firstModal.close();
        this.ngOnInit();
    }

    validTillDateChanged(event:any) {
       this.valid_tillStatus = event.formatted.replace(/-/g, "/");;
    }

    private loadAllAnnouncements() {
        this.announcementService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
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
        this.router.navigate([this.name.default_development.name + '/announcement/edit', anouncement._id]);
    }

}
