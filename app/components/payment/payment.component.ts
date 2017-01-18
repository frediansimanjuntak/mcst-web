import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Payment } from '../../models/index';
import { PaymentService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

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
        private userService: UserService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllPayment();
        }else{
        	this.paymentService.getPayment(this.id).then(payment => {this.payment = payment;});
        }
    }

    deletePayment(payment: Payment) {
    	console.log(payment._id)
        this.paymentService.delete(payment._id)
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

	private loadAllPayment() {
		this.paymentService.getPayments().then(payments => this.payments = payments);
    }

    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }

    view(payment: Payment){
        this.userService.getByToken().subscribe(name => this.name = name)
        this.router.navigate([this.name.default_development.name + '/payment/view', payment._id]);
    }

    add(){
        this.userService.getByToken().subscribe(name => this.name = name)
        this.router.navigate([this.name.default_development.name + '/payment/add']);
    }
}
