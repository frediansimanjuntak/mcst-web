import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'; 
import { Announcement } from '../../models/index';
import { AnnouncementService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';
import * as $ from "jquery";
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


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
                private alertService: AlertService,
                overlay: Overlay, 
                vcRef: ViewContainerRef, 
                 public modal: Modal) {
          overlay.defaultViewContainer = vcRef;
    }

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

    openCustom(announcement) {
      // this.modal.open(PublishAnnouncementModalComponent, new PublishAnnouncementModalData(announcement));
    }

    openModal(announcement){
      console.log(announcement);
      this.modal.alert()
        .size('lg')
        .showClose(true)
        .title('Publish Announcement')
        .body(`
          {{  announcement.valid_till }}
             <form class="form-horizontal col-md-6" name="form" #f="ngForm" novalidate>
                <div class="form-group" >
                    <label class="control-label col-sm-4" for="sticky">Sticky?:</label>
                    <div class="col-sm-8">
                         <label><input type="radio" name="sticky" [checked]="model.sticky === 'true'" [(ngModel)]="announcement.publish" [value]=true>Yes</label>
                        <label><input type="radio" name="sticky" [checked]="model.sticky === false" [(ngModel)]="announcement.publish" [value]=false>No</label>     
                    </div>
                </div>
                <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !valid_till.valid }">
                    <label class="control-label col-sm-4" for="valid_till">Valid till :</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="valid_till" [(ngModel)]="announcement.valid_till" #valid_till="ngModel" required />
                        <span *ngIf="f.submitted && !valid_till.valid" class="help-block">valid_till is required</span>
                         <!--   <ng2-datepicker [(ngModel)]="announcement.valid_till"></ng2-datepicker> -->
                    </div>
                </div>
                <div class="form-group pull-right">
                    <button [disabled]="loading" (click)="publishAnnouncement()" class="btn btn-primary">Create</button>
                    <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    <a [routerLink]="['/announcement']" class="btn btn-info">Cancel</a>
                </div>
            </form>     

           `)
        .open();


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

    publishAnnouncement(){

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
        this.router.navigate(['/announcement/edit', anouncement._id]);
    }

}
