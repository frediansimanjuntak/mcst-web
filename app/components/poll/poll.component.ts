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
	poll: Poll;
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
                    console.log(this.today);
                    console.log(this.nextDay);
                    console.log(this.pollsActive[0].end_time);
                }, 1000);
        });
	}

	deletePoll(poll) {
        console.log(poll)
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
        this.router.navigate([this.name.default_development.name + '/poll/view', poll._id]);
    }

    editPoll(poll: Poll){
        this.router.navigate([this.name.default_development.name + '/poll/edit', poll._id]);
    }

	goBack(): void {
    	this.location.back();
  	}

    add(){
      this.router.navigate([this.name.default_development.name + '/poll/add']);  
    }

}
