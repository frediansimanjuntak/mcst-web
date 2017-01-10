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
    private opened: boolean = false;
	booking: Booking;
    bookings: Booking[] = [];
    facilities: Facility[] = [];
    model: any = {}; 
    start : any;
    selectedValues: string[] = [];
    times_start : any[] = [];
    times_end : any[] = [];
    tstart : any[] = [];
    tend : any[] = [];
    end : any; 
    min : any;
    id: string;
    facility_id: number = 0;
    schedule : Schedule;
    selectedDay: any;
    day : any;
    days : any[] = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

    constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
		private route: ActivatedRoute){}

	ngOnInit() {
        this.day = this.days[this.dt.getDay()];
        console.log(this.day)
		this.facilityService.getFacilities()
		.then(facilities => { 
			this.facilities = facilities;
            this.selectedDay = this.facilities[this.facility_id].schedule.filter(data => data.day == this.day); 
            if (this.selectedDay.length > 0) {  
    			this.start = this.selectedDay[0].start_time.slice(0,2);
        			let start = +this.start
                    console.log(start);
        			this.end = this.selectedDay[0].end_time.slice(0,2);
        			let end = +this.end
                    console.log(end);	
        			this.min =	this.selectedDay[0].start_time.slice(2,5);
        			for (var i = start; i < end; ++i) {
        					this.times_start.push(i)
        			}
            		while(start < end){       
               			start += 1;
               			this.times_end.push(start)
            		}
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

	

    public archieveSelected(start:any[],end:any[],min:any){
        this.tstart.push(start)
        this.tend.push(end)
        var time_start = Math.min.apply(null,this.tstart);
        var time_end = Math.max.apply(Math,this.tend);
        this.model.start_time = time_start+min
        this.model.end_time = time_end+min
    }

    public test() {  
        this.day = this.days[this.dt.getDay()];
        this.times_start = [];
        this.times_end   = [];
        this.ngOnInit();
    }
	
}
