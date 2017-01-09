import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking,Facility } from '../../models/index';
import { BookingService, AlertService, FacilityService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';

export class Schedule {
	start_time: string[];
	end_time: string[];
	facility_name: string;
	status:string
}

@Component({
  moduleId: module.id,
  selector: 'edit-booking',
  templateUrl: '/app/templates/edit-booking.html',
  styles: [`
  	.full button span {
	    background-color: limegreen;
	    border-radius: 32px;
	    color: black;
  	}
    .partially button span {
	    background-color: orange;
	    border-radius: 32px;
	    color: black;
    }
    table.tableSection {
        display: table;
        width: 100%;
    }
    table.tableSection thead, table.tableSection tbody {
        float: left;
        width: 100%;
    }
    table.tableSection tbody {
        overflow: auto;
        height: 350px;
    }
    table.tableSection tr {
        width: 100%;
        display: table;
        text-align: left;
    }
    table.tableSection th, table.tableSection td {
        width: 33%;
    }
    table.tableSection td {
        height: 50px
    }
  `]
})

export class EditBookingComponent  { 
	public dt: Date = new Date();
    public events: any[];
    public tomorrow: Date;
    public minDate: Date = void 0;
    public afterTomorrow: Date;
    public dateDisabled: {date: Date, mode: string}[];
    public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format: string = this.formats[0];
    public dateOptions: any = {
        formatYear: 'YY',
        startingDay: 1
    };
    private opened: boolean = false;
	booking: Booking;
    bookings: Booking[] = [];
    facilities: Facility[] = [];
    model: any = {}; 
    start : any;
    selectedValues: string[] = [];
    times_start : any[] = [];
    times_end : any[] = [];
    end : any; 
    min : any;
    id: string;
    schedule : Schedule;

    constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
		private route: ActivatedRoute){
		(this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
	    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
	    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
	    (this.dateDisabled = []);
	    this.events = [
	      {date: this.tomorrow, status: 'full'},
	      {date: this.afterTomorrow, status: 'partially'}
	    ];
	}

	ngOnInit() {
		this.facilityService.getFacilities()
		.then(facilities => { 
			this.facilities = facilities;
			this.start = facilities[0].schedule[0].start_time.slice(0,2);
			let start = +this.start
			this.end = facilities[0].schedule[0].end_time.slice(0,2);
			let end = +this.end	
			this.min =	facilities[0].schedule[0].start_time.slice(2,5);
			for (var i = start; i < end; ++i) {
					this.times_start.push(i)
			}
    		while(start < end){       
       			start += 1;
       			this.times_end.push(start)
    		}
		});
		this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllBookings();
        }else{
        	this.bookingService.getBooking(this.id).then(booking => {this.booking = booking;});
        }
             
    }

    private loadAllBookings() {
        this.bookingService.getBookings().then(bookings => { this.bookings = bookings; });
    }

	 public getDate(): number {
	    return this.dt && this.dt.getTime() || new Date().getTime();
	}
 
  	public today(): void {
    	this.dt = new Date();
  	}
 
	public d20090824(): void {
	    this.dt = moment('2009-08-24', 'YYYY-MM-DD')
	      .toDate();
	}
 
	public disableTomorrow(): void {
	    this.dateDisabled = [{date: this.tomorrow, mode: 'day'}];
    }
 
  // todo: implement custom class cases
    public getDayClass(date: any, mode: string): string {
	    if (mode === 'day') {
	      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);
	 
	      for (let event of this.events) {
	        let currentDay = new Date(event.date).setHours(0, 0, 0, 0);
	 
	        if (dayToCheck === currentDay) {
	          return event.status;
	        }
	      }
	    }
	 
	    return '';
    }
 
    public disabled(date: Date, mode: string): boolean {
    	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    }
 
    public open(): void {
    	this.opened = !this.opened;
    }
 
    public clear(): void {
    	this.dt = void 0;
    	this.dateDisabled = undefined;
    }
 
    public toggleMin(): void {
    	this.dt = new Date(this.minDate.valueOf());
    }

    archieveSelected(){
        console.log(this.selectedValues);
    }
	
}
