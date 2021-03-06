import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Payment, User, Development } from '../../models/index';
import { PaymentService, DevelopmentService, UserService, AlertService, UnitService } from '../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';




@Component({
  // moduleId: module.id,
  selector: 'edit-payment',
  templateUrl: '../../templates/edit-payment.html',
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
	unit_no: string;
    loading: boolean = true;

	constructor(private router: Router,
		private paymentService: PaymentService,
		private developmentService: DevelopmentService,
		private userService: UserService,
		private unitService: UnitService,
		private alertService: AlertService,
		
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
				this.unitService.getById(this.payment.property, this.payment.development.name_url)
				.subscribe(units => {
					this.model.unit_no = '#' + units.properties[0].address.unit_no + '-' + units.properties[0].address.unit_no_2;
				})
				setTimeout(() => this.loading = false, 1000);
			});
		}
		this.userService.getByToken()
		.subscribe(name => {
			this.name = name.user;
			this.unitService.getAll(this.name.default_development.name_url)
			.subscribe(units => {
				this.units = units.properties;
				this.units = this.units.filter(data => data.landlord.data && 
					data.landlord.data.resident ? data.landlord.data.resident : false &&  
					data.landlord.data.resident != null && 
					data.tenant.data && 
					data.tenant.data.length > 0 )
			})
			setTimeout(() => this.loading = false, 1000);
		})
	}

	createPayment() {
		this.loading = true
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
				this._notificationsService.success('Success', 'Create payment successful')
				this.router.navigate([this.name.default_development.name_url + '/payment_system']);
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
				
				this.loading = false;
			}
		);
	}

	updatePayment() {
		if(this.payment.payment_proof.length > 0) {
			this.loading = true
			let formData:FormData = new FormData();
			for (var i = 0; i < this.payment.payment_proof.length; i++) {
				formData.append("payment_proof", this.payment.payment_proof[i]);
			}
			formData.append("remark", this.payment.remark);
			formData.append("payment_method", this.payment.payment_method);
			this.paymentService.update(formData , this.payment._id)
			.then(
				data => {
					this._notificationsService.success('Success', 'Update payment successful')
					this.router.navigate([this.name.default_development.name_url + '/payment_system']);
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
					
					this.loading = false;
				}
			);
		}
	}

	onChange(event: any) {
	   let files = [].slice.call(event.target.files);
	   for (let z = 0; z < files.length; ++z) {
		   	if (!files[z].type.includes("image")) {
		   		this._notificationsService.error('Error', 'Please upload image only!.')
			  	this.model.payment_proof = [];
			  	break;
		   	}else{
				this.model.payment_proof = files;
		   	}
	   	}
	}

	updateOnChange(event: any) {
       let files = [].slice.call(event.target.files);
       for (let z = 0; z < files.length; ++z) {
		   	if (!files[z].type.includes("image")) {
		   		this._notificationsService.error('Error', 'Please upload image only!.')
			  	this.payment.payment_proof = [];
			  	break;
		   	}else{
				this.payment.payment_proof = files;
		   	}
	   	}
    }

	getLandlord(event:any){
		this.loading = true
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
			setTimeout(() => this.loading = false, 1000);
		});
	}

	remove(i: any){
		this.model.payment_proof.splice(i, 1)
	}

	cancel(){
		this.router.navigate([this.name.default_development.name_url + '/payment_system' ]);
	}
}
