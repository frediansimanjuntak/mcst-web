import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Payment, User, Development } from '../../models/index';
import { PaymentService, DevelopmentService, UserService, AlertService, UnitService } from '../../services/index';
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
	id: any;
	units: any;
	unit: any;

	constructor(private router: Router,
		private paymentService: PaymentService,
		private developmentService: DevelopmentService,
		private userService: UserService,
		private unitService: UnitService,
		private alertService: AlertService,
		private appComponent: AppComponent,
		private _notificationsService: NotificationsService,
		private formbuilder: FormBuilder,
		private route: ActivatedRoute, ) {}

	ngOnInit():void{ 
		this.model.payment_proof = []
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		if( this.id != null) {
			this.paymentService.getById(this.id)
			.subscribe(payment => {
				this.payment = payment;
				setTimeout(() => this.appComponent.loading = false, 1000);
			});
		}
		this.userService.getByToken()
		.subscribe(name => {
			this.name = name.user;
			this.unitService.getAll(this.name.default_development.name_url).subscribe(units => {this.units = units.properties})
			setTimeout(() => this.appComponent.loading = false, 1000);
		})
	}

	createPayment() {
		this.appComponent.loading = true
		let formData:FormData = new FormData();
		for (var i = 0; i < this.model.payment_proof.length; i++) {
			formData.append("payment_proof", this.model.payment_proof[i]);
		}
		formData.append("serial_no", this.model.serial_no);
		formData.append("property", this.model.property);
		formData.append("sender", this.model.sender);
		formData.append("remark", this.model.remark);
		formData.append("payment_type", this.model.payment_type);
		formData.append("payment_method", this.model.payment_method);
		this.paymentService.create(formData)
		.then(
			data => {
				this._notificationsService.success(
					'Success',
					'Create payment successful',
				)
				this.router.navigate([this.name.default_development.name_url + '/payment_system']);
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

	updatePayment() {
		if(this.payment.payment_proof.length > 0) {
			this.appComponent.loading = true
			let formData:FormData = new FormData();
			for (var i = 0; i < this.payment.payment_proof.length; i++) {
				formData.append("payment_proof", this.payment.payment_proof[i]);
			}
			formData.append("remark", this.payment.remark);
			formData.append("payment_method", this.payment.payment_method);
			this.paymentService.update(formData , this.payment._id)
			.then(
				data => {
					this._notificationsService.success(
									'Success',
									'Update payment successful',
					)
					this.router.navigate([this.name.default_development.name_url + '/payment_system']);
				},
				error => {
					console.log(error);
					this._notificationsService.error(
									'Error',
									'The payment could not be update, server Error',
							)
					this.appComponent.loading = false;
				}
			);
		}
	}

	onChange(event: any) {
	   let files = [].slice.call(event.target.files);
	   this.model.payment_proof = files;
	}

	updateOnChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.payment.payment_proof = files;
    }

	getLandlord(event:any){
		this.appComponent.loading = true
		this.unitService.getById(this.model.property , this.name.default_development.name_url)
		.subscribe(unit => {
			this.unit = unit.properties[0];
			if(this.unit.landlord.data) {
				this.model.sender = this.unit.landlord.data.resident._id;
				this.model.sender_name = this.unit.landlord.data.resident.username;
			}else{
				this.model.sender = this.unit.tenant.data[0].resident._id;
				this.model.sender_name = this.unit.tenant.data[0].resident.username;
			}
			setTimeout(() => this.appComponent.loading = false, 1000);
		});
	}

	remove(i: any){
		this.model.payment_proof.splice(i, 1)
	}

	cancel(){
		this.router.navigate([this.name.default_development.name_url + '/payment_system' ]);
	}
}
