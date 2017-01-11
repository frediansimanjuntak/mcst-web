import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking,Facility } from '../../models/index';
import { BookingService, AlertService, FacilityService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';

export var Binformation: any[] = []

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

export class EditBookingComponent implements OnInit  { 
	public dt: Date = new Date();
    private opened: boolean = false;
	booking: Booking;
    bookings: Booking[] = [];
    facilities: Facility[] = [];
    model: any = {}; 
    start : any;
    loading = false;
    selectedValues: string[] = [];
    times_start : any[] = [];
    times_end : any[] = [];
    tstart : any[] = [];
    tend : any[] = [];
    end : any; 
    min : any;
    id: string;
    ref_no: string;
    facility_id: number = 0;
    selectedDay: any;
    step: number;
    day : any;
    days : any[] = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

    constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
		private route: ActivatedRoute){}

	ngOnInit() {
        this.step = 1;
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

    createBooking() {
        console.log(this.model);
        // this.anouncementService.create(this.model)
        // .subscribe(
        //     data => {
        //         this.alertService.success('Create newsletter successful', true);
        //         this.router.navigate(['/newsletter']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The Newsletter could not be save, server Error.`);
        //     }
        // );
    }

    convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return (ddChars[1]?dd:"0"+ddChars[0]) + '/' + (mmChars[1]?mm:"0"+mmChars[0]) + '/' + yyyy;
    }

	

    public archieveSelected(start:any[],end:any[],min:any,name:any,type:any){
        // this.facilityService.getFacilities()
        // .then(facilities => { 
        //     this.facilities = facilities;
        //     let selected = this.facilities.filter(data => data.name == name); 
        //     let id = selected[0]._id;
        //     console.log(id)
        //     console.log(selected)
        // });
        this.tstart.push(start)
        this.tend.push(end)
        var time_start = Math.min.apply(null,this.tstart);
        var time_end = Math.max.apply(Math,this.tend);
        this.model.start_time = time_start+min;
        this.model.end_time = time_end+min;
        this.model.name = name;
        this.model.facility_type = type;
        
        console.log(this.model)
    }

    public test() {  
        let date;
        date     = new Date(this.dt.getTime());
        date     = this.convertDate(date);
        this.model.date = date
        this.day = this.days[this.dt.getDay()];
        this.times_start = [];
        this.times_end   = [];
        this.ngOnInit();
    }

    next(){
        this.generate()
        this.model.serial_no = this.ref_no.toString();
        this.model.sender = "Mr. Nice";
        this.model.fees = [{
            deposit_fee : "80",
            booking_fee : "30",
            admin_fee : "0"
        }]
        var deposit = +this.model.fees[0].deposit_fee;
        var booking = +this.model.fees[0].booking_fee;
        var admin_fee = +this.model.fees[0].admin_fee;
        console.log(deposit+booking+admin_fee);
        this.model.total_amount = deposit + booking + admin_fee;
        console.log(this.model.total_amount)
        this.step = 2;
    }

    cancel(){
        this.step = 1
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files); 
       this.model.payment_proof = files;
    }

    remove(i: any){ 
        this.model.payment_proof.splice(i, 1)
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generate(){
        this.ref_no = this.getRandomInt(1, 9999999);
    }
	
}
