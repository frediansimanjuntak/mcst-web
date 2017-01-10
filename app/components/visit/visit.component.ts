import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Visit, Visits } from '../../models/index';
import { VisitService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  moduleId: module.id,
  selector: 'visit',
  templateUrl: '/app/templates/visit.html',
})

export class VisitComponent implements OnInit { 
    @ViewChild('checkInModal') checkInModal;
    @ViewChild('checkOutModal') checkOutModal;
    @ViewChild('firstModal') firstModal;
	visit: Visit;
    visitOut: Visit;
    visits: Visit[] = [];
    visitActive: any[] = [];
    DateOptions: any = {};
    model: any = {};
    id: string;
    dateToShow: string;
    cols: any[];
    checked: string[] = [];
    selectedValues: string[] = [];
    btnArchive: boolean = false;
    myForm: FormGroup;
    checkInForm: FormGroup;
    checkOutForm: FormGroup;
    public developmentId;
    public data;
    public petitionPending;
    public petitionProgress; 
    public petitionApproved; 
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public activeDate: any;
    public activeDateFull: any;
    public tomorrow: Date;
    public afterTomorrow: Date;
    public addSubmitted: boolean;
    public checkInSsubmitted: boolean;
    public checkOutSsubmitted: boolean;
  
    constructor(
                private router: Router,
                private visitService: VisitService, 
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private formbuilder: FormBuilder
                ) {
 
     this.activeDate = this.activeDateFull = new Date();
    }

    ngOnInit(): void {
    	this.addSubmitted = false;
    	this.checkInSsubmitted = false;
        this.checkOutSsubmitted = false;
		this.developmentId = '585b36585d3cc41224fe518a';

		if(typeof this.activeDate !== "string"){
		this.activeDate = this.convertDate(this.activeDate);
		}
		
       	this.loadVisits();

		this.myForm = this.formbuilder.group({
			 	property: ['', <any>Validators.required],
                visitor: this.formbuilder.group({
                    full_name : ['',  <any>Validators.required],
                    vehicle : [''],
                    pass : [''],
                }),
                purpose: [''],
                remarks : [''],
                check_in: ['',<any>Validators.required],
        });

        this.DateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            editableDateField: false,
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

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }




    deletePetition(petition) {
      console.log(petition);
        // this.announcementService.delete(announcement._id) 
        //   .then(
        //     response => {
        //       if(response) { 
        //         console.log(response);
        //         // console.log(response.error());
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //       } else {
        //         this.alertService.success('Create user successful', true);
        //         alert(`Delete Newsletter successful`);
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> { 
        //       console.log(error);
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //     }
        // );
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
            this.visit.check_out =  model.check_out;
            this.visit.checkout_by = "123n1kj2b31kb31b23k21j";
            this.checkOutModal.close();

                this.visitService.create(model)
                .subscribe(
                    data => {
                        this.alertService.success('Add guest successful', true);
                        this.router.navigate(['/unit']);
                        this.checkInSsubmitted = false;
                    },
                    error => {
                        console.log(error);
                        alert(`Guest register could not be save, server Error.`);
                        this.checkInSsubmitted = false;
                    }
                );
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

                this.visitService.create(model)
                .subscribe(
                    data => {
                        this.alertService.success('Add guest successful', true);
                        this.router.navigate(['/unit']);
                        this.checkInSsubmitted = false;
                    },
                    error => {
                        console.log(error);
                        alert(`Guest register could not be save, server Error.`);
                        this.checkInSsubmitted = false;
                    }
                );
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
        model.visit_date =  this.convertDate(new Date());
        if(isValid == true){
            this.visits.push(model);
            this.firstModal.close();
            console.log(model);
            this.visitService.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Add guest successful', true);
                    this.router.navigate(['/unit']);
                },
                error => {
                    console.log(error);
                    alert(`Guest register could not be save, server Error.`);
                }
            );
            this.addSubmitted = false;
        }
    }

	private loadVisits() {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          = data.find(data => data._id === this.developmentId );
        //             this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' ); 
        //             this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
        //             console.log(this.dataAgm);
        //         }, 1000);
        //     });

        this.visitService.getVisits().then(data => {
            this.visits      = data;
            this.visitActive = this.visits.filter(data => data.visit_date.slice(0, 10)  == this.activeDate );
            console.log(this.visitActive.length);
            for (var i = 0; i < this.visitActive.length; i++) {
            	this.visitActive[i].i = i+1;
            }
           
		});
    }

    public tabs:Array<any> = [
        {title: 'Dynamic Title 1', content: ''},
        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
        {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true},
        {title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass'}
    ];
     
    public setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };

    viewPetition(visit: Visit){
        this.router.navigate(['/petition/view', visit._id]);
    }

    editPetition(visit: Visit){
        this.router.navigate(['/petition/edit', visit._id]);
    }

    onPickerClick(event:any) {
      this.activeDate = event.formatted;
      this.loadVisits();
      // this.dateToShow = ;
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
