import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/index';
import { PollService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
import { NotificationsService } from 'angular2-notifications';


import 'rxjs/add/operator/switchMap';


@Component({
  // moduleId: module.id,
  selector: 'edit-poll',
  templateUrl: `../../templates/edit-poll.html`,
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
	poll: any;
    model: any = {};
    myForm: FormGroup;
    id: string;
    name: any;
    pollChoices: any;
    loading: boolean = true;
    selectedEndTime: any;
    selectedStartTime: any;
	constructor(private router: Router,
    	private pollService: PollService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        
        private _notificationsService: NotificationsService, ) {

    }

    ngOnInit() {

    	this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.pollChoices = [];
        this.model.choices  = [];
        this.pollChoices.push({
            name: ''
        });

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
			this.name = name.user;
			if( this.id != null) {
	            this.pollService
                .getById(this.id)
                .subscribe(poll => {
                   	this.poll = poll;
                    if(this.poll.start_time){
                      this.model.start_time = new Date(this.poll.start_time);
                      this.selectedStartTime = this.convertDate(this.model.start_time);

                    }else if(this.poll.start_time == null){
                      this.selectedStartTime = "";
                      this.model.start_time = null;
                    }     

                    if(this.poll.end_time){
                      this.model.end_time = new Date(this.poll.end_time);
                      this.selectedEndTime = this.convertDate(this.model.end_time);
                    }else if(this.poll.end_time == null){
                      this.selectedEndTime = "";
                      this.model.end_time = null;
                    }   
                    
                    if(this.poll.poll_type == 'multiple'){
                         this.pollChoices = [];
                    }
                    for (var i = 0; i < this.poll.choices.length; i++) {
                         // this.pollChoices[i].name = this.poll.choices[i];
                         this.pollChoices.push({
                             name:  this.poll.choices[i]
                         }) 
                    }

                    setTimeout(() => this.loading = false, 1000);
				});
	        };
            setTimeout(() => this.loading = false, 1000);
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
         this.model.start_time = event.formatted;

        if(this.model.start_time){
            (this.selectedEndTime = new Date()).setDate(event.jsdate.getDate() + 1);
            this.selectedEndTime = this.model.end_time = this.convertDate(this.selectedEndTime)
            let copy: IMyOptions = this.getCopyOfendTimeOptions();
            copy.disableUntil = event.date;
            this.endTimeOptions = copy;
        }
    }

    endTimeChanged(event:any) {
        this.model.end_time =  event.formatted;
    }

    getCopyOfendTimeOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.endTimeOptions));
    }

    getCopyOfstartTimeOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.startTimeOptions));
    }

    createPoll() {
        this.loading = true
    	this.model.status = 'draft';
        if (this.model.poll_type == 'yes_or_no'){
            this.model.choices = ['yes', 'no'];
        }else{
            for (var i = 0; i < this.pollChoices.length; i++) {
                 this.model.choices[i] = this.pollChoices[i].name ;
            }
        }
        this.pollService.create(this.model)
        .then(
            data => {
                this._notificationsService.success('Success', 'Create Poll successful')
                this.router.navigate([this.name.default_development.name_url + '/poll']);
            },
            error => {
                console.log(error);
                this._notificationsService.error('Error', error.json().message)
                this.loading = false
            }
        );
    }

    updatePoll(){
        this.loading = true
        this.poll.start_time = this.model.start_time;
        this.poll.end_time = this.model.end_time;
        if (this.poll.poll_type == 'yes_or_no'){
            this.poll.choices = ['yes', 'no'];
        }else{
            this.poll.choices = [];
            for (var i = 0; i < this.pollChoices.length; i++) {
                 this.poll.choices[i] = this.pollChoices[i].name ;
            }
        }
        this.pollService.update(this.poll)
		.then(
            data => {
                this._notificationsService.success('Success', 'Update Poll successful')
                this.router.navigate([this.name.default_development.name_url + '/poll']);
            },
            error => {
                console.log(error);
                this._notificationsService.error('Error', error.json().message)
                this.loading = false
            }
        );
	}

    addChoice() {

            // this.model.choices.push('');
            this.pollChoices.push({
                name: ''
            });
       
    }

    removeChoice(i: number) {
       
            // this.model.choices.splice(i,1);  
            this.pollChoices.splice(i,1);              
        
    }

    toPoll(){
         this.router.navigate([this.name.default_development.name_url + '/poll']);
    }
}
