import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe  } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking, Facility } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  // moduleId: module.id,
  selector: 'booking',
  templateUrl: 'app/templates/booking.html',
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
    bookings: any[] = [];
    facilities: Facility[] = [];
    myForm: FormGroup;
    model: any = {}; 
    id: string;
    times_start : any[] = [];
    times_end : any[] = [];
    period : any[] = [];
    end : any; 
    min : any;
    start : any;
    day : any;
    filtered : any;
    selectedDay : any;
    days : any[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    name: any;

	constructor(
		private router: Router,
        private facilityService: FacilityService,
		private bookingService: BookingService,
		private alertService: AlertService,
        private formbuilder: FormBuilder,
		private route: ActivatedRoute,
        private userService: UserService){}

	ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.myForm = this.formbuilder.group({
            name : [''],
            type : ['All'],
            status : ['All'],
            start : [0],
            end : [23]
        })
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
        for (var a = 0; a < 24; ++a) {
            this.period.push(a)
        }
        this.model._id = '1';
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

        this.bookingService.getAll()
        .subscribe(bookings => {
            this.bookings = bookings;
            console.log(this.bookings[0].facility.name)
            this.selectedDay = this.bookings.filter(data => data.booking_date == this.day); 
        });
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/booking/add']);
        
    }

    view(booking: Booking){
        this.router.navigate([this.name.default_development.name + '/booking/edit', booking._id]);
    }

    filter(booking: any){
        this.day  = new Date(this.dt.getTime());
        this.day  = this.convertDate(this.day);
        if(booking.start < 10) {
            var start = "0" + booking.start.toString() + ":00"
        }else{
            var start = booking.start.toString() + ":00"
        }
        if(booking.end < 10) {
            var end   = "0" + booking.end.toString() + ":00"
        }else{
            var end   = booking.end.toString() + ":00"
        }
        console.log(booking);
        
        this.bookingService.getBookings()
        .then(bookings => {
            this.bookings = bookings;
            if(booking.status == "all" ) {
                this.filtered = this.bookings.filter(data => 
                    data.start_time >= start && 
                    data.end_time <= end && 
                    data.facility.name == booking.name &&
                    data.facility.facility_type == booking.type
                );
            };
            if(booking.status == "all" && booking.type == "all") {
                this.filtered = this.bookings.filter(data => 
                    data.start_time >= start && 
                    data.end_time <= end && 
                    data.facility.name == booking.name 
                );
            };
            if(booking.type == "all") {
                this.filtered = this.bookings.filter(data => 
                    data.start_time >= start && 
                    data.end_time <= end && 
                    data.facility.name == booking.name &&
                    data.status == booking.status
                );
            }else{
                this.filtered = this.bookings.filter(data => 
                    data.start_time >= start && 
                    data.end_time <= end &&
                    data.status == booking.status &&
                    data.facility.name == booking.name &&
                    data.facility.facility_type == booking.type
                );
            }
            console.log(this.filtered)
        });
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
