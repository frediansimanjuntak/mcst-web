import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/index';
import { PollService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {IMyOptions} from 'mydatepicker';
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
    selectedEndTime: any;
	constructor(private router: Router,
    	private pollService: PollService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private appComponent: AppComponent, ) {

    }

    ngOnInit() {

    	this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.model.choices  = [];
        this.model.choices[0] = '';

    	let copy: IMyOptions = this.getCopyOfstartTimeOptions();
        let today = new Date();
        let month = today.getUTCMonth() + 1; //months from 1-12
        let day = today.getUTCDate();
        let year = today.getUTCFullYear();
        copy.disableUntil = {
            year: year,
            month: month,
            day: day
        };

        this.startTimeOptions = copy;
        this.endTimeOptions = copy;

        let tomorrow= new Date();
        ( tomorrow = new Date()).setDate(tomorrow.getDate() + 1);

        this.selectedEndTime = this.model.end_time = this.model.start_time = this.convertDate(tomorrow);
        this.model.poll_type = "yes_or_no";
        this.userService.getByToken()
        					.subscribe(name => {
        						this.name = name;
        						if( this.id != null) {
						            this.pollService
						                    .getById(this.id)
						                    .subscribe(poll => {
						                       	this.poll = poll;
											});
						        };
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
         this.model.start_time = event.formatted.replace(/-/g, "/");
        if(this.model.start_time){
            ( this.selectedEndTime = new Date()).setDate(event.jsdate.getDate() + 1);
             this.selectedEndTime = this.convertDate( this.selectedEndTime)
            let copy: IMyOptions = this.getCopyOfendTimeOptions();
            copy.disableUntil = event.date;
            this.endTimeOptions = copy;
        }
        if(this.poll){
            this.poll.start_time  = event.formatted;
        }
    }

    endTimeChanged(event:any) {
      this.model.end_time = event.formatted.replace(/-/g, "/");
      if(this.poll){
            this.poll.end_time  = event.formatted;
        }
    }

    getCopyOfendTimeOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.endTimeOptions));
    }

    getCopyOfstartTimeOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.startTimeOptions));
    }

    createPoll() {
    	this.model.status = 'draft';
        if (this.model.poll_type == 'yes_or_no'){
            this.model.choices = ['yes', 'no'];
        }
        console.log(this.model);
        this.pollService.create(this.model)
        .then(
            data => {
                this.alertService.success('Create Poll successful', true);
                this.router.navigate([this.name.default_development.name_url + '/poll']);
            },
            error => {
                console.log(error);
                alert(`The Poll could not be save, server Error.`);
            }
        );
    }

    updatePoll(){
        this.pollService.update(this.poll)
		.then(
			response => {
				if(response) {
	                this.alertService.error('Failed Update . server error');
	            } else {
                    this.alertService.success('Update Poll successful', true);
                    this.router.navigate([this.name.default_development.name_url + '/poll']);
	            }
            },
            error=> {
            	this.alertService.error(error);
            }
        );
	}

    addChoice() {
        this.model.choices.push('');
    }

    removeChoice(i: number) {
        this.model.choices.splice(i,1);
    }

    toPoll(){
         this.router.navigate([this.name.default_development.name_url + '/poll']);
    }
}
