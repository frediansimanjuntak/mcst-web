import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Booking, Facility, Bookings } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService, UnitService, PaymentService } from '../../services/index';
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
    public minDate: Date = void 0;
    private opened: boolean = false;
	booking: Booking;
    bookings: Booking[] = [];
    facilities: Facility[] = [];
    facility: Facility;
    payments: any;
    no: any;
    units: any[] = [];
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
    status: any;
    filtered: any;
    facility_name : any;
    facility_type: any;
    booking_status: any[] = [];
    booking_fee: any;
    id: string;
    ref_no: string;
    _id: number = 0;
    selectedDay: any[] = [];
    selectedFacility: any[] = [];
    step: number;
    day : any;
    myForm: FormGroup;
    filesToUpload: Array<File>;
    days : any[] = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    name: any;

    constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
        private formbuilder: FormBuilder,
		private route: ActivatedRoute,
        private userService: UserService,
        private unitService: UnitService,
        private paymentService: PaymentService){
        (this.minDate = new Date()).setDate(this.minDate.getDate());
    }

	ngOnInit() {
        this.paymentService.getAll().subscribe(payments => {
            this.payments = payments ;
            if(payments.length > 0) { 
                var a = this.payments.length - 1;
                this.no = +this.payments[a].serial_no + 1
                if(this.no > 1 && this.no < 10) {
                    this.model.serial_no = '000' + this.no.toString();
                }if(this.no > 10 && this.no < 100) {
                    this.model.serial_no = '00' + this.no.toString();
                }if(this.no > 100 && this.no < 1000) { 
                    this.model.serial_no = '0' + this.no.toString();
                }if(this.no > 1000) {
                    this.model.serial_no = this.no.toString();
                }
            } else {
                this.model.serial_no = '0001'
            }
            
        });
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name;
            this.unitService.getAll(name.default_development.name_url).subscribe(units => {this.units = units.properties})
        })
        this.step = 1;
        this.day = this.days[this.dt.getDay()];
		this.facilityService.getAll()
		.subscribe(facilities => {
			this.facilities = facilities;
            for (let a = 0; a < facilities.length; ++a) {
                for (let b = 0; b < facilities[a].schedule.length; ++b) {
                    this.selectedFacility = this.facilities.filter(data => data.schedule[b].day == this.day); 
                }   
            }
            if (this.selectedFacility.length > 0) { 
                this.model.facility = this.selectedFacility[0]._id;
                this.facilityService.getById(this.model.facility)
                .subscribe(facility => {
                    this.facility = facility;
                    this.facility_name = facility.name;
                    this.facility_type = facility.facility_type;
                    this.model.booking_fee = facility.booking_fee;
                this.selectedDay = this.facility.schedule.filter(data => data.day == this.day); 
    			this.start = this.selectedDay[0].start_time.slice(0,2);
        		let start = +this.start
        		this.end = this.selectedDay[0].end_time.slice(0,2);
        		let end = +this.end
        		this.min =	":00"
        		for (var i = start; i < end; ++i) {
        		    this.times_start.push(i)
        		}
            	while(start < end){       
               		start += 1;
               		this.times_end.push(start)
            	}
                let booking_date;
                    booking_date     = new Date(this.dt.getTime());
                    booking_date     = this.convertDate1(booking_date);
                    this.bookingService.getAll()
                    .subscribe(bookings => {
                        console.log(bookings)
                            for (let b = 0; b < this.times_start.length; ++b) {
                                this.bookings = bookings.filter(data => 
                                    data.booking_date.slice(0,10) == booking_date &&
                                    data.facility._id == this.selectedFacility[0]._id &&
                                    data.start_time == this.times_start[b]+this.min &&
                                    data.end_time == this.times_end[b]+this.min )
                                console.log(this.selectedFacility[0]._id)
                                    if(this.bookings.length > 0) {
                                        this.booking_status.push("Not Available")
                                    }else{
                                        this.booking_status.push("Available")
                                    } 
                            }
                    })
                });
            }
		});
        this.myForm = this.formbuilder.group({
            id : [this.model.facility],
            choice : ['All'],
            start : [0],
            end : [23]
        })
        for (var a = 0; a < 24; ++a) {
            this.period.push(a)
        }
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
        let formData:FormData = new FormData();
        for (var i = 0; i < this.model.payment_proof.length; i++) {
            formData.append("payment_proof[]", this.model.payment_proof[i]);
        }
        formData.append("reference_no", this.model.serial_no);
        formData.append("serial_no", this.model.serial_no);
        formData.append("total_amount", this.model.total_amount);
        formData.append("start_time", this.model.start_time);
        formData.append("end_time", this.model.end_time);
        formData.append("name", this.model.name);
        formData.append("facility_type", this.model.facility_type);
        // for (var i = 0; i < this.model.fees.length; i++) {
        //     formData.append("fees[]", this.model.fees[i]);
        // }
        formData.append("fees.deposit_fee", this.model.fees[0].deposit_fee);
        formData.append("fees.booking_fee", this.model.fees[0].booking_fee);
        formData.append("fees.admin_fee", this.model.fees[0].admin_fee);
        formData.append("booking_date", this.model.booking_date);
        formData.append("payment_type", this.model.payment_type);
        formData.append("sender", this.model.sender);
        formData.append("property", this.model.property);
        formData.append("facility", this.model.facility);
        this.bookingService.create(formData)
        .then(
            data => {
                this.alertService.success('Create booking successful', true);
                this.router.navigate([this.name.default_development.name_url + '/booking']);
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
        console.log(this.model.booking_fee)
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
        this.model.facility = data.id;
        this.facilityService.getById(data.id)
        .subscribe(facility => {
            this.facility = facility;
            this.facility_name = facility.name;
            this.facility_type = facility.facility_type;
            this.model.booking_fee = facility.booking_fee;
             this.timeStart = [];
             this.timeEnd = [];
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
        });
    }

    public archieveSelected(start:any[],end:any[],min:any,name:any,type:any){
        this.tstart.push(start)
        this.tend.push(end)
        var time_start = Math.min.apply(Math,this.tstart);
        var time_end = Math.max.apply(Math,this.tend);
        let booking_fee = this.model.booking_fee * (time_end - time_start);
        this.model.fees = [{
            deposit_fee : "80" ,
            booking_fee : booking_fee ,
            admin_fee : "0" 
        }]
        var deposit = +this.model.fees[0].deposit_fee;
        var booking = +this.model.fees[0].booking_fee;
        var admin_fee = +this.model.fees[0].admin_fee;
        this.model.total_amount = deposit + booking + admin_fee;
        this.model.start_time = time_start+min;
        this.model.end_time = time_end+min;
        this.model.name = name;
        this.model.facility_type = type;
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
        // this.generate()
        // this.model.serial_no = this.ref_no.toString();
        this.model.sender = "Mr. Nice";
        this.step = 2;
    }

    change(){
        this.step = 1
        this.selectedValues = []
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.payment_proof = files;
    }
    
    remove(i: any){ 
        this.model.payment_proof.splice(i, 1)
    }

    // getRandomInt(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // generate(){
    //     this.ref_no = this.getRandomInt(1, 9999999);
    // }

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/booking' ]);
    }
	
}
