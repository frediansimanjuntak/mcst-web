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
					this.feedbacks = feedbacks ;
                    this.published     = this.feedbacks.filter(feedbacks => feedbacks.status === 'published' );
		});
    }

    openModal(feedback){
        this.feedback = feedback;
        this.feedback_reply = feedback.feedback_reply;    
        console.log(this.feedback);
    }

    reply(){
        this.router.navigate([this.name.default_development.name + '/feedback/add']);
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
