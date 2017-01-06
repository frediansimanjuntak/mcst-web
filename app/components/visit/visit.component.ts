import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Visit } from '../../models/index';
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
	visit: Visit;
    visits: Visit[] = [];
    visitActive: Visit[] = [];
    DateOptions: any = {};
    model: any = {};
    id: string;
    dateToShow: string;
    cols: any[];
    checked: string[] = [];
    selectedValues: string[] = [];
    btnArchive: boolean = false;
    myForm: FormGroup;
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
    public check_in = [
	    { value: 'F', display: 'Female' },
	    { value: 'M', display: 'Male' }
	];
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
		this.developmentId = '585b36585d3cc41224fe518a';

		if(typeof this.activeDate !== "string"){
		this.activeDate = this.convertDate(this.activeDate);
		}
		
       	this.loadVisits();

		this.myForm = this.formbuilder.group({
			 	property: ['', <any>Validators.required],
                visitor: this.formbuilder.group({
                    full_name : ['',  <any>Validators.required],
                    vehicle : ['', <any>Validators.required],
                    pass : ['', <any>Validators.required],
                }),
                purpose: ['', <any>Validators.required],
                remarks : ['', <any>Validators.required],
                check_in: [<any>Validators.required],
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

    

    openModal(announcement){
       
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
            console.log(this.visitActive);
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
