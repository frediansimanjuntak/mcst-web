import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Visit, Visits } from '../../models/index';
import { VisitService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  // moduleId: module.id,
  selector: 'visit',
  templateUrl: 'app/templates/visit.html',
})

export class VisitComponent implements OnInit {
    @ViewChild('checkInModal') checkInModal;
    @ViewChild('checkOutModal') checkOutModal;
    @ViewChild('firstModal') firstModal;
	visit: Visit;
    visitOut: Visit;
    visits: Visit[] = [];
    visitActive: any[] = [];
    visitDateCreateOptions: any = {};
    DateOptions: any = {};
    model: any = {};
    id: string;
    visitDateCreate: any;
    myForm: FormGroup;
    checkInForm: FormGroup;
    checkOutForm: FormGroup;
    public developmentId;
    public data;
    public activeDate: any;
    public activeDateFull: any;
    public addSubmitted: boolean;
    public checkInSsubmitted: boolean;
    public checkOutSsubmitted: boolean;
    name: any;

    constructor(
                private router: Router,
                private visitService: VisitService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private formbuilder: FormBuilder,
                 private userService: UserService
                ) {
        this.visitDateCreate = new Date();
        this.activeDate = this.activeDateFull = new Date();
    }

    ngOnInit(): void {
    	this.addSubmitted = false;
    	this.checkInSsubmitted = false;
        this.checkOutSsubmitted = false;
		this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadVisits();
                            })

        if(typeof this.visitDateCreate !== "string"){
            this.visitDateCreate = this.convertDate(this.visitDateCreate);
        }

		if(typeof this.activeDate !== "string"){
		this.activeDate = this.convertDate(this.activeDate);
		}

       	this.myForm = this.formbuilder.group({
			 	property: ['', <any>Validators.required],
                visitor: this.formbuilder.group({
                    full_name : ['',  <any>Validators.required],
                    vehicle : [''],
                    pass : [''],
                }),
                purpose: ['house_visit'],
                remarks : [''],
                check_in: [false,<any>Validators.required],
        });

        this.visitDateCreateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            editableDateField: false,
            height: '34px',
            width: '260px',
            inline: false,
            showClearDateBtn: false,
            // disableUntil: {year: 2017, month: 1, day: 10},
            customPlaceholderTxt: 'Today (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };

        this.DateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            editableDateField: false,
            showInputField: false,
            showClearDateBtn: false,
            // customPlaceholderTxt: 'No auto post (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };



    }

    convertDate(date) {
	  var yyyy = date.getFullYear().toString();
	  var mm = (date.getMonth()+1).toString();
	  var dd  = date.getDate().toString();

	  var mmChars = mm.split('');
	  var ddChars = dd.split('');

	  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
	}

    preCheckIn(visit){
    	this.visit = visit;
   		this.checkInForm = this.formbuilder.group({
			 	property: [{value: visit.property, disabled: true}],
                visitor: this.formbuilder.group({
                    full_name : [{value: visit.visitor.full_name, disabled: true}],
                    vehicle : [{ value: visit.visitor.vehicle, disabled: true}],
                    pass : [visit.visitor.pass, <any>Validators.required],
                }),
                purpose: [{ value: visit.purpose, disabled: true}],
                remarks : [{ value: visit.remarks, disabled: true}],
                check_in: [''],
        });
         // this.myForm.setValue(this.user);
    }

    preCheckOut(visit){
        this.visitOut = visit;
           this.checkOutForm = this.formbuilder.group({
                 property: [{value: visit.property, disabled: true}],
                visitor: this.formbuilder.group({
                    full_name : [{value: visit.visitor.full_name, disabled: true}],
                    vehicle : [{ value: visit.visitor.vehicle, disabled: true}],
                    pass : [visit.visitor.pass, <any>Validators.required],
                }),
                purpose: [{ value: visit.purpose, disabled: true}],
                remarks : [{ value: visit.remarks, disabled: true}],
                check_in: [''],
        });
         // this.myForm.setValue(this.user);
    }

    checkOut(model: any, isValid: boolean){
        this.checkOutSsubmitted = true;

        if(isValid == true){
            model.check_out = new Date();
            console.log(model);
            this.visitOut.check_out =  model.check_out;
            this.visitOut.checkout_by = "123n1kj2b31kb31b23k21j";
            this.checkOutModal.close();

                // this.visitService.checkOut(this.visitOut._id)
                // .then(
                //     data => {
                //         this.checkOutModal.close();
                //         this.alertService.success('Check out guest successful', true);
                //     },
                //     error => {
                //         console.log(error);
                //         this.checkOutModal.close();
                //         alert(`Check out could not be save, server Error.`);
                //     }
                // );
        }
    }

    checkIn(model: any, isValid: boolean) {
        this.checkInSsubmitted = true;

        if(isValid == true){
            model.check_in = new Date();
            console.log(model);
            this.visit.check_in =  model.check_in;
            this.visit.checkin_by = "123n1kj2b31kb31b23k21j";
            this.checkInModal.close();

                // this.visitService.checkIn(this.visit._id)
                // .then(
                //     data => {
                //         this.checkInModal.close();
                //         this.alertService.success('Check in guest successful', true);
                //     },
                //     error => {
                //         console.log(error);
                //         this.checkInModal.close();
                //         alert(`Check in could not be save, server Error.`);
                //     }
                // );
        }

    }

    addGuest(model: any, isValid: boolean) {
        this.addSubmitted = true;
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        if(model.check_in == true){
        	model.check_in = this.convertDate(new Date());
            model.checkin_by = "123n1kj2b31kb31b23k21j";
        }else{
        	model.check_in = '';
        }
        model.visit_date =  this.visitDateCreate;
        if(isValid == true){

            this.visits.push(model);
            this.firstModal.close();
            console.log(model);
            this.ngOnInit();

            // this.visitService.create(model)
            // .then(
            //     data => {
            //         this.alertService.success('Add guest successful', true);
            //         this.firstModal.close();
            //         this.ngOnInit();
            //     },
            //     error => {
            //         console.log(error);
            //         this.firstModal.close();
            //         alert(`Guest register could not be save, server Error.`);
            //     }
            // );

            this.addSubmitted = false;
        }
    }

	private loadVisits() {
        this.visitService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.visits            = data.filter(data => data.development._id == this.name.default_development._id);
                    this.visitActive       = data.filter(data => data.visit_date.slice(0, 10)  == this.activeDate );
                    for (var i = 0; i < this.visitActive.length; i++) {
                    this.visitActive[i].i = i+1;
            }
                }, 1000);
            });

  //       this.visitService.getVisits().then(data => {
  //           this.visits      = data;
  //           this.visitActive = this.visits.filter(data => data.visit_date.slice(0, 10)  == this.activeDate );
  //           console.log(this.visitActive.length);
  //           for (var i = 0; i < this.visitActive.length; i++) {
  //           	this.visitActive[i].i = i+1;
  //           }

		// });
    }

    onPickerClick(event:any) {
      this.activeDate = event.formatted;
      this.activeDateFull = event.jsdate;
      this.loadVisits();
    }

    visitDateCreateChanged(event:any) {
        this.visitDateCreate = event.formatted;
    }

    previousDay(){
    	(this.activeDate = new Date()).setDate(this.activeDateFull.getDate() - 1);
    	this.activeDateFull = this.activeDate;
    	this.ngOnInit();
    }

    nextDay(){
    	(this.activeDate = new Date()).setDate(this.activeDateFull.getDate() + 1);
    	this.activeDateFull = this.activeDate;
    	console.log(this.activeDateFull);
    	this.ngOnInit();
    }

   	goBack(): void {
    	this.location.back();
  	}
}
