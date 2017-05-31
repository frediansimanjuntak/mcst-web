import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { PaymentReminder } from '../../models/index';
import { PaymentReminderService, AlertService, UserService } from '../../services/index';

import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/primeng';

@Component({
	// moduleId: module.id,
	selector: 'payment-reminder',
	templateUrl: '../../templates/payment-reminder.html',
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
	draftList: string = '';
	publishList: string = '';
	dataFilter: string = '';
	all: any[] = [];
    loading: boolean = true;


	constructor(private router: Router, 
		private paymentreminderService: PaymentReminderService, 
		private alertService: AlertService,
		private route: ActivatedRoute,
		
		private confirmationService: ConfirmationService,
		private _notificationsService: NotificationsService,
		private userService: UserService) {}

	ngOnInit(): void {
		this.userService.getByToken().subscribe(name => {this.name = name.user;})
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		if( this.id == null) {
			this.loadAllPaymentReminder();
		}else{
			this.paymentreminderService.getById(this.id)
			.subscribe(paymentreminder => {
				this.paymentreminder = paymentreminder;
				if (this.paymentreminder) {
					this.paymentreminder.auto_issue_on = moment(this.paymentreminder.auto_issue_on).format('DD/MM/YYYY')
					this.paymentreminder.due_on = moment(this.paymentreminder.due_on).format('DD/MM/YYYY')
					this.paymentreminder.created_at = moment(this.paymentreminder.created_at).format('DD/MM/YYYY')
					this.notification_list = paymentreminder.notification_list;
					for (let a = 0; a < this.notification_list.length; ++a) {
						let total_amount = parseInt(this.notification_list[a].amount)
						this.total = this.total + total_amount;
					}
				}
				setTimeout(() => this.loading = false, 1000);
			});
		}
	}

	deletePaymentReminder(paymentreminder: PaymentReminder) {
		this.loading = true
		this.paymentreminderService.delete(paymentreminder._id)
			.then(
				data => {
					this._notificationsService.success('Success', 'Delete payment reminder successful')
					this.ngOnInit();
				},
				error => {
					if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
					
					setTimeout(() => this.loading = false, 1000);
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

	private loadAllPaymentReminder() {
		this.paymentreminderService.getAll()
		.subscribe(paymentreminders => {
			this.all = paymentreminders;
			this.published = paymentreminders.filter(data => data.publish === true );
			this.draft   = paymentreminders.filter(data => data.publish === false );
			for (var i = 0; i < this.published.length; ++i) {
				this.published[i].notif_list = 'All'
				this.published[i].auto_issue_on = moment(this.published[i].auto_issue_on).format('DD/MM/YYYY');
				this.published[i].due_on = moment(this.published[i].due_on).format('DD/MM/YYYY');
				this.published[i].created_at = moment(this.published[i].created_at).format('DD/MM/YYYY');
				this.publishList = '';
				for (let a = 0; a < this.published[i].notification_list.length; ++a) {
					this.publishList = this.publishList + ' ' + this.published[i].notification_list[a].applies_to
					if(this.publishList.includes('all') === true && this.publishList.includes('resident') === true) {
						this.published[i].notif_list = 'Custom'
					}
					if(this.publishList.includes('all') === false && this.publishList.includes('resident') === true) {
						this.published[i].notif_list = 'Resident with vehicle'
					}
				}
			}
			for (var i = 0; i < this.draft.length; ++i) {
				this.draft[i].notif_list = 'All'
				this.draft[i].auto_issue_on = moment(this.draft[i].auto_issue_on).format('DD/MM/YYYY');
				this.draft[i].due_on = moment(this.draft[i].due_on).format('DD/MM/YYYY');
				this.draft[i].created_at = moment(this.draft[i].created_at).format('DD/MM/YYYY');
				this.draftList = '';
				for (let a = 0; a < this.draft[i].notification_list.length; ++a) {
					this.draftList = this.draftList + ' ' + this.draft[i].notification_list[a].applies_to
					if(this.draftList.includes('all') === true && this.draftList.includes('resident') === true) {
						this.draft[i].notif_list = 'Custom'
					}
					if(this.draftList.includes('all') === false && this.draftList.includes('resident') === true) {
						this.draft[i].notif_list = 'Resident with vehicle'
					}
				}
			}
			setTimeout(() => this.loading = false, 1000);
		});
	}

	filter(){
		this.loading=true;
		this.paymentreminders  = this.all.filter(data => 
				data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1
			);
		this.draft             = this.paymentreminders.filter(data => data.publish === false);
		this.published         = this.paymentreminders.filter(data => data.publish === true);
		for (var i = 0; i < this.published.length; ++i) {
			this.published[i].notif_list = 'All'
			this.published[i].auto_issue_on = moment(this.published[i].auto_issue_on).format('DD/MM/YYYY');
			this.published[i].due_on = moment(this.published[i].due_on).format('DD/MM/YYYY');
			this.published[i].created_at = moment(this.published[i].created_at).format('DD/MM/YYYY');
			if(this.published[i].notification_list.length < 2) {
				this.published[i].notif_list = this.published[i].notification_list[0].applies_to;
			}
			if(this.published[i].notification_list.length > 1) {
				for (let a = 0; a < this.published[i].notification_list.length; ++a) {
					if(this.published[i].notification_list[a].applies_to != 'all') {
						this.published[i].notif_list = 'Custom'
					}
				}
			}
		}
		for (var i = 0; i < this.draft.length; ++i) {
			this.draft[i].notif_list = 'All'
			this.draft[i].auto_issue_on = moment(this.draft[i].auto_issue_on).format('DD/MM/YYYY');
			this.draft[i].due_on = moment(this.draft[i].due_on).format('DD/MM/YYYY');
			this.draft[i].created_at = moment(this.draft[i].created_at).format('DD/MM/YYYY');
			if(this.draft[i].notification_list.length < 1) {
				this.draft[i].notif_list = this.draft[i].notification_list[0].applies_to;
			}
			if(this.draft[i].notification_list.length > 1) {
				for (let a = 0; a < this.draft[i].notification_list.length; ++a) {
					if(this.draft[i].notification_list[a].applies_to != 'all') {
						this.draft[i].notif_list = 'Custom'
					}
				}
			}
		}
		setTimeout(() => this.loading = false, 500);
  
	}


	// edit(incident: Incident){
	//     this.router.navigate(['/incident/edit', incident._id]);
	// }

	edit(paymentreminder: PaymentReminder){
		this.router.navigate([this.name.default_development.name_url + '/payment_reminder/edit', paymentreminder._id]);
	}

	add(){
		this.router.navigate([this.name.default_development.name_url + '/payment_reminder/add']);
	}

	view(paymentreminder: PaymentReminder){
		this.router.navigate([this.name.default_development.name_url + '/payment_reminder/view', paymentreminder._id]);
	}

	goBack(){
		this.router.navigate([this.name.default_development.name_url + '/payment_reminder']);
	}

	publish(paymentreminder:PaymentReminder){
		this.loading = true
		this.paymentreminderService.publish(paymentreminder._id)
			.then(
				data => {
					this._notificationsService.success('Success', 'Publish payment reminder successful')
					this.ngOnInit();
				},
				error => {
					if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
					
					setTimeout(() => this.loading = false, 1000);
				}
			);
	}

	publishConfirmation(paymentreminder) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to publish this payment reminder?',
			header: 'Publish Confirmation',
			accept: () => {
				this.publish(paymentreminder)
			}
		});
	}
}
