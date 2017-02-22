import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment, User, Development } from '../../models/index';
import { PaymentService, DevelopmentService, UserService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { AppComponent } from '../index';


@Component({
  // moduleId: module.id,
  selector: 'edit-payment',
  templateUrl: 'app/templates/edit-payment.html',
})

export class EditPaymentComponent implements OnInit{
	payment: Payment;
    payments: Payment[] = [];
    model: any = {};
    myForm: FormGroup;
    user: User;
    development : Development;
    name: any;

    constructor(private router: Router,
    	private paymentService: PaymentService,
    	private developmentService: DevelopmentService,
    	private userService: UserService,
    	private alertService: AlertService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService,
        private formbuilder: FormBuilder ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit():void{ 
        this.userService.getByToken().subscribe(name => {this.name = name;})
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    createPayment() {
        this.appComponent.loading = true
        this.paymentService.create(this.model)
        .then(
            data => {
                this._notificationsService.success(
                                'Success',
                                'Create payment successful',
                )
                this.router.navigate([this.name.default_development.name_url + '/payment']);
            },
            error => {
                console.log(error);
                this._notificationsService.error(
                                'Error',
                                'The payment could not be save, server Error',
                        )
                this.appComponent.loading = false;
            }
        );
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.payment_proof = files;
    }

    remove(i: any){
        this.model.payment_proof.splice(i, 1)
    }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/payment' ]);
    }
}
