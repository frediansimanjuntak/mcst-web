import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement, Announcements} from '../../models/index';
import { AnnouncementService, AlertService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { IMyOptions } from 'mydatepicker';
import * as $ from "jquery";
import { ConfirmationService } from 'primeng/primeng';
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'announcement',
  templateUrl: '../../templates/announcement.html',
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
			showClearDateBtn: false,
			disableUntil: {year: 0, month: 0, day: 0},
			editableDateField: false,
			selectionTxtFontSize: '16px'
		};


	@ViewChild('firstModal') firstModal;
	loading: boolean = true
	announcement: Announcement;
	announcements: any[] = [];
	all: any[] = [];
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
	public titleFilter: string = '';
	valid_tillStatus: string;
	stickyStatus: string;
	name: any;
	
	constructor(
				private router: Router,
				private announcementService: AnnouncementService,
				private alertService: AlertService,
				private userService: UserService,
				private confirmationService: ConfirmationService,
				private _notificationsService: NotificationsService,
				) {

	}
	
	private validTillDateTxt: string = 'Forever (default)';

	ngOnInit(): void {
		this.userService.getByToken()
		.subscribe(name => {
			this.name = name.user;
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
		this.loading = true
		this.announcementService.delete(announcement._id)
		  .then(
			 data => {
					this.ngOnInit()
					this._notificationsService.success('Success', 'Delete announcement successful')
				},
				error => {
					if (error.json().message) {
						if (error.json().code) {
							this.userService.checkError(error.json().code, error.json().message)
						}else{
							this._notificationsService.error("Error", error.json().message)    
						}
						
					}else{
						this.userService.checkError(error.status, '')
					} 
					setTimeout(() => this.loading = false, 1000);
				}
		);
	}

	deleteConfirmation(announcement) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this announcement?',
			header: 'Delete Confirmation',
			icon: 'fa fa-trash',
			accept: () => {
				this.deleteAnnouncement(announcement)
			}
		});
	}

	openModal(announcement){
		this.announcement = announcement;
		this.valid_tillStatus = announcement.valid_till;
		if(this.valid_tillStatus == ""){
			  this.valid_tillStatus = "";
		}

		this.stickyStatus = announcement.sticky;

		
	}

	filter(){
	  this.loading=true;
		this.announcements            = this.all.filter(data => data.title.toLowerCase().indexOf(this.titleFilter.toLowerCase()) !==  -1);
		this.announcementsDrafted     = this.announcements.filter(data => data.publish === false && data.valid === true);
		this.announcementsPublished   = this.announcements.filter(data => data.publish === true && data.valid === true);
		setTimeout(() => this.loading = false, 500);
  
	}

	publishAnnouncement(){
		this.loading = true
		if ( this.valid_tillStatus == ""){
			this.announcement.valid_till = "forever";
		}else{
			 this.announcement.valid_till = this.valid_tillStatus;
		}
		this.publishData.sticky = this.stickyStatus;
		this.publishData.valid_till = this.announcement.valid_till;
		this.announcementService.publish(this.announcement._id , this.publishData)
		  .then(
			data => {
					this._notificationsService.success('Success', 'Publish announcement successful')
					this.firstModal.close();
					this.ngOnInit();
				},
				error => {
					if (error.json().message) {
						if (error.json().code) {
							this.userService.checkError(error.json().code, error.json().message)
						}else{
							this._notificationsService.error("Error", error.json().message)    
						}
						
					}else{
						this.userService.checkError(error.status, '')
					} 
					
					setTimeout(() => this.loading = false, 1000);
				}
		);
	}

	validTillDateChanged(event:any) {
	   this.valid_tillStatus = event.formatted.replace(/-/g, "/");
	}

	smart_substr(str:string, len:number) {
		var temp = str.substr(0, len);
		if(temp.lastIndexOf('<') > temp.lastIndexOf('>')) {
			temp = str.substr(0, 1 + str.indexOf('>', temp.lastIndexOf('<')));
		}
		return temp;
	}

	private loadAllAnnouncements() {
		this.announcementService.getAll()
			.subscribe((data)=> {
				setTimeout(()=> {
					for (var i = 0; i < data.length; ++i) {
						if (data[i].message && data[i].message != '' && data[i].message.length > 100) {
							let content = data[i].message;
							data[i].message = this.smart_substr(content,100) + '...'
						}
					}
				  	this.all                      = data.filter(data => data.development._id === this.name.default_development._id );
				  	this.announcements            = data.filter(data => data.development._id === this.name.default_development._id );
				  	this.announcementsDrafted     = this.announcements.filter(data => data.publish === false && data.valid === true);
				  	this.announcementsPublished   = this.announcements.filter(data => data.publish === true && data.valid === true);
				  	setTimeout(() => this.loading = false, 1000);   

				}, 1000);
			});
	}

	add(){
		this.router.navigate([this.name.default_development.name_url + '/announcement/add']);  
	}

	editAnnouncement(anouncement: Announcement){
		this.router.navigate([this.name.default_development.name_url + '/announcement/edit', anouncement._id]);
	}

}
