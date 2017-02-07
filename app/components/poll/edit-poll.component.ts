import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/index';
import { PollService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';


@Component({
  // moduleId: module.id,
  selector: 'edit-poll',
  templateUrl: `app/templates/edit-poll.html`,
})

export class EditPollComponent  { 
  	@Input('group')
	poll: Poll;
    model: any = {};
    myForm: FormGroup;
    id: string;
    name: any;
    startTimeOptions: any = {};
    endTimeOptions: any = {};

	constructor(private router: Router,
    	private pollService: PollService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService ) {

    }

    ngOnInit() {

    	this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.model.choices  = [];
        this.model.choices[0] = '';

    	this.startTimeOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'Select Commence Date',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };

        this.endTimeOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'Select Result Date',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };

        this.model.end_time = this.model.start_time = this.convertDate(new Date());
    
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

    createPoll() {
    	this.model.status = 'draft';
        if (this.model.poll_type == 'yes_or_no'){
            this.model.choices = ['yes', 'no'];
        }
        this.pollService.create(this.model)
        .then(
            data => {
                this.alertService.success('Create Poll successful', true);
                this.router.navigate([this.name.default_development.name + '/poll']);
            },
            error => {
                console.log(error);
                alert(`The Poll could not be save, server Error.`);
            }
        );
    }

    startTimeDateChanged(event:any) {
   		this.model.start_time = event.formatted;
        if(this.poll){
            this.poll.start_time  = event.formatted;
        }
    }

    endTimeDateChanged(event:any) {
    	this.model.end_time = event.formatted;
        if(this.poll){
            this.poll.end_time  = event.formatted;
        }
    }

    updatePoll(){
        this.pollService.update(this.poll)
		.then(
			response => {
				if(response) {
	                this.alertService.error('Failed Update . server error');
	            } else {
                    this.alertService.success('Update Poll successful', true);
                    this.router.navigate([this.name.default_development.name + '/poll']);
	            }
            },
            error=> {
            	this.alertService.error(error);
            }
        );
	}

    addChoice() {
        this.model.choices.push('choice');
    }

    removeChoice(i: number) {
        this.model.choices.splice(i,1);
    }

    toPoll(){
         this.router.navigate([this.name.default_development.name + '/poll']);
    }
}
