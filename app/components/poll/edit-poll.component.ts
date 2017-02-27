import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/index';
import { PollService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
import { NotificationsService } from 'angular2-notifications';
import { AppComponent } from '../index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';


@Component({
  // moduleId: module.id,
  selector: 'edit-poll',
  templateUrl: `app/templates/edit-poll.html`,
})

export class EditPollComponent  { 
      private startTimeOptions: IMyOptions = {
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

    private endTimeOptions: IMyOptions = {
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
	poll: Poll;
    model: any = {};
    myForm: FormGroup;
    id: string;
    name: any;
    pollChoices: any;
    selectedEndTime: any;
    selectedStartTime: any;
	constructor(private router: Router,
    	private pollService: PollService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService, ) {

    }

    ngOnInit() {

    	this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.pollChoices = [];
        this.model.choices  = [];
        this.pollChoices.push('');
        this.model.choices.push('');

    	let copy: IMyOptions = this.getCopyOfstartTimeOptions();
        let copy1: IMyOptions = this.getCopyOfendTimeOptions();
        let today = new Date();
        let yesterday: any;
        let tomorrow: any;
        ( yesterday = new Date()).setDate(today.getDate() - 1);
        ( tomorrow = new Date()).setDate(today.getDate() + 1);

        let month = yesterday.getUTCMonth() + 1; //months from 1-12
        let day = yesterday.getUTCDate();
        let year = yesterday.getUTCFullYear();
        copy.disableUntil = {
            year: year,
            month: month,
            day: day
        };

        let month1 = today.getUTCMonth() + 1; //months from 1-12
        let day1 = today.getUTCDate();
        let year1 = today.getUTCFullYear();
        copy1.disableUntil = {
            year: year1,
            month: month1,
            day: day1
        };

        this.startTimeOptions = copy;
        this.endTimeOptions = copy1;

        this.selectedStartTime = this.model.start_time = this.convertDate(today);
        this.selectedEndTime = this.model.end_time = this.convertDate(tomorrow);

        this.model.poll_type = "yes_or_no";
        this.userService.getByToken()
        					.subscribe(name => {
        						this.name = name;
        						if( this.id != null) {
						            this.pollService
						                    .getById(this.id)
						                    .subscribe(poll => {
						                       	this.poll = poll;

                                                if(this.poll.start_time){
                                                  let y = this.poll.start_time.toString().slice(0,4);
                                                  let m = (this.poll.start_time+100).toString().slice(4,6);
                                                  let d = this.poll.start_time.toString().slice(6,8);
                                                  this.selectedStartTime = y + '-' + m + '-' + d ;
                                                  this.model.start_time = new Date(m + '/' + d + '/' + y);

                                                }else if(this.poll.start_time == null){
                                                  this.selectedStartTime = "";
                                                  this.model.start_time = null;
                                                }     

                                                if(this.poll.end_time){
                                                  let y = this.poll.end_time.toString().slice(0,4);
                                                  let m = (this.poll.end_time+100).toString().slice(4,6);
                                                  let d = this.poll.end_time.toString().slice(6,8);
                                                  this.selectedEndTime = y + '-' + m + '-' + d ;
                                                  this.model.end_time = new Date(m + '/' + d + '/' + y);
                                                }else if(this.poll.end_time == null){
                                                  this.selectedEndTime = "";
                                                  this.model.end_time = null;
                                                }        
                                                setTimeout(() => this.appComponent.loading = false, 1000);
											});
						        };
                                setTimeout(() => this.appComponent.loading = false, 1000);
        					})
        
    }


    convertDate(date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');

      return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    startTimeChanged(event:any) {
         this.model.start_time = event.jsdate;

        if(this.model.start_time){
            (this.selectedEndTime = new Date()).setDate(event.jsdate.getDate() + 1);
            this.model.end_time =  this.selectedEndTime;
            this.selectedEndTime = this.convertDate(this.selectedEndTime)
            let copy: IMyOptions = this.getCopyOfendTimeOptions();
            copy.disableUntil = event.date;
            this.endTimeOptions = copy;
        }
    }

    endTimeChanged(event:any) {
      this.model.end_time =  event.jsdate;
    }

    getCopyOfendTimeOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.endTimeOptions));
    }

    getCopyOfstartTimeOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.startTimeOptions));
    }

    createPoll() {
        this.appComponent.loading = true
    	this.model.status = 'draft';
        if (this.model.poll_type == 'yes_or_no'){
            this.model.choices = ['yes', 'no'];
        }
        this.pollService.create(this.model)
        .then(
            data => {
                 this._notificationsService.success(
                            'Success',
                            'Create Poll successful',
                )
                this.router.navigate([this.name.default_development.name_url + '/poll']);
            },
            error => {
                console.log(error);
                this._notificationsService.error(
                            'Error',
                            'The Poll could not be save, server Error',
                    )
                this.appComponent.loading = false
            }
        );
    }

    updatePoll(){
        this.appComponent.loading = true
        this.poll.start_time = this.model.start_time;
        this.poll.end_time = this.model.end_time;
        this.pollService.update(this.poll)
		.then(
            data => {
                 this._notificationsService.success(
                            'Success',
                            'Update Poll successful',
                )
                this.router.navigate([this.name.default_development.name_url + '/poll']);
            },
            error => {
                console.log(error);
                this._notificationsService.error(
                            'Error',
                            'Failed Update . server error',
                    )
                this.appComponent.loading = false
            }
        );
	}

    addChoice() {
        if(this.poll){
            this.poll.choices.push('');
        }else{
            // this.model.choices.push('');
            this.pollChoices.push('');
        }
    }

    removeChoice(i: number) {
        if(this.poll){
            this.poll.choices.splice(i,1);
        }else{
            // this.model.choices.splice(i,1);  
            this.pollChoices.splice(i,1);              
        }
    }

    toPoll(){
         this.router.navigate([this.name.default_development.name_url + '/poll']);
    }
}
