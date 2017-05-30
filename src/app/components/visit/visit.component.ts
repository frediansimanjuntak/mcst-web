import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { Visit, Visits, Contract } from '../../models/index';
import { VisitService, AlertService, UserService, UnitService, ContractService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';

import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";

@Component({
  // moduleId: module.id,
  selector: 'visit',
  templateUrl: '../../templates/visit.html',
})

export class VisitComponent implements OnInit {
    @ViewChild('checkInModal') checkInModal;
    @ViewChild('checkOutModal') checkOutModal;
    @ViewChild('firstModal') firstModal;
	visit: Visit;
    visitOut: Visit;
    contracts: Contract[] = [];
    public filterField: string = '';
    visits: any[] = [];
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
    loading: boolean = true;
    name: any;

    constructor(
                private router: Router,
                private visitService: VisitService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private contractService: ContractService,
                private formbuilder: FormBuilder,
                private userService: UserService,
                private unitService: UnitService,
                
                private _notificationsService: NotificationsService,
    ){
        this.visitDateCreate = new Date();
        this.activeDate = this.activeDateFull = new Date();
    }

    ngOnInit(): void {
        this.unit = {};
    	this.addSubmitted = false;
    	this.checkInSsubmitted = false;
        this.checkOutSsubmitted = false;
		this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
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
                    prefix: ['', Validators.required]
                }),
                purpose: ['', Validators.required],
                remarks : [''],
                check_in: [false,<any>Validators.required],
                check_out: [''],
                contract: ['']
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
    }

    preCheckOut(visit){
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
    }

    checkOut(model: any, isValid: boolean){
        
        this.checkOutSsubmitted = true;

        if(isValid === true){
            this.loading = true;
            this.visitService.checkOut(this.visitOut._id)
                .then(
                    data => {
                        this.loading = true;
                        this.checkOutModal.close();
                        this.ngOnInit();
                        this.loading = false;
                        this._notificationsService.success('Success', 'Check out '+ this.visitOut.visitor.prefix + ' ' + this.visitOut.visitor.full_name + ' successful')
                    },
                    error => {
                        this.userService.checkError(error.json().code)
                        this.checkOutModal.close();
                        this._notificationsService.error('Error', error.json().message)
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
        this.checkInSsubmitted = true;
        if(isValid === true){
            this.loading = true;
            this.visitService.checkIn(this.visit._id)
                .then(
                    data => {
                        this.loading =true;
                        this.checkInModal.close();
                        this.ngOnInit();
                        this.loading = false;
                        this._notificationsService.success('Success', 'Check in '+ this.visit.visitor.prefix + ' ' + this.visit.visitor.full_name + ' successful')
                    },
                    error => {
                        this.userService.checkError(error.json().code)
                        this.checkInModal.close();
                        this._notificationsService.error('Error', error.json().message)
                        this.loading = false;
                    }
                );
        }

    }

    addGuest(model: any, isValid: boolean) {
        this.addSubmitted = true;
        if(model.check_in === true){
        	model.check_in = new Date();
        }else{
            model.check_in = ''
        }
        model.visit_date =  this.visitDateCreate;

        if(model.purpose == 'house_visit'){
            delete model['contract'];
            
        }else{
            if(model.contract == ''){
                isValid = false;
            }
        }

        if(isValid === true){
            this.loading = true;
            this.visitService.create(model)
            .then(
                data => {

                    this.loading = true
                    this.firstModal.close();
                    this.ngOnInit();
                    this._notificationsService.success('Success', 'Add guest successful')
                    this.loading = false;
                },
                error => {
                    this.userService.checkError(error.json().code)
                    this.firstModal.close();
                    setTimeout(() => this.loading = false, 1000);
                    this._notificationsService.error('Error', error.json().message)
                    this.loading = false;
                }
            );
            this.addSubmitted = false;
        }
    }

	private loadVisits() {
        this.visitService.getAll()
            .subscribe((data)=> {
                    this.visits            = data.filter(data => data.development._id == this.name.default_development._id);
                    
                    this.visits            = this.visits.filter(data => data.visit_date.slice(0, 10)  == this.activeDate );
                    for (var i = 0; i < this.visits.length; i++) {
                        this.visits[i].i = i+1;
                        if(this.visits[i].property){
                            let visiting = this.dataUnit.find(data => data._id ==  this.visits[i].property);
                                this.visits[i].property_detail = visiting;
                                this.visits[i].visiting = '#' + visiting.address.unit_no + '-' + visiting.address.unit_no_2;
                        }
                    }

                    this.visitActive       = this.visits.filter(data => data.visit_date.slice(0, 10)  == this.activeDate );
                    setTimeout(() => this.loading = false, 1000);
            });
    }

    filter(){
        this.loading=true;
        this.visitActive   = this.visits.filter(data => 
                            (data.visitor.prefix+' '+data.visitor.full_name).toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.visitor.vehicle.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.visiting.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1
                            );

        setTimeout(() => this.loading = false, 500);
    }

    private loadAllUnits(): void {
        this.unitService.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                    this.dataUnit       = data.properties;
                    this.contractService.getAll().subscribe(contracts => {
                        this.contracts = contracts ;
                        this.loadVisits();
                    });
            });
    }

    onPickerClick(event:any) {
        this.loading = true
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
        this.loading = true
        this.visitActive  = [];
    	(this.activeDate = new Date()).setDate(this.activeDateFull.getDate() - 1);
    	this.activeDateFull = this.activeDate;
    	this.ngOnInit();
    }

    nextDay(){
        this.loading = true
        this.visitActive  = [];
    	(this.activeDate = new Date()).setDate(this.activeDateFull.getDate() + 1);
    	this.activeDateFull = this.activeDate;
    	this.ngOnInit();
    }

   	goBack(): void {
    	this.location.back();
  	}

    toView(type:string, id: string) {
        this.router.navigate([this.name.default_development.name_url + type + '/view/' + id]);  
  }
}
