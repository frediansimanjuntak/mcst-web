import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { PaymentReminder, User, Development } from '../../models/index';
import { PaymentReminderService, DevelopmentService, UserService, AlertService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';




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
    	this.myForm = this.formbuilder.group({
            title : ['', Validators.required],
            reference_no : [{value: '', disabled: true}],
            auto_issue_on : ['', Validators.required],
            due_on : ['', Validators.required],
            message_to_receiver : ['', Validators.required],
            notification_list: this.formbuilder.array([this.initNotification_list()]),
        });
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
        })
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.paymentreminderService.getAll().subscribe(paymentreminder => {
            this.paymentreminders = paymentreminder ;
            if(this.paymentreminders.length > 0) { 
                var a = this.paymentreminders.length - 1;
                this.no = +this.paymentreminders[a].reference_no + 1
                if(this.no > 1 && this.no < 10) {
                    this.model.reference_no = '000' + this.no.toString();
                }if(this.no > 9 && this.no < 100) {
                    this.model.reference_no = '00' + this.no.toString();
                }if(this.no > 99 && this.no < 1000) { 
                    this.model.reference_no = '0' + this.no.toString();
                }if(this.no > 999) {
                    this.model.reference_no = this.no.toString();
                }
            }else {
                this.model.reference_no = '0001'
            }  
            this.myForm = this.formbuilder.group({
                title : ['', Validators.required],
                reference_no : [{value: this.model.reference_no, disabled: true}],
                auto_issue_on : ['', Validators.required],
                due_on : ['', Validators.required],
                message_to_receiver : ['', Validators.required],
                notification_list: this.formbuilder.array([this.initNotification_list()]),
            });
            setTimeout(() => this.loading = false, 1000);
        });
        if( this.id != null) {
            this.myForm = this.formbuilder.group({
                _id : [''],
                development : [''],
                title : ['', Validators.required],
                reference_no : [''],
                auto_issue_on : ['', Validators.required],
                due_on : ['', Validators.required],
                message_to_receiver : ['', Validators.required],
                notification_list: this.formbuilder.array([]),
                publish : [''],
                created_by : [''],
                created_at : [''],
            });
            this.paymentreminderService.getById(this.id)
            .subscribe(paymentreminder => {
                this.paymentreminder = paymentreminder; 
                this.paymentreminder.due_on = this.paymentreminder.due_on.slice(0,10);
                for (let i = 0; i < this.paymentreminder.notification_list.length; i++) {
                    this.totalAmount = this.totalAmount + parseInt(this.paymentreminder.notification_list[i].amount)
                    const control = <FormArray>this.myForm.controls['notification_list'];
                    control.push(this.initNotification_list());
                }
                let y = this.paymentreminder.auto_issue_on.toString().slice(0,4);
                let m = (this.paymentreminder.auto_issue_on+100).toString().slice(4,6);
                let d = this.paymentreminder.auto_issue_on.toString().slice(6,8);
                this.paymentreminder.auto_issue_on = y + '-' + m + '-' + d ;
                this.myForm.patchValue(this.paymentreminder);
                setTimeout(() => this.loading = false, 1000);
            });
        }
    }

    initNotification_list() {
        return this.formbuilder.group({
            charge : ['', Validators.required],
            remarks : ['', Validators.required],
            applies_to : ['', Validators.required],
            amount : ['', Validators.required]
        });
    }

    addNotification_list() {
        const control = <FormArray>this.myForm.controls['notification_list'];
        const notification_listCtrl = this.initNotification_list();
        control.push(notification_listCtrl);
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
                console.log(error);
                this._notificationsService.error('Error', error.json().message)
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
                this._notificationsService.error('Error', error.json().message)
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
