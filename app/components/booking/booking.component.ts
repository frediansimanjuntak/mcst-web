import { Component, OnInit } from '@angular/core';
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
        this.bookingService.getBookings().then(bookings => { this.bookings = bookings; });
    }

    add(){
        this.router.navigate(['/booking/add']);
    }

    view(booking: Booking){
        this.router.navigate(['/booking/edit', booking._id]);
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
}
