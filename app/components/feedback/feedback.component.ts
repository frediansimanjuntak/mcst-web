import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Feedback } from '../../models/index';
import { FeedbackService, AlertService, UserService, UnitService } from '../../services/index';
import '../../rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    // moduleId: module.id,
    selector: 'feedback',
    templateUrl: 'app/templates/feedback.html',
})

export class FeedbackComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
	feedback: Feedback;
    feedbacks: Feedback[] = [];
    model: any = {};
    units: any;
    images: any[];
    id: string;
    name: any;
    feedback_reply: any;
    archived: any;
    isArchieved = false;
    change = new EventEmitter();
    dataFilter: string = '';
    all: any[] = [];
    statusFilter: any = '';
    public published;
    constructor(private router: Router, 
        private feedbackService: FeedbackService, 
        private alertService: AlertService,
        private unitService: UnitService,
        private route: ActivatedRoute,
        private appComponent: AppComponent,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadAllFeedback();
    }

    deleteFeedback(feedback: Feedback) {
        this.appComponent.loading = true;
        this.feedbackService.delete(feedback._id)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete feedback successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The feedback could not be deleted, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }

    deleteConfirmation(feedback) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this feedback?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteFeedback(feedback)
            }
        });
    }

	private loadAllFeedback() {
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name;
            this.unitService.getAll(this.name.default_development.name_url)
            .subscribe(units => {
                this.units = units.properties;
                this.feedbackService.getAll().subscribe(feedbacks => {
                    this.all           =  feedbacks.filter(feedbacks => feedbacks.archieve === false );
                    this.feedbacks     = feedbacks.filter(feedbacks => feedbacks.archieve === false );
                    this.published     = feedbacks.filter(feedbacks => feedbacks.status === 'published' && feedbacks.archieve === false );
                    for (var i = 0; i < this.feedbacks.length; ++i) {
                        let a = this.units.find(data => data._id == this.feedbacks[i].property);
                        this.feedbacks[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                    }
                    for (var i = 0; i < this.published.length; ++i) {
                        let a = this.units.find(data => data._id == this.published[i].property);
                        this.published[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                    }
                    setTimeout(() => this.appComponent.loading = false, 1000);
                });
            })
        });
    }

    filter(){
        this.appComponent.loading=true;
        if(this.statusFilter != ''){
            this.feedbacks  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1
            );
            this.published     = this.feedbacks.filter(feedbacks => feedbacks.status === 'published' && feedbacks.archieve === false );
            setTimeout(() => this.appComponent.loading = false, 500);
        }else{
            this.feedbacks  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1
            );
            this.published     = this.feedbacks.filter(feedbacks => feedbacks.status === 'published' && feedbacks.archieve === false );
            setTimeout(() => this.appComponent.loading = false, 500);
        }
        
        
  
    }

    filterStatus(event:any){
        this.appComponent.loading = true
        if(this.dataFilter != ''){
            this.feedbacks = this.all.filter(data => data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1 && data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);    
        }else{
            this.feedbacks = this.all.filter(data => data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1);
        }
        setTimeout(() => this.appComponent.loading = false, 500);
    }

    openModal(feedback){
        this.appComponent.loading = true
        this.feedback = feedback;
        this.feedback_reply = feedback.feedback_reply;   
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    replyFeedback(){
        this.appComponent.loading = true
        this.feedbackService.reply(this.feedback)
        .then(
            response => {
                this._notificationsService.success(
                            'Success',
                            'Reply feedback successful',
                    )
                this.router.navigate([this.name.default_development.name_url + '/feddback']);
            },
            error=> {
                this._notificationsService.error(
                            'Error',
                            'Reply feedback failed, server Error',
                )
                setTimeout(() => this.appComponent.loading = false, 1000);
            }
        );
    }

    viewArchived(){
        this.appComponent.loading = true
        this.feedbackService.getAll().subscribe(feedbacks => {
            this.feedbacks = feedbacks ;
            this.archived  = this.feedbacks.filter(feedbacks => feedbacks.archive === true );
            setTimeout(() => this.appComponent.loading = false, 1000);
        });
    }

    viewUnarchived(){
        this.appComponent.loading = true
        this.feedbackService.getAll().subscribe(feedbacks => {
            this.feedbacks     = feedbacks.filter(feedbacks => feedbacks.archive === false );
            this.published     = feedbacks.filter(feedbacks => feedbacks.status === 'published' && feedbacks.archive === false );
            setTimeout(() => this.appComponent.loading = false, 1000);
        });       
        this.archived = '';
    }

    archive(feedback:Feedback){
        this.appComponent.loading = true
        this.feedbackService.archieve(feedback._id)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Archieve feedback successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The feedback could not be archieve, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
        );
    }

    archiveConfirmation(feedback) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to archive this feedback?',
            header: 'Archieve Confirmation',
            accept: () => {
                this.archive(feedback)
            }
        });
    }

    publish(feedback:Feedback){
        this.appComponent.loading = true
        this.feedbackService.publish(feedback._id)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Publish feedback successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The feedback could not be publish, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }

    publishConfirmation(feedback) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to publish this feedback?',
            header: 'Publish Confirmation',
            accept: () => {
                this.publish(feedback)
            }
        });
    }

    unarchive(feedback:Feedback){
        this.appComponent.loading = true
        this.feedbackService.unarchieve(feedback._id)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Unarchieve feedback successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The feedback could not be unarchieve, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }
}
