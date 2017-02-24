import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Announcement, Announcements } from '../../models/index';
import { AnnouncementService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
import { NotificationsService } from 'angular2-notifications';
import { AppComponent } from '../index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-announcement',
  templateUrl: 'app/templates/edit-announcement.html'
})

export class EditAnnouncementComponent  {

    private autoPostOnDateOptions: IMyOptions = {
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

    @Input('group')
	announcement: Announcement;
    model: any = {};
    myForm: FormGroup;
    id: string;
    selectedValidDate: any;
    selectedAutoPostOn: any;
    name: any;
    constructor(private router: Router,
    	private anouncementService: AnnouncementService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService, ) {
    }
    private autoPostOnDateTxt: string = 'No auto post (default)';
    private validTillDateTxt: string = 'Forever (default)';

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        let copy: IMyOptions = this.getCopyOfAutoPostDateOptions();
        let today = new Date();
        let month = today.getUTCMonth() + 1; //months from 1-12
        let day = today.getUTCDate();
        let year = today.getUTCFullYear();
        copy.disableUntil = {
            year: year,
            month: month,
            day: day
        };

        this.autoPostOnDateOptions = copy;
        this.validTillDateOptions = copy;
        
        this.model.auto_post_on = null;
        this.model.valid_till = null;
        this.model.publish = false;
        this.model.sticky = 'no';
        
        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                if( this.id != null) {
                                    this.anouncementService
                                            .getById(this.id)
                                            .subscribe(announcement => {
                                                this.announcement = announcement;

                                                if(this.announcement.auto_post_on){
                                                  let y = this.announcement.auto_post_on.toString().slice(0,4);
                                                  let m = (this.announcement.auto_post_on+100).toString().slice(4,6);
                                                  let d = this.announcement.auto_post_on.toString().slice(6,8);
                                                  this.selectedAutoPostOn = y + '-' + m + '-' + d ;
                                                  this.model.auto_post_on = new Date(m + '/' + d + '/' + y);

                                                }else if(this.announcement.auto_post_on == ""){
                                                  this.selectedAutoPostOn = "";
                                                  this.model.auto_post_on = "";
                                                }     

                                                if(this.announcement.valid_till){
                                                  let y = this.announcement.valid_till.toString().slice(0,4);
                                                  let m = (this.announcement.valid_till+100).toString().slice(4,6);
                                                  let d = this.announcement.valid_till.toString().slice(6,8);
                                                  this.selectedValidDate = y + '-' + m + '-' + d ;
                                                  this.model.valid_till = new Date(m + '/' + d + '/' + y);
                                                }else if(this.announcement.valid_till == ""){
                                                  this.selectedValidDate = "";
                                                  this.model.valid_till = "";
                                                }           
                                                setTimeout(() => this.appComponent.loading = false, 1000);
                                            });
                                };
                                setTimeout(() => this.appComponent.loading = false, 1000);
                            })
    }

    createAnnouncement() {
        this.appComponent.loading = true
        console.log(this.model)
        this.anouncementService.create(this.model)
        .then(
            data => {
                this._notificationsService.success(
                            'Success',
                            'Create announcement successful',
                )
                this.router.navigate([this.name.default_development.name_url + '/announcement']);
            },
            error => {
                console.log(error);
                this._notificationsService.error(
                            'Error',
                            'The announcement could not be save, server error',
                    )
                this.appComponent.loading = false
            }
        );
    }

    updateAnnouncement(){
        this.appComponent.loading = true
        this.announcement.auto_post_on  = this.model.auto_post_on;
        this.announcement.valid_till = this.model.valid_till;
        console.log(this.announcement)
        this.anouncementService.update(this.announcement)
        .then(
            response => {
                if(response) {
                    this._notificationsService.error(
                            'Error',
                            'Update announcement failed, server error',
                    )
                    this.appComponent.loading = false
                } else {
                     this._notificationsService.success(
                            'Success',
                            'Update announcement successful',
                     )
                     this.router.navigate([this.name.default_development.name_url + '/announcement']);
                }
            },
            error=> {
                this._notificationsService.error(
                            'Error',
                            'Update announcement failed, server error',
                )
                    this.appComponent.loading = false
            }
        );
    }

    getCopyOfValidTillDateOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.validTillDateOptions));
    }

    getCopyOfAutoPostDateOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.autoPostOnDateOptions));
    }

    autoPostOnDateChanged(event:any) {
         this.model.auto_post_on = event.jsdate;

        if(this.model.auto_post_on){
            (this.selectedValidDate = new Date()).setDate(event.jsdate.getDate() + 1);
            this.model.valid_till =  this.selectedValidDate;
            this.selectedValidDate = this.convertDate(this.selectedValidDate)
            let copy: IMyOptions = this.getCopyOfValidTillDateOptions();
            copy.disableUntil = event.date;
            this.validTillDateOptions = copy;
        }
    }

    validTillDateChanged(event:any) {
      this.model.valid_till =  event.jsdate;
    }

    convertDate(date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');

      return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    toAnnouncement(){
         this.router.navigate([this.name.default_development.name_url + '/announcement']);
    }


}
