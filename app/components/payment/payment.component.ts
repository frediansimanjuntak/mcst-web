import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Payment } from '../../models/index';
import { PaymentService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    // moduleId: module.id,
    selector: 'payment',
    templateUrl: 'app/templates/payment.html',
})

export class PaymentComponent implements OnInit {
	payment: Payment;
    payments: Payment[] = [];
    model: any = {};
    id: string;
    name: any;

    constructor(private router: Router, 
        private paymentService: PaymentService, 
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
            this.loadAllPayment();
        }else{
        	this.paymentService.getById(this.id)
            .subscribe(payment => {
                this.payment = payment;
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        }
    }

    deletePayment(payment: Payment) {
        this.appComponent.loading = true
        this.paymentService.delete(payment._id)
          .then(
              data => {
                        this._notificationsService.success(
                                'Success',
                                'Delete Payment successful',
                        )
                        this.ngOnInit();
                    },
                    error => {
                        console.log(error);
                        this._notificationsService.error(
                                'Error',
                                'The Payment could not be deleted, server Error',
                        )
                        setTimeout(() => this.appComponent.loading = false, 1000);
                    }
        );
    }

    deleteConfirmation(payment) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this payment?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deletePayment(payment)
            }
        });
    }

	private loadAllPayment() {
		this.paymentService.getAll()
        .subscribe(payments => {
            this.payments = payments;
            setTimeout(() => this.appComponent.loading = false, 1000);
        });
    }

    view(payment: Payment){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/view', payment._id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/add']);
    }
}
