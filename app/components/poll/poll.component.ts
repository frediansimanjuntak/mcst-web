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
    polls: 		any[] = [];
    pollsDraft:  any[] = [];
    pollsActive: any[] = [];
    pollsResult: any[] = [];
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
                                            this.max = this.poll.votes.length;
                                            
                                            let numOptions =  this.poll.choices.length;
                                            let opts = new Array(numOptions);

                                            for (let i = 0; i < numOptions; i++) {
                                                opts[i] = {
                                                    choice: this.poll.choices[i],
                                                    progress: this.poll.votes.filter(data => data.answer == this.poll.choices[i] ).length,
                                                    
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

                    for (var i = 0; i < this.pollsDraft.length; i++) {
                              if(this.pollsDraft[i].start_time){
                                  let y = this.pollsDraft[i].start_time.toString().slice(0,4);
                                  let m = (this.pollsDraft[i].start_time+100).toString().slice(4,6);
                                  let d = this.pollsDraft[i].start_time.toString().slice(6,8);
                                  this.pollsDraft[i].start_time = y + '/' + m + '/' + d ;
                            }    
                    }

                    for (var i = 0; i < this.pollsDraft.length; i++) {
                              if(this.pollsDraft[i].end_time){
                                  let y = this.pollsDraft[i].end_time.toString().slice(0,4);
                                  let m = (this.pollsDraft[i].end_time+100).toString().slice(4,6);
                                  let d = this.pollsDraft[i].end_time.toString().slice(6,8);
                                  this.pollsDraft[i].end_time = y + '/' + m + '/' + d ;
                              }    
                    }

                    for (var i = 0; i < this.pollsActive.length; i++) {
                              if(this.pollsActive[i].end_time){
                                  let y = this.pollsActive[i].end_time.toString().slice(0,4);
                                  let m = (this.pollsActive[i].end_time+100).toString().slice(4,6);
                                  let d = this.pollsActive[i].end_time.toString().slice(6,8);
                                  this.pollsActive[i].end_time = y + '/' + m + '/' + d ;
                                  let date2 = new Date(m + '/' + d + '/' + y);
                                  let timeDiff = Math.abs(date2.getTime() - this.today.getTime());
                                  this.pollsActive[i].remaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                              }    
                    }

                    for (var i = 0; i < this.pollsResult.length; i++) {
                              if(this.pollsResult[i].start_time){
                                  let y = this.pollsResult[i].start_time.toString().slice(0,4);
                                  let m = (this.pollsResult[i].start_time+100).toString().slice(4,6);
                                  let d = this.pollsResult[i].start_time.toString().slice(6,8);
                                  this.pollsResult[i].start_time = y + '/' + m + '/' + d ;
                              }    
                    }

                    for (var i = 0; i < this.pollsResult.length; i++) {
                              if(this.pollsResult[i].end_time){
                                  let y = this.pollsResult[i].end_time.toString().slice(0,4);
                                  let m = (this.pollsResult[i].end_time+100).toString().slice(4,6);
                                  let d = this.pollsResult[i].end_time.toString().slice(6,8);
                                  this.pollsResult[i].end_time = y + '/' + m + '/' + d ;
                              }    
                    }
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
