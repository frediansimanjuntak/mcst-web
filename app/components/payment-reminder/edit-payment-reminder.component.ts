import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { PaymentReminder, User, Development } from '../../models/index';
import { PaymentReminderService, DevelopmentService, UserService, AlertService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { AppComponent } from '../index';


@Component({
  // moduleId: module.id,
  selector: 'edit-payment-reminder',
  templateUrl: 'app/templates/edit-payment-reminder.html',
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

    constructor(private router: Router,
    	private paymentreminderService: PaymentReminderService,
    	private developmentService: DevelopmentService,
    	private userService: UserService,
    	private alertService: AlertService,
        private appComponent: AppComponent,
        private route: ActivatedRoute,
        private _notificationsService: NotificationsService,
        private formbuilder: FormBuilder ) {}

    ngOnInit():void{ 
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.myForm = this.formbuilder.group({
                _id : [''],
                development : [''],
                title : ['', Validators.required],
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
                    const control = <FormArray>this.myForm.controls['notification_list'];
                    control.push(this.initNotification_list());
                }
                this.myForm.patchValue(this.paymentreminder);
                setTimeout(() => this.appComponent.loading = false, 1000);
            });
        }
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name;
            setTimeout(() => this.appComponent.loading = false, 1000);
        })
        this.myForm = this.formbuilder.group({
            title : ['', Validators.required],
            auto_issue_on : ['', Validators.required],
            due_on : ['', Validators.required],
            message_to_receiver : ['', Validators.required],
            notification_list: this.formbuilder.array([this.initNotification_list()]),
        });
    }

    initNotification_list() {
        return this.formbuilder.group({
            charge : [''],
            remarks : [''],
            applies_to : [''],
            amount : ['']
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
        this.appComponent.loading = true
        this.paymentreminderService.create(model)
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
                        setTimeout(() => this.appComponent.loading = false, 1000);
            }
        );
    }

    updatePaymentReminder(paymentreminder:PaymentReminder){
        this.appComponent.loading = true
        this.paymentreminderService.update(paymentreminder)
        .then(
            response => {
                this._notificationsService.success(
                                'Success',
                                'Update payment reminder successful',
                        )
                this.router.navigate([this.name.default_development.name_url + '/payment_system']);
            },
            error => {
                this._notificationsService.error(
                                'Error',
                                'The payment could not be update, server Error',
                        )
                setTimeout(() => this.appComponent.loading = false, 1000);
            }
        );
    }

    
    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/payment_system' ]);
    }
}
