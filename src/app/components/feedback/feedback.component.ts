import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Feedback } from '../../models/index';
import { FeedbackService, AlertService, UserService, UnitService } from '../../services/index';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';
import { ConfirmationService } from 'primeng/primeng';
import { ModalDirective } from 'ng2-bootstrap';
import * as moment from 'moment'

@Component({
    // moduleId: module.id,
    selector: 'feedback',
    templateUrl: '../../templates/feedback.html',
})

export class FeedbackComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
    @ViewChild('viewModal') viewModal;
	feedback: Feedback;
    feedbacks: Feedback[] = [];
    model: any = {};
    units: any;
    images: any[];
    id: string;
    name: any;
    type: string;
    reply: any;
    archived: any;
    isArchieved = false;
    change = new EventEmitter();
    dataFilter: string = '';
    all: any[] = [];
    statusFilter: any = '';
    public published;
    loading: boolean = true;

    constructor(private router: Router, 
        private feedbackService: FeedbackService, 
        private alertService: AlertService,
        private unitService: UnitService,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.loadAllFeedback();
    }

    deleteFeedback(feedback: Feedback) {
        this.loading = true;
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
                    setTimeout(() => this.loading = false, 1000);
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

    convertDate(date) {
		var yyyy = date.slice(0,4).toString();
		var mm = date.slice(5,7).toString();
		var dd  = date.slice(8,10).toString();
		return dd + '/' + mm + '/' + yyyy;
	}

	private loadAllFeedback() {
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.unitService.getAll(this.name.default_development.name_url)
            .subscribe(units => {
                this.units = units.properties;
                this.feedbackService.getAll().subscribe(feedbacks => {
                    console.log(feedbacks)
                    this.all           =  feedbacks.filter(feedbacks => feedbacks.archieve === false );
                    this.feedbacks     = feedbacks.filter(feedbacks => feedbacks.archieve === false );
                    this.published     = feedbacks.filter(feedbacks => feedbacks.status === 'publish' && feedbacks.archieve === false );
                    for (var i = 0; i < this.feedbacks.length; ++i) {
                        let create_at = new Date(this.feedbacks[i].created_at)
                    	this.feedbacks[i].created_at = moment(create_at).format('DD-MM-YYYY');
                        if (this.feedbacks[i].reply_at) {
                            let reply_at = new Date(this.feedbacks[i].reply_at)
                            this.feedbacks[i].reply_at = moment(reply_at).format('DD-MM-YYYY');
                        }
                        let a = this.units.find(data => data._id == this.feedbacks[i].property);
                        this.feedbacks[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                    }
                    setTimeout(() => this.loading = false, 1000);
                });
            })
        });
    }

    filter(){
        this.loading=true;
        if(this.statusFilter != ''){
            this.feedbacks  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1
            );
            setTimeout(() => this.loading = false, 500);
        }else{
            this.feedbacks  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1
            );
            setTimeout(() => this.loading = false, 500);
        }
        if(this.statusFilter == 'publish') {
        	this.feedbacks = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1
            );
            setTimeout(() => this.loading = false, 500);
        }
    }

    filterStatus(event:any){
        this.loading = true
        if(this.dataFilter != ''){
            this.feedbacks = this.all.filter(data => data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1 && data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);    
        }else{
            this.feedbacks = this.all.filter(data => data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1);
        }
        if(this.statusFilter == 'publish' && this.dataFilter == '') {
        	this.feedbacks = this.published
        }
        if(this.statusFilter == 'publish' && this.dataFilter != '') {
        	this.feedbacks = this.published.filter(data => data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);
        }
        setTimeout(() => this.loading = false, 500);
    }

    showModal(type:string, feedback:any){
        this.loading = true;
        this.type = type;
        if (type == 'replyFeedback' ) {
            this.firstModal.open()
        }else{
            this.viewModal.open()
        }
        this.feedback = feedback;
        this.reply = feedback.reply;   
        setTimeout(() => this.loading = false, 1000);
    }

    hideModal(form:any){
        form.reset()
        this.firstModal.close()
    }

    replyFeedback(){
        this.loading = true
        this.feedbackService.reply(this.feedback)
        .then(
            response => {
                this.firstModal.close()
                this._notificationsService.success(
                            'Success',
                            'Reply feedback successful',
                    )
                this.ngOnInit()
            },
            error=> {
                this._notificationsService.error(
                            'Error',
                            'Reply feedback failed, server Error',
                )
                setTimeout(() => this.loading = false, 1000);
            }
        );
    }

    viewArchived(){
        this.loading = true
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.unitService.getAll(this.name.default_development.name_url)
            .subscribe(units => {
                this.units = units.properties;
                this.feedbackService.getAll().subscribe(feedbacks => {
                    this.feedbacks = feedbacks ;
                    for (var i = 0; i < this.feedbacks.length; ++i) {
                        this.feedbacks[i].created_at = this.convertDate(this.feedbacks[i].created_at);
                        let a = this.units.find(data => data._id == this.feedbacks[i].property);
                        this.feedbacks[i].property = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
                    }
                    this.all       = this.feedbacks.filter(feedbacks => feedbacks.archieve === true );
                    this.archived  = this.feedbacks.filter(feedbacks => feedbacks.archieve === true );
                    setTimeout(() => this.loading = false, 1000);
                });
            })
        });
    }

    filterArchieved(){
        this.loading=true;
        if(this.statusFilter != ''){
            this.archived  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1
            );
            setTimeout(() => this.loading = false, 500);
        }else{
            this.archived  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1
            );
            setTimeout(() => this.loading = false, 500);
        }
        if(this.statusFilter == 'publish') {
            this.archived = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                data.status == 'publish'
            );
            setTimeout(() => this.loading = false, 500);
        }
    }

    filterStatusArchieved(event:any){
        this.loading = true
        if(this.dataFilter != ''){
            this.archived = this.all.filter(data => data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1 && data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);    
        }else{
            this.archived = this.all.filter(data => data.status.toLowerCase().indexOf(this.statusFilter.toLowerCase()) !==  -1);
        }
        if(this.statusFilter == 'publish' && this.dataFilter == '') {
            this.archived = this.all.filter(data => data.status == 'publish');
        }
        if(this.statusFilter == 'publish' && this.dataFilter != '') {
            this.archived = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1 &&
                data.status == 'publish'
            );
        }
        setTimeout(() => this.loading = false, 500);
    }

    viewUnarchived(){
        this.loading = true
        // this.feedbackService.getAll().subscribe(feedbacks => {
        //     this.feedbacks     = feedbacks.filter(feedbacks => feedbacks.archive === false );
        //     this.published     = feedbacks.filter(feedbacks => feedbacks.status === 'publish' && feedbacks.archive === false );
        //     setTimeout(() => this.appComponent.loading = false, 1000);
        // });       
        this.archived = '';
        this.ngOnInit()
    }

    archive(feedback:Feedback){
        this.loading = true
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
                    setTimeout(() => this.loading = false, 1000);
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
        this.loading = true
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
                    setTimeout(() => this.loading = false, 1000);
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
        this.loading = true
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
                    setTimeout(() => this.loading = false, 1000);
                }
            );
    }
}
