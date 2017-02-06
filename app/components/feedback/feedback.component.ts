import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Feedback } from '../../models/index';
import { FeedbackService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

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
    images: any[];
    id: string;
    name: any;
    feedback_reply: any;
    archived: any;
    isArchieved = false;
    change = new EventEmitter();
    public published;
    constructor(private router: Router, 
        private feedbackService: FeedbackService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadAllFeedback();
    }

    deleteFeedback(feedback: Feedback) {
    	console.log(feedback._id)
        this.feedbackService.delete(feedback._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The feedback could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create user successful', true);
                alert(`Delete feedback successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The feedback could not be deleted, server Error.`);
            }
        );
    }

	private loadAllFeedback() {
		this.feedbackService.getFeedbacks().then(feedbacks => {
			this.feedbacks     = feedbacks.filter(feedbacks => feedbacks.archive === false );
            this.published     = feedbacks.filter(feedbacks => feedbacks.status === 'published' && feedbacks.archive === false );
		});
    }

    openModal(feedback){
        this.feedback = feedback;
        this.feedback_reply = feedback.feedback_reply;    
        console.log(this.feedback);
    }

    replyFeedback(){
        console.log(this.feedback)
        // this.feedbackService.reply(this.feedback)
        // .then(
        //     response => {
        //         this.alertService.success('Update User successful', true);
        //         this.router.navigate([this.name.default_development.name + '/user']);
        //     },
        //     error=> {
        //         this.alertService.error(error);
        //     }
        // );
    }

    viewArchived(){
        this.feedbackService.getFeedbacks().then(feedbacks => {
            this.feedbacks = feedbacks ;
            this.archived  = this.feedbacks.filter(feedbacks => feedbacks.archive === true );
        });
    }

    viewUnarchived(){
        this.feedbackService.getFeedbacks().then(feedbacks => {
            this.feedbacks     = feedbacks.filter(feedbacks => feedbacks.archive === false );
            this.published     = feedbacks.filter(feedbacks => feedbacks.status === 'published' && feedbacks.archive === false );
        });       
        this.archived = '';
    }

    archive(feedback:Feedback){
        this.feedbackService.archieve(feedback._id);
        this.ngOnInit()
    }

    publish(feedback:Feedback){
        this.feedbackService.publish(feedback._id);
        this.ngOnInit()
    }

    unarchive(feedback:Feedback){
        this.feedbackService.unarchieve(feedback._id);
        this.ngOnInit()
    }
}
