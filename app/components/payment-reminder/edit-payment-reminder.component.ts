import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import { PaymentReminder, User, Development } from '../../models/index';
import { PaymentReminderService, DevelopmentService, UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';


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
        private route: ActivatedRoute,
        private formbuilder: FormBuilder ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit():void{ 
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.myForm = this.formbuilder.group({
            title : ['', Validators.required],
            auto_issue_on : ['', Validators.required],
            due_on : ['', Validators.required],
            message_to_receiver : ['', Validators.required],
            notification_list: this.formbuilder.array([this.initNotification_list()]),
        });
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
            this.paymentreminderService.getPaymentReminder(this.id)
            .then(paymentreminder => {
                this.paymentreminder = paymentreminder; 
                this.paymentreminder.auto_issue_on = this.paymentreminder.auto_issue_on.slice(0,10);
                this.paymentreminder.due_on = this.paymentreminder.due_on.slice(0,10);
                for (let i = 0; i < this.paymentreminder.notification_list.length; i++) {
                    const control = <FormArray>this.myForm.controls['notification_list'];
                    control.push(this.initNotification_list());
                }
                this.myForm.setValue(this.paymentreminder);
                console.log(this.paymentreminder)
            });
        }
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

    createPaymentReminder(paymentreminder:PaymentReminder) {
        console.log(paymentreminder);
        // this.paymentreminderService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create payment successful', true);
        //         this.router.navigate([this.name.default_development.name + '/payment_reminder']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The payment could not be save, server Error.`);
        //     }
        // );
    }

    updatePaymentReminder(paymentreminder:PaymentReminder){
        console.log(paymentreminder);
        // this.paymentreminderService.update(paymentreminder)
        // .then(
        //     response => {
        //         this.alertService.success('Update payment reminder successful', true);
        //         this.router.navigate([this.name.default_development.name + '/payment_reminder']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
    }

    
    cancel(){
        this.router.navigate([this.name.default_development.name + '/payment_system' ]);
    }
}
