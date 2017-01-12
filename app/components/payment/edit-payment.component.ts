import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment, User, Development } from '../../models/index';
import { PaymentService, DevelopmentService, UserService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import '../../rxjs-operators';


@Component({
  // moduleId: module.id,
  selector: 'edit-payment',
  template: ``,
})

export class EditPaymentComponent implements OnInit {
	payment: Payment;
    payments: Payment[] = [];
    model: any = {};
    myForm: FormGroup;
    user: User;
    development : Development;

    constructor(private router: Router,
    	private paymentService: PaymentService,
    	private developmentService: DevelopmentService,
    	private userService: UserService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {

    }

    createPayment() {
        console.log(this.model);
        this.paymentService.create(this.model)
        .subscribe(
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
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }
}
