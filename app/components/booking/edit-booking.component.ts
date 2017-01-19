import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Booking,Facility, Bookings } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';

export var Binformation: any[] = []

@Component({
  // moduleId: module.id,
  selector: 'edit-booking',
  templateUrl: 'app/templates/edit-booking.html',
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
    facility: Facility;
    facility_id: any;
    model: any = {};
    start : any;
    loading = false;
    selectedValues: string[] = [];
    times_start : any[] = [];
    times_end : any[] = [];
    period : any[] = [];
    tstart : any[] = [];
    tend : any[] = [];
    timeStart : any[] = [];
    timeEnd : any[] = [];
    end : any; 
    min : any;
    filtered: any;
    facility_name : any;
    facility_type: any;
    id: string;
    ref_no: string;
    _id: number = 0;
    selectedDay: any;
    step: number;
    day : any;
    myForm: FormGroup;
    days : any[] = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    name: any;

    constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
        private formbuilder: FormBuilder,
		private route: ActivatedRoute,
        private userService: UserService){}

	ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.myForm = this.formbuilder.group({
            id : ['1'],
            choice : ['All'],
            start : [0],
            end : [23]
        })
        this.step = 1;
        this.day = this.days[this.dt.getDay()];
        console.log(this.day)
		this.facilityService.getAll()
		.subscribe(facilities => {
			this.facilities = facilities;
            this.selectedDay = this.facilities[this._id].schedule.filter(data => data.day == this.day); 
            if (this.selectedDay.length > 0) { 
    			this.start = this.selectedDay[0].start_time.slice(0,2);
        			let start = +this.start
                    console.log(start);
        			this.end = this.selectedDay[0].end_time.slice(0,2);
        			let end = +this.end
                    console.log(end);	
        			this.min =	":00"
        			for (var i = start; i < end; ++i) {
        			    this.times_start.push(i)
        			}
            		while(start < end){       
               			start += 1;
               			this.times_end.push(start)
            		}
            }
		});
        for (var a = 0; a < 24; ++a) {
            this.period.push(a)
        }
		this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllBookings();
        }else{
        	this.bookingService.getById(this.id).subscribe(booking => {this.booking = booking;});
        }

    }

    private loadAllBookings() {
        this.bookingService.getAll().subscribe(bookings => { this.bookings = bookings; });
    }

    createBooking() { 
        this.facilityService.getAll()
        .subscribe(facilities => {
            this.facilities = facilities;
            this.filtered = this.facilities.filter(data => data.name >= this.model.name );
            this.model.facility = this.filtered._id;
            console.log(this.filtered._id)
        })
        this.model.reference_no = this.model.serial_no
        this.bookingService.create(this.model)
        .then(
            data => {
                this.alertService.success('Create booking successful', true);
                this.router.navigate([this.name.default_development.name + '/booking']);
            },
            error => {
                console.log(error);
                alert(`The booking could not be save, server Error.`);
            }
        );
    }

    convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return (ddChars[1]?dd:"0"+ddChars[0]) + '/' + (mmChars[1]?mm:"0"+mmChars[0]) + '/' + yyyy;
    }

    convertDate1(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    }

	filter(data: any){
        this.day = this.days[this.dt.getDay()];
        if(data.start < 10) {
            var start = "0" + data.start.toString() + ":00"
        }else{
            var start = data.start.toString() + ":00"
        }
        if(data.end < 10) {
            var end   = "0" + data.end.toString() + ":00"
        }else{
            var end   = data.end.toString() + ":00"
        } 
        this.model.facility = data.id
        this.facilityService.getById(data.id)
        .subscribe(facility => {
            this.facility = facility;
            this.facility_name = facility.namre;
            this.facility_type = facility.facility_type;
            if(data.choice == "all" ) {
                this.filtered = this.facility.schedule.filter(data => 
                    data.start_time <= start && 
                    data.end_time >= end        
                );
            }else{
                this.filtered = this.facility.schedule.filter(data => 
                    data.start_time <= start && 
                    data.end_time >= end 
                );
            };
            if (this.filtered.length > 0) {   
                this.min =    ":00"
                for (var i = data.start; i < data.end; ++i) {
                    this.timeStart.push(i)
                }
                while(data.start < data.end){       
                    data.start += 1;
                    this.timeEnd.push(data.start)
                }
            }
            console.log(this.filtered)
        });
    }

    public archieveSelected(start:any[],end:any[],min:any,name:any,type:any){
        this.tstart.push(start)
        this.tend.push(end)
        var time_start = Math.min.apply(Math,this.tstart);
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
        let booking_date;
        booking_date     = new Date(this.dt.getTime());
        booking_date     = this.convertDate1(booking_date);
        this.model.booking_date = booking_date
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

    change(){
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

    cancel(){
        this.router.navigate([this.name.default_development.name + '/booking' ]);
    }
	
}
