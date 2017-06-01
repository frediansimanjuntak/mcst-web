import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { PaymentReminder, User, Development } from '../../models/index';
import { PaymentReminderService, DevelopmentService, UserService, AlertService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment'

@Component({
  // moduleId: module.id,
  selector: 'edit-payment-reminder',
  templateUrl: '../../templates/edit-payment-reminder.html',
})

export class EditPaymentReminderComponent implements OnInit{
	paymentreminder: PaymentReminder;
    paymentreminders: PaymentReminder[] = [];
    model: any = {};
    myForm: FormGroup;
    user: User;
    development : Development;
    name: any;
    id: any;
    today: Date;
    no: any;
    amount:number[] = [];
    totalAmount:number = 0;
    loading: boolean = true;

    constructor(private router: Router,
    	private paymentreminderService: PaymentReminderService,
    	private developmentService: DevelopmentService,
    	private userService: UserService,
    	private alertService: AlertService,
        
        private route: ActivatedRoute,
        private _notificationsService: NotificationsService,
        private formbuilder: FormBuilder ) {}

    ngOnInit():void{ 
        this.today = new Date();
        console.log(this.today)
    	this.myForm = this.formbuilder.group({
            title : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            auto_issue_on : [this.today, Validators.compose([Validators.required])],
            due_on : [null, Validators.compose([Validators.required])],
            message_to_receiver : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            notification_list: this.formbuilder.array([this.initNotification_list()]),
        });
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            setTimeout(() => this.loading = false, 1000);
        })
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.myForm = this.formbuilder.group({
                _id : [''],
                development : [''],
                title : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                reference_no : [{value: '', disabled: true}], 
                auto_issue_on : ['', Validators.compose([Validators.required])],
                due_on : ['', Validators.compose([Validators.required])],
                message_to_receiver : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
                notification_list: this.formbuilder.array([]),
                publish : [''],
                created_by : [''],
                created_at : [''],
            });
            this.paymentreminderService.getById(this.id)
            .subscribe(paymentreminder => {
                this.paymentreminder = paymentreminder;
                this.paymentreminder.due_on = moment(this.paymentreminder.due_on).format('DD/MM/YYYY');
                for (let i = 0; i < this.paymentreminder.notification_list.length; i++) {
                    this.totalAmount = this.totalAmount + parseInt(this.paymentreminder.notification_list[i].amount)
                    const control = <FormArray>this.myForm.controls['notification_list'];
                    control.push(this.initNotification_list());
                }
                this.paymentreminder.auto_issue_on = moment(this.paymentreminder.auto_issue_on).format('DD/MM/YYYY');
                this.myForm.patchValue(this.paymentreminder);
                setTimeout(() => this.loading = false, 1000);
            });
        }
    }

    initNotification_list() {
        return this.formbuilder.group({
            charge : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            remarks : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            applies_to : ['', Validators.compose([Validators.required])],
            amount : ['', Validators.compose([Validators.required])]
        });
    }

    addNotification_list() {
        const control = <FormArray>this.myForm.controls['notification_list'];
        const notification_listCtrl = this.initNotification_list();
        control.push(notification_listCtrl);
    }

    getValue(value:any){
        console.log(value)
    }

    removeNotification_list(i: number) {
        const control = <FormArray>this.myForm.controls['notification_list'];
        control.removeAt(i);
    }

    number(event: any) {
        const pattern = /[0-9\+\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    createPaymentReminder(model:PaymentReminder) {
    	model.reference_no = this.model.reference_no;
        this.loading = true
        console.log(model)
        this.paymentreminderService.create(model)
        .then(
            data => {
                this._notificationsService.success('Success', 'Create payment successful')
                this.router.navigate([this.name.default_development.name_url + '/payment_reminder']);
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

    updatePaymentReminder(paymentreminder:PaymentReminder){
        this.loading = true
        this.paymentreminderService.update(paymentreminder)
        .then(
            response => {
                this._notificationsService.success('Success', 'Update payment reminder successful')
                this.router.navigate([this.name.default_development.name_url + '/payment_reminder']);
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

    total(amount){
        this.totalAmount = 0
        this.amount.push(amount)
        for (let a = 0; a < this.amount.length; ++a) {
            this.totalAmount = this.totalAmount + +this.amount[a]
        }
    }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/payment_reminder' ]);
    }
}
