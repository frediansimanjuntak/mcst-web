import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PaymentReminder } from '../../models/index';
import { PaymentReminderService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

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
    total: number = 0;
    notification_list: any[];


    constructor(private router: Router, 
        private paymentreminderService: PaymentReminderService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private appComponent: AppComponent,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllPaymentReminder();
        }else{
        	this.paymentreminderService.getById(this.id)
            .subscribe(paymentreminder => {
                this.paymentreminder = paymentreminder;
                let y = this.paymentreminder.auto_issue_on.toString().slice(0,4);
                let m = (this.paymentreminder.auto_issue_on+100).toString().slice(4,6);
                let d = this.paymentreminder.auto_issue_on.toString().slice(6,8);
                this.paymentreminder.auto_issue_on = d + '/' + m + '/' + y ;
                this.paymentreminder.due_on = this.convertDate(this.paymentreminder.due_on);
                this.paymentreminder.created_at = this.convertDate(this.paymentreminder.created_at);
                this.notification_list = paymentreminder.notification_list;
                for (let a = 0; a < this.notification_list.length; ++a) {
                    let total_amount = parseInt(this.notification_list[a].amount)
                    this.total = this.total + total_amount;
                }
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        }
    }

    deletePaymentReminder(paymentreminder: PaymentReminder) {
        this.appComponent.loading = true
        this.paymentreminderService.delete(paymentreminder._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Delete payment reminder successful',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'Payment reminder could not be delete, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }

    deleteConfirmation(paymentreminder) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this payment reminder?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deletePaymentReminder(paymentreminder)
            }
        });
    }

    convertDate(date) {
        var yyyy = date.slice(0,4).toString();
        var mm = date.slice(5,7).toString();
        var dd  = date.slice(8,10).toString();
        return dd + '/' + mm + '/' + yyyy;
    }

	private loadAllPaymentReminder() {
		this.paymentreminderService.getAll()
        .subscribe(paymentreminders => {
            this.published = paymentreminders.filter(data => data.publish === true );
            this.draft   = paymentreminders.filter(data => data.publish === false );
            for (var i = 0; i < this.published.length; ++i) {
                this.published[i].notif_list = 'All'
                let y = this.published[i].auto_issue_on.toString().slice(0,4);
                let m = (this.published[i].auto_issue_on+100).toString().slice(4,6);
                let d = this.published[i].auto_issue_on.toString().slice(6,8);
                this.published[i].auto_issue_on = d + '/' + m + '/' + y ;
                this.published[i].due_on = this.convertDate(this.published[i].due_on);
                this.published[i].created_at = this.convertDate(this.published[i].created_at);
                for (let a = 0; a < this.published[i].notification_list.length; ++a) {
                    if(this.published[i].notification_list[a].applies_to != 'all') {
                        this.published[i].notif_list = 'Custom'
                    }
                }
            }
            for (var i = 0; i < this.draft.length; ++i) {
                this.draft[i].notif_list = 'All'
                let y = this.draft[i].auto_issue_on.toString().slice(0,4);
                let m = (this.draft[i].auto_issue_on+100).toString().slice(4,6);
                let d = this.draft[i].auto_issue_on.toString().slice(6,8);
                this.draft[i].auto_issue_on = d + '/' + m + '/' + y ;
                this.draft[i].due_on = this.convertDate(this.draft[i].due_on);
                this.draft[i].created_at = this.convertDate(this.draft[i].created_at);
                for (let a = 0; a < this.draft[i].notification_list.length; ++a) {
                    if(this.draft[i].notification_list[a].applies_to != 'all') {
                        this.draft[i].notif_list = 'Custom'
                    }
                }
            }
            setTimeout(() => this.appComponent.loading = false, 1000);
        });
    }

    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }

    edit(paymentreminder: PaymentReminder){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/edit', paymentreminder._id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/add']);
    }

    view(paymentreminder: PaymentReminder){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/view', paymentreminder._id]);
    }

    goBack(){
        this.router.navigate([this.name.default_development.name_url + '/payment_system']);
    }

    publish(paymentreminder:PaymentReminder){
        this.appComponent.loading = true
        this.paymentreminderService.publish(paymentreminder._id)
            .then(
                data => {
                            this._notificationsService.success(
                                    'Success',
                                    'Publish payment reminder successful',
                            )
                            this.ngOnInit();
                        },
                        error => {
                            console.log(error);
                            this._notificationsService.error(
                                    'Error',
                                    'Payment reminder could not be publish, server Error',
                            )
                            setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }

    publishConfirmation(paymentreminder) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to publish this paymentreminder?',
            header: 'Publish Confirmation',
            accept: () => {
                this.publish(paymentreminder)
            }
        });
    }
}
