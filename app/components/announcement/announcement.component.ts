import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Announcement } from '../../models/index';
import { AnnouncementService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'announcement',
  templateUrl: '/app/templates/announcement.html',
})

export class AnnouncementComponent implements OnInit { 
	  announcement: Announcement;
    announcements: Announcement[] = [];
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

    constructor(
                private router: Router,
                private announcementService: AnnouncementService, 
                private alertService: AlertService) {}

    ngOnInit(): void {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllAnnouncements();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteAnnouncement(announcement: any) {
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

    publishAnnouncement(announcement: any){
      console.log(announcement);
      // this.announcementService.publish(announcement._id, this.developmentId) 
      //     .then(
      //       response => {
      //         if(response) { 
      //           console.log(response);
      //           // console.log(response.error());
      //           alert(`The Newsletter could not be release, server Error.`);
      //         } else {
      //           this.alertService.success('Release Newsletter successful', true);
      //           alert(`Release Newsletter successful`);
      //           this.ngOnInit()
      //         }
      //       },
      //       error=> { 
      //         console.log(error);
      //           alert(`The Newsletter could not be release, server Error.`);
      //       }
      //   );
    }

    private loadAllAnnouncements() {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          = data.find(data => data._id === this.developmentId );
        //             this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' ); 
        //             this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
        //             console.log(this.dataAgm);
        //         }, 1000);
        //     });

        this.announcementService.getAnnouncements().then(data => {
            this.announcements            = data;
            this.announcementsDrafted     = this.announcements.filter(data => data.publish === false ); 
            this.announcementsPublished   = this.announcements.filter(data => data.publish === true );
            console.log(this.announcements);
        });
    }

    public tabs:Array<any> = [
        {title: 'Dynamic Title 1', content: ''},
        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
        {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true},
        {title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass'}
    ];
     
    public setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };


    editAnnouncement(anouncement: Announcement){
        this.router.navigate(['/anouncement/edit', anouncement._id]);
    }
}
