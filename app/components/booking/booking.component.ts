import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { DatePipe  } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking, Facility } from '../../models/index';
import { BookingService, AlertService, FacilityService } from '../../services/index';
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
    private opened: boolean = false;
	booking: Booking;
    bookings: Booking[] = [];
    facilities: Facility[] = [];
    model: any = {}; 
    id: string;
    times_start : any[] = [];
    times_end : any[] = [];
    end : any; 
    min : any;
    start : any;
    day : any;
    selectedDay : any;
    days : any[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	constructor(
		private router: Router,
        private facilityService: FacilityService,
		private bookingService: BookingService,
		private alertService: AlertService,
		private route: ActivatedRoute){}

	ngOnInit() {
        this.facilityService.getFacilities()
        .then(facilities => { 
            this.facilities = facilities;
            this.start = facilities[0].schedule[0].start_time.slice(0,2);
            let start = +this.start
            this.end = facilities[0].schedule[0].end_time.slice(0,2);
            let end = +this.end    
            this.min =    facilities[0].schedule[0].start_time.slice(2,5);
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
        this.day     = new Date(this.dt.getTime());
        this.day     = this.convertDate(this.day);
        this.bookingService.getBookings()
        .then(bookings => { 
            this.bookings = bookings;
            this.selectedDay = this.bookings.filter(data => data.booking_date == this.day); 
        });
    }

    add(){
        this.router.navigate(['/booking/add']);
    }

    view(booking: Booking){
        this.router.navigate(['/booking/edit', booking._id]);
    }

    onChange(id: string){
        console.log(id)
    }

    convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

    public test() {  
        this.day     = new Date(this.dt.getTime());
        this.day     = this.convertDate(this.day);
        this.ngOnInit();
    }
}
