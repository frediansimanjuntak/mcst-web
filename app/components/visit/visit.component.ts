import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../index';
import { Visit, Visits } from '../../models/index';
import { VisitService, AlertService, UserService, UnitService} from '../../services/index';
import '../../rxjs-operators';
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
    unit: any;
    id: string;
    visitDateCreate: any;
    dataUnit: any[]=[];
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
    public options = {
        position: ["bottom", "right"],
        timeOut: 3000,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
    }
    name: any;
    loading = false;

    constructor(
                private router: Router,
                private visitService: VisitService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private formbuilder: FormBuilder,
                private userService: UserService,
                private unitService: UnitService,
                private appComponent: AppComponent,
    ){
        this.visitDateCreate = new Date();
        this.activeDate = this.activeDateFull = new Date();
    }

    ngOnInit(): void {
        this.unit = {};
        this.loading = true;
    	this.addSubmitted = false;
    	this.checkInSsubmitted = false;
        this.checkOutSsubmitted = false;
		this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadAllUnits();
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
                    prefix: ['']
                }),
                purpose: ['house_visit'],
                remarks : [''],
                check_in: [false,<any>Validators.required],
                check_out: [''],
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
        setTimeout(() => this.appComponent.loading = false, 1000);
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
        this.appComponent.loading = true
    	this.visit = visit;
   		this.checkInForm = this.formbuilder.group({
			 	property: [{value: visit.visiting, disabled: true}],
                visitor: this.formbuilder.group({
                    full_name : [{value: visit.visitor.full_name, disabled: true}],
                    vehicle : [{ value: visit.visitor.vehicle, disabled: true}],
                    pass : [visit.visitor.pass, <any>Validators.required],
                }),
                purpose: [{ value: visit.purpose, disabled: true}],
                remarks : [{ value: visit.remarks, disabled: true}],
                check_in: [''],
        });
        setTimeout(() => this.appComponent.loading = false, 1000);
         // this.myForm.setValue(this.user);
    }

    preCheckOut(visit){
        this.appComponent.loading = true
        this.visitOut = visit;
           this.checkOutForm = this.formbuilder.group({
                 property: [{value: visit.visiting, disabled: true}],
                visitor: this.formbuilder.group({
                    full_name : [{value: visit.visitor.full_name, disabled: true}],
                    vehicle : [{ value: visit.visitor.vehicle, disabled: true}],
                    pass : [visit.visitor.pass, <any>Validators.required],
                }),
                purpose: [{ value: visit.purpose, disabled: true}],
                remarks : [{ value: visit.remarks, disabled: true}],
                check_in: [''],
        });
        setTimeout(() => this.appComponent.loading = false, 1000);
         // this.myForm.setValue(this.user);
    }

    checkOut(model: any, isValid: boolean){
        this.appComponent.loading = true
        this.checkOutSsubmitted = true;

        if(isValid === true){
            this.loading = true;
            this.visitService.checkOut(this.visitOut._id)
                .then(
                    data => {
                        this.checkOutModal.close();
                        this.ngOnInit();
                        this.appComponent.showNotification('success', 'Check out '+ this.visitOut.visitor.prefix + ' ' + this.visitOut.visitor.full_name + 'successful');
                    },
                    error => {
                        console.log(error);
                        this.checkOutModal.close();this.appComponent.showNotification('error', 'Check in failed, server Error');
                        this.appComponent.showNotification('error', 'Check out failed, server Error');
                        this.loading = false;
                    }
                );
        }
    }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Print tab</title>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }

    checkIn(model: any, isValid: boolean) {
        this.appComponent.loading = true
        this.checkInSsubmitted = true;
        if(isValid === true){
            this.loading = true;
            this.visitService.checkIn(this.visit._id)
                .then(
                    data => {
                        this.checkInModal.close();
                        this.ngOnInit();
                        this.appComponent.showNotification('success', 'Check in '+ this.visit.visitor.prefix + ' ' + this.visit.visitor.full_name + 'successful');
                    },
                    error => {
                        console.log(error);
                        this.checkInModal.close();
                        this.appComponent.showNotification('error', 'Check in failed, server Error');
                        this.loading = false;
                    }
                );
        }

    }

    addGuest(model: any, isValid: boolean) {
        this.appComponent.loading = true
        this.addSubmitted = true;
        if(model.check_in === true){
        	model.check_in = new Date();
        }else{
            model.check_in = ''
        }
        model.visit_date =  this.visitDateCreate;
        if(isValid === true){
            this.loading = true;
            this.visitService.create(model)
            .then(
                data => {
                    this.firstModal.close();
                    this.ngOnInit();
                    this.appComponent.showNotification('success', 'Add guest successful');
                },
                error => {
                    console.log(error);
                    this.firstModal.close();
                    this.appComponent.showNotification('error', 'Add guest failed, server Error');
                    this.loading = false;
                }
            );

            this.addSubmitted = false;
        }
    }

	private loadVisits() {
        this.visitService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.visits            = data.filter(data => data.development == this.name.default_development._id);
                    this.visitActive       = data.filter(data => data.visit_date.slice(0, 10)  == this.activeDate );
                    for (var i = 0; i < this.visitActive.length; i++) {
                        this.visitActive[i].i = i+1;
                        let visiting = this.dataUnit.find(data => data._id ==  this.visitActive[i].property);
                        this.visitActive[i].visiting = '#' + visiting.address.unit_no + '-' + visiting.address.unit_no_2;
                    }
                    this.loading = false;
                }, 1000);
            });
            setTimeout(() => this.appComponent.loading = false, 1000);
    }

    private loadAllUnits(): void {
        this.unitService.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.dataUnit       = data.properties;
                    this.loadVisits();
                }, 1000);
            });
    }

    onPickerClick(event:any) {
        this.appComponent.loading = true
      this.visitActive  = [];
      this.activeDate = event.formatted;
      this.activeDateFull = event.jsdate;
      this.loadVisits();
    }

    visitDateCreateChanged(event:any) {
        this.visitDateCreate = event.formatted;
    }

    onUnitClick(id:string){
          this.unit = {};
          this.unitService
               .getById(id, this.name.default_development.name_url)
                .subscribe(unit => {
                    this.unit = unit.properties[0];
                })
    }

    previousDay(){
        this.appComponent.loading = true
        this.visitActive  = [];
    	(this.activeDate = new Date()).setDate(this.activeDateFull.getDate() - 1);
    	this.activeDateFull = this.activeDate;
    	this.ngOnInit();
    }

    nextDay(){
        this.appComponent.loading = true
        this.visitActive  = [];
    	(this.activeDate = new Date()).setDate(this.activeDateFull.getDate() + 1);
    	this.activeDateFull = this.activeDate;
    	this.ngOnInit();
    }

   	goBack(): void {
    	this.location.back();
  	}
}
