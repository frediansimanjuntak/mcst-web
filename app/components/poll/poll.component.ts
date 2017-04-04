import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Poll } from '../../models/index';
import { PollService, AlertService, UserService} from '../../services/index';
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { AppComponent } from '../index';
import * as $ from "jquery";
import '../../rxjs-operators';
import { ConfirmationService } from 'primeng/primeng';

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
    pollsPast: any[] = [];
    pollStart: Poll;
	  model: any = {};
    id: string;
    name: any;
    today:Date;
    todayNumber: number;
    nextDay: Date;
    constructor(
                private router: Router,
                private pollService: PollService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private userService: UserService,
                private appComponent: AppComponent,
                private confirmationService: ConfirmationService,
                private _notificationsService: NotificationsService,
                ) {  
        this.today = new Date();
      }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        var yyyy:any = this.today.getFullYear();
        var mm:any = (this.today.getMonth());
        var dd:any  = this.today.getDate();
        
        if(dd<10)   
        {  
            dd='0'+dd;  
        }   
          
        if(mm<10)   
        {  
            mm='0'+mm;  
        }  
        this.todayNumber = +yyyy+mm+dd;
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
                                            
                                            let y = this.poll.start_time.toString().slice(0,4);
                                            let m = (this.poll.start_time+100).toString().slice(4,6);
                                            let d = this.poll.start_time.toString().slice(6,8);
                                            this.poll.start_time = y + '/' + m + '/' + d ;

                                            y = this.poll.end_time.toString().slice(0,4);
                                            m = (this.poll.end_time+100).toString().slice(4,6);
                                            d = this.poll.end_time.toString().slice(6,8);
                                            this.poll.end_time = y + '/' + m + '/' + d ;


                                            let numOptions =  this.poll.choices.length;
                                            let opts = new Array(numOptions);

                                            for (let i = 0; i < numOptions; i++) {
                                                opts[i] = {
                                                    choice: this.poll.choices[i],
                                                    progress: this.poll.votes.filter(data => data.answer == this.poll.choices[i] ).length,
                                                    
                                                };
                                            }
                                            this.poll.answers = opts.slice(0);
                                            setTimeout(() => this.appComponent.loading = false, 1000);
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
                    console.log(data);
                    this.polls 		   = data.filter(data => data.development._id == this.name.default_development._id );
                    this.pollsDraft  = this.polls.filter(data => data.status == "draft" );
                    this.pollsActive = this.polls.filter(data => data.status == "active" );
                    this.pollsResult = this.polls.filter(data => data.status == "end poll" && data.end_time == this.todayNumber);
                    this.pollsPast   = this.polls.filter(data => data.status == "end poll" && data.end_time < this.todayNumber);

                    // for (var i = 0; i < this.pollsDraft.length; i++) {
                    //           if(this.pollsDraft[i].start_time){
                    //               let y = this.pollsDraft[i].start_time.toString().slice(0,4);
                    //               let m = (this.pollsDraft[i].start_time+100).toString().slice(4,6);
                    //               let d = this.pollsDraft[i].start_time.toString().slice(6,8);
                    //               this.pollsDraft[i].start_time = y + '/' + m + '/' + d ;
                    //         }    
                    // }

                    // for (var i = 0; i < this.pollsDraft.length; i++) {
                    //           if(this.pollsDraft[i].end_time){
                    //               let y = this.pollsDraft[i].end_time.toString().slice(0,4);
                    //               let m = (this.pollsDraft[i].end_time+100).toString().slice(4,6);
                    //               let d = this.pollsDraft[i].end_time.toString().slice(6,8);
                    //               this.pollsDraft[i].end_time = y + '/' + m + '/' + d ;
                    //           }    
                    // }

                    for (var i = 0; i < this.pollsDraft.length; i++) {
                              if(this.pollsDraft[i].end_time){
                                  let y = this.pollsDraft[i].end_time.slice(0,4);
                                  let m = (this.pollsDraft[i].end_time+100).slice(5,7);
                                  let d = this.pollsDraft[i].end_time.slice(8,10);
                                  let date2 = new Date(m + '-' + d + '-' + y);
                                  let timeDiff = Math.abs(date2.getTime() - this.today.getTime());
                                  this.pollsDraft[i].remaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                              }    
                    }

                    // for (var i = 0; i < this.pollsResult.length; i++) {
                    //           if(this.pollsResult[i].start_time){
                    //               let y = this.pollsResult[i].start_time.toString().slice(0,4);
                    //               let m = (this.pollsResult[i].start_time+100).toString().slice(4,6);
                    //               let d = this.pollsResult[i].start_time.toString().slice(6,8);
                    //               this.pollsResult[i].start_time = y + '/' + m + '/' + d ;
                    //           }    
                    // }

                    // for (var i = 0; i < this.pollsResult.length; i++) {
                    //           if(this.pollsResult[i].end_time){
                    //               let y = this.pollsResult[i].end_time.toString().slice(0,4);
                    //               let m = (this.pollsResult[i].end_time+100).toString().slice(4,6);
                    //               let d = this.pollsResult[i].end_time.toString().slice(6,8);
                    //               this.pollsResult[i].end_time = y + '/' + m + '/' + d ;
                    //           }    
                    // }
                    setTimeout(() => this.appComponent.loading = false, 1000);
        });
	}

	deletePoll(poll) {
        this.appComponent.loading = true
        this.pollService.delete(poll._id)
          .then(
             data => {
                this._notificationsService.success(
                            'Success',
                            'Delete poll successful',
                )
                this.ngOnInit();
            },
            error => {
                console.log(error);
                this._notificationsService.error(
                            'Error',
                            'Failed delete poll, server error',
                    )
                this.appComponent.loading = false
            }
          );
    }

    deleteConfirmation(poll) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this poll?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deletePoll(poll)
            }
        });
    }

 	openModal(poll){
 		this.pollStart = poll;
    }

    startPoll(){
        this.appComponent.loading = true
        this.pollService.start(this.pollStart._id)
          .then(
             data => {
                this._notificationsService.success(
                            'Success',
                            'Start poll successful',
                )
                this.firstModal.close();
                this.ngOnInit()
            },
            error => {
                console.log(error);
                this._notificationsService.error(
                            'Error',
                            '`The Poll could not be start, server Error',
                    )
                this.appComponent.loading = false
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
