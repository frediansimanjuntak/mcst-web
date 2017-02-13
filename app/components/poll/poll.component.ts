import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/index';
import { PollService, AlertService, UserService} from '../../services/index';
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import * as $ from "jquery";
import '../../rxjs-operators';

@Component({
  // moduleId: module.id,
  selector: 'poll',
  templateUrl: 'app/templates/poll.html',
})

export class PollComponent implements OnInit { 
	@ViewChild('firstModal') firstModal;
    public max: number;
	  poll: any;
    polls: 		Poll[] = [];
    pollsDraft:  Poll[] = [];
    pollsActive: Poll[] = [];
    pollsResult: Poll[] = [];
    pollStart: Poll;
	model: any = {};
    id: string;
    name: any;
    today:Date;
    nextDay: Date;
    constructor(
                private router: Router,
                private pollService: PollService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private userService: UserService
                ) {  
        this.today = new Date();
        this.nextDay = new Date();

      this.nextDay.setDate(this.nextDay.getDate() + 5);
      }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                if( this.id == null) {
                                    this.loadPolls();
                                }else{
                                    this.pollService.getById(this.id)
                                        .subscribe(poll => {
                                            this.poll = poll;
                                            // this.max = this.poll.votes.length;
                                            this.max = 8;
                                            let numOptions =  this.poll.choices.length;
                                            let opts = new Array(numOptions);

                                            for (let i = 0; i < numOptions; i++) {
                                                opts[i] = {
                                                    choice: this.poll.choices[i],
                                                    // progress: this.poll.votes.filter(data => data.answer == this.poll.choices[i] ).length,
                                                    progress: 2,
                                                };
                                            }
                                            this.poll.answers = opts.slice(0);
                                            
                                        });
                                }
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

    private loadPolls(){
    	  this.pollService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.polls 		= data.filter(data => data.development._id == this.name.default_development._id );
                    this.pollsDraft = this.polls.filter(data => data.status == "draft" );
                    this.pollsActive = this.polls.filter(data => data.status == "active" );
                    this.pollsResult= this.polls.filter(data => data.status == "result" );
                }, 1000);
        });
	}

	deletePoll(poll) {
        this.pollService.delete(poll._id)
          .then(
            response => {
              if(response) {
                alert(`The Poll could not be deleted, server Error.`);
              } else {
                alert(`Delete Poll successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Poll could not be deleted, server Error.`);
            }
        );
    }

 	openModal(poll){
 		this.pollStart = poll;
    }

    startPoll(){
        this.pollService.start(this.pollStart._id)
          .then(
            response => {
              if(response) {
                alert(`The Poll failed to start, server Error.`);
              } else {
                alert(`Start Poll successful`);
                this.firstModal.close();
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Poll could not be start, server Error.`);
            }
        );
    }

	viewPoll(poll: Poll){
        this.router.navigate([this.name.default_development.name_url + '/poll/view', poll._id]);
    }

    editPoll(poll: Poll){
        this.router.navigate([this.name.default_development.name_url + '/poll/edit', poll._id]);
    }

	goBack(): void {
    	this.location.back();
  	}

    add(){
      this.router.navigate([this.name.default_development.name_url + '/poll/add']);  
    }

}
