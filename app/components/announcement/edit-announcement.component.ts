import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Announcement, Announcements } from '../../models/index';
import { AnnouncementService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
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
    name: any;
    constructor(private router: Router,
    	private anouncementService: AnnouncementService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService ) {
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

        // this.autoPostOnDateOptions = copy;
        this.validTillDateOptions = copy;
        
        this.model.auto_post_on = ""
        this.model.valid_till = ""
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
                                                this.model.auto_post_on = this.announcement.auto_post_on;
                                                this.model.valid_till = this.announcement.valid_till;
                                            });
                                };
                            })
    }

    createAnnouncement() {
        console.log(this.model)
        this.anouncementService.create(this.model)
        .then(
            data => {
                this.alertService.success('Create announcement successful', true);
                this.router.navigate([this.name.default_development.name_url + '/announcement']);
            },
            error => {
                console.log(error);
                alert(`The announcement could not be save, server Error.`);
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
         this.model.auto_post_on = event.formatted.replace(/-/g, "/");
        if(this.model.auto_post_on){
            (this.selectedValidDate = new Date()).setDate(event.jsdate.getDate() + 1);
            this.selectedValidDate = this.convertDate(this.selectedValidDate)
            let copy: IMyOptions = this.getCopyOfValidTillDateOptions();
            copy.disableUntil = event.date;
            this.validTillDateOptions = copy;
        }
    }


    convertDate(date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');

      return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    validTillDateChanged(event:any) {
      this.model.valid_till = event.formatted.replace(/-/g, "/");;
    }

    updateAnnouncement(){
        this.announcement.auto_post_on  = this.model.auto_post_on;
        this.announcement.valid_till = this.model.valid_till;
        
        this.anouncementService.update(this.announcement)
		.then(
			response => {
				if(response) {
	                this.alertService.error('Update announcement failed');
	            } else {
	                 this.alertService.success('Update announcement successful', true);
                     this.router.navigate([this.name.default_development.name_url + '/announcement']);
	            }
            },
            error=> {
            	this.alertService.error(error);
            }
        );
	}

    toAnnouncement(){
         this.router.navigate([this.name.default_development.name_url + '/announcement']);
    }


}
