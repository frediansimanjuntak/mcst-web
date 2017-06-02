import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Payment } from '../../models/index';
import { PaymentService, AlertService, UserService } from '../../services/index';

import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';

import { ConfirmationService } from 'primeng/primeng';

@Component({
    // moduleId: module.id,
    selector: 'payment',
    templateUrl: '../../templates/payment.html',
})

export class PaymentComponent implements OnInit {
	payment: Payment;
    payments: Payment[] = [];
    model: any = {};
    id: string;
    name: any;
    paid: any;
    unpaid: any;
    all: any;
    images: any[] = [] 
    data: Payment;
    dataFilter: string = '';
    loading: boolean = true;

    constructor(private router: Router, 
        private paymentService: PaymentService, 
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
            this.loadAllPayment();
        }else{
        	this.paymentService.getById(this.id)
            .subscribe(payment => {
                this.payment = payment;
                setTimeout(() => this.loading = false, 1000);
            });
        }
    }

    filterRefno(){
        this.loading=true;
        this.payments  = this.all.filter(data => data.serial_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);
        this.paid = this.payments.filter(data => data.status == 'paid');
        this.unpaid = this.payments.filter(data => data.status == 'unpaid');
        setTimeout(() => this.loading = false, 1000);
    }

    deletePayment(payment: Payment) {
        this.loading = true
        this.paymentService.delete(payment._id)
        .then(
            data => {
                this._notificationsService.success('Success','Delete Payment successful')
                this.ngOnInit();
            },
            error => {
                if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                
                setTimeout(() => this.loading = false, 1000);
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
            this.all = payments
            this.paid = payments.filter(data => data.status == 'paid');
            this.unpaid = payments.filter(data => data.status == 'unpaid');
            setTimeout(() => this.loading = false, 1000);
        });
    }

    view(payment: Payment){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/view', payment._id]);
    }

    viewPhoto(payment: Payment){
        this.loading = true
        this.images = []
        this.data = payment
        for (var i = 0; i < this.data.payment_proof.length; ++i) {
            this.images.push({source:this.data.payment_proof[i].url});
        };
        setTimeout(() => { this.loading = false }, 1000);
    }

    viewReference(id:string , type:string){
        if(type == 'booking') {
            this.router.navigate([this.name.default_development.name_url + '/booking/view', id]);
        }
         if(type == 'payment-reminder') {
            this.router.navigate([this.name.default_development.name_url + '/payment_reminder/view', id]);
        }
        
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/add']);
    }

    goBack(){
        this.router.navigate([this.name.default_development.name_url + '/payment_system']);
    }

    edit(payment: Payment){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/edit', payment._id]);
    }
}
