import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PaymentReminder } from '../../models/index';
import { PaymentReminderService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

@Component({
    // moduleId: module.id,
    selector: 'payment-reminder',
    templateUrl: 'app/templates/payment-reminder.html',
})

export class PaymentReminderComponent implements OnInit {
	paymentreminder: PaymentReminder;
    paymentreminders: PaymentReminder[] = [];
    model: any = {};
    id: string;
    name: any;
    draft: any;
    published: any;

    constructor(private router: Router, 
        private paymentreminderService: PaymentReminderService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllPaymentReminder();
        }else{
        	this.paymentreminderService.getPaymentReminder(this.id).then(paymentreminder => {this.paymentreminder = paymentreminder;});
        }
    }

    deletePaymentReminder(paymentreminder: PaymentReminder) {
        this.paymentreminderService.delete(paymentreminder._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Newsletter could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create user successful', true);
                alert(`Delete Newsletter successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Newsletter could not be deleted, server Error.`);
            }
        );
    }

	private loadAllPaymentReminder() {
		this.paymentreminderService.getPaymentReminders()
        .then(paymentreminders => {
            this.published = paymentreminders.filter(data => data.publish === true );
            this.draft   = paymentreminders.filter(data => data.publish === false );
            for (var i = 0; i < this.published.length; ++i) {
                this.published[i].auto_issue_on = this.published[i].auto_issue_on.slice(0,10);
                this.published[i].due_on = this.published[i].due_on.slice(0,10);
                this.published[i].created_at = this.published[i].created_at.slice(0,10);
            }
            for (var i = 0; i < this.draft.length; ++i) {
                this.draft[i].auto_issue_on = this.draft[i].auto_issue_on.slice(0,10);
                this.draft[i].due_on = this.draft[i].due_on.slice(0,10);
                this.draft[i].created_at = this.draft[i].created_at.slice(0,10);
            }
        });
    }

    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }

    edit(paymentreminder: PaymentReminder){
        this.router.navigate([this.name.default_development.name + '/payment_system/edit', paymentreminder._id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/payment_system/add']);
    }

    publish(paymentreminder:PaymentReminder){
        this.paymentreminderService.publish(paymentreminder._id);
        this.ngOnInit()
    }
}
