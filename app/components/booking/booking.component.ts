import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DatePipe  } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking } from '../../models/index';
import { BookingService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'development',
  templateUrl: '/app/templates/booking.html',
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
  `]
})

export class BookingComponent implements OnInit {
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
    model: any = {}; 
    id: string;
    day : any;
    selectedDay : any;
    days : any[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	constructor(
		private router: Router,
		private bookingService: BookingService,
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
		this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllBookings();
        }else{
        	this.bookingService.getBooking(this.id).then(booking => {this.booking = booking;});
        }
             
    }

    transform(date: any, args?: any): any {
        let d = new Date(date)
        

    }
 
    deleteBooking(booking: Booking) {
    	console.log(booking)
        this.bookingService.delete(booking._id) 
        .then(
			response => {
				if(response) { 
	                alert(`The booking could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete booking successful', true);
	                this.loadAllBookings()
	            }
            },
            error=> { 
                alert(`The Booking could not be deleted, server Error.`);
            }
        );
    }
   
    private loadAllBookings() {
        this.bookingService.getBookings()
        .then(bookings => { 
            this.bookings = bookings;
            this.selectedDay = this.bookings.filter(data => data.booking_date == this.day ); 
        });
    }

    add(){
        this.router.navigate(['/booking/add']);
    }

    view(booking: Booking){
        this.router.navigate(['/booking/edit', booking._id]);
    }

    convertDate(date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth()+1).toString();
      var dd  = date.getDate().toString();

      var mmChars = mm.split('');
      var ddChars = dd.split('');

      return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    public getDate() {  
        this.day     = new Date(this.dt.getTime());
        this.day = this.convertDate(this.day);
	    // return this.dt && this.days[this.dt.getDay()] || new Date().getDay();
        this.ngOnInit();
	}

    public getDay(): number {
        return this.dt && this.dt.getDay() || new Date().getDay();
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
}
