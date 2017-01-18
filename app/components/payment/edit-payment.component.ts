import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment, User, Development } from '../../models/index';
import { PaymentService, DevelopmentService, UserService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import '../../rxjs-operators';


@Component({
  // moduleId: module.id,
  selector: 'edit-payment',
  templateUrl: 'app/templates/edit-payment.html',
})

export class EditPaymentComponent{
	payment: Payment;
    payments: Payment[] = [];
    model: any = {};
    myForm: FormGroup;
    user: User;
    development : Development;
    authToken: any;

    constructor(private router: Router,
    	private paymentService: PaymentService,
    	private developmentService: DevelopmentService,
    	private userService: UserService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    createPayment() {
        console.log(this.model);
        this.paymentService.create(this.model)
        .then(
            data => {
                this.alertService.success('Create payment successful', true);
                this.router.navigate(['/booking']);
            },
            error => {
                console.log(error);
                alert(`The payment could not be save, server Error.`);
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
        this.authToken = JSON.parse(localStorage.getItem('authToken'));
        this.router.navigate([this.authToken.development.name + '/payment' ]);
    }
}
