import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Booking, Facility, Bookings } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService, UnitService, PaymentService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import { AppComponent } from '../index';

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
	filtered: any = null;
	facility_name : any;
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
	total: any;
	unit: any;
	available: any;
	date: any;

	constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
		private formbuilder: FormBuilder,
		private route: ActivatedRoute,
		private userService: UserService,
		private unitService: UnitService,
		private appComponent: AppComponent,
		private _notificationsService: NotificationsService,
		private paymentService: PaymentService){
		(this.minDate = new Date()).setDate(this.minDate.getDate());
	}

	ngOnInit() {
		this.selectedFacility = [];
		let booking_date;
		booking_date     = new Date(this.dt.getTime());
		booking_date     = this.convertDate1(booking_date);
		this.model.booking_date = booking_date
		let date;
		date     = new Date(this.dt.getTime());
		date     = this.convertDate(date);
		this.model.date = date
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
			this.unitService.getAll(this.name.default_development.name_url).subscribe(units => {this.units = units.properties})
		})
		this.step = 1;
		this.day = this.days[this.dt.getDay()];
		this.date     = new Date(this.dt.getTime());
		this.facilityService.getAll()
		.subscribe(facilities => {
			this.facilities = facilities;
			for (let a = 0; a < facilities.length; ++a) {
				if(this.facilities[a].schedule.filter(data => data.day == this.day).length > 0) {
					this.selectedFacility.push(this.facilities[a])
				}
				setTimeout(() => this.appComponent.loading = false, 1000);
			}
		});
	}

	private loadAllBookings() {
		this.bookingService.getAll()
		.subscribe(bookings => { 
			this.bookings = bookings; 
			setTimeout(() => this.appComponent.loading = false, 1000);
		});
	}

	createBooking() { 
		this.appComponent.loading = true
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
				this._notificationsService.success(
							'Success',
							'Create booking successful',
					)
				this.router.navigate([this.name.default_development.name_url + '/booking']);
			},
			error => {
				console.log(error);
				this._notificationsService.success(
							'Success',
							'Booking could not be save, server Error',
					)
				this.appComponent.loading = false
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

	time(){
		this.appComponent.loading = true
		this.times_end = [];
		this.times_start = []
		this.facilityService.getById(this.model.facility)
		.subscribe(facility => {
			this.facility = facility;
			this.selectedDay = this.facility.schedule.filter(data => data.day == this.day); 
			this.start = this.selectedDay[0].start_time.slice(0,2);
			let start = +this.start
			this.end = this.selectedDay[0].end_time.slice(0,2);
			let end = +this.end
			this.min =    ":00"
			for (var i = start; i < end; ++i) {
				this.times_start.push(i)
			}
			while(start < end){       
				   start += 1;
				   this.times_end.push(start)
			}
			this.appComponent.loading = false
		});
	}

	startTime(start){
		this.appComponent.loading = true
		this.times_end = [];
		this.facilityService.getById(this.model.facility)
		.subscribe(facility => {
			this.facility = facility;
			this.selectedDay = this.facility.schedule.filter(data => data.day == this.day); 
			this.end = this.selectedDay[0].end_time.slice(0,2);
			let end = +this.end
			this.min =    ":00"
			while(this.model.start < end){       
				   this.model.start += 1;
				   this.times_end.push(this.model.start)
			}
			this.model.start = start
			this.appComponent.loading = false
		});
	}

	filter(){
		this.appComponent.loading = true
		this.booking_status = [];
		this.day = this.days[this.dt.getDay()];
		if(this.model.start < 10) {
			var start = "0" + this.model.start.toString() + ":00"
		}else{
			var start = this.model.start.toString() + ":00"
		}
		if(this.model.end < 10) {
			var end   = "0" + this.model.end.toString() + ":00"
		}else{
			var end   = this.model.end.toString() + ":00"
		} 
		this.facilityService.getById(this.model.facility)
		.subscribe(facility => {
			this.facility = facility;
			this.facility_name = facility.name;
			this.model.deposit_fee = facility.deposit_fee;
			this.model.booking_fee = facility.booking_fee;
			this.model.admin_fee = facility.admin_fee;
			this.timeStart = [];
			this.timeEnd = [];
			this.filtered = this.facility.schedule.filter(facility => 
				facility.start_time <= start && 
				facility.end_time >= end
			);
			
			if (this.filtered.length > 0) {   
				this.min =    ":00"
				for (var i = this.model.start; i < this.model.end; ++i) {
					this.timeStart.push(i)
				}
				let timestart = this.model.start;
				while(timestart < this.model.end){       
					timestart += 1;
					this.timeEnd.push(timestart)
				}
			}
		});
		let booking_date;
		booking_date     = new Date(this.dt.getTime());
		booking_date     = this.convertDate1(booking_date);
		this.bookingService.getAll()
		.subscribe(bookings => {
			for (let b = 0; b < this.timeStart.length; ++b) {
				this.bookings = bookings.filter(data => 
					data.booking_date.slice(0,10) == booking_date &&
					data.facility._id == this.model.facility &&
					data.start_time == this.timeStart[b]+this.min &&
					data.end_time == this.timeEnd[b]+this.min )
					if(this.bookings.length > 0) {
						this.booking_status.push("Not Available")
					}else{
						this.booking_status.push("Available")
					} 
			}
			this.total = this.booking_status.length;
			this.available = this.booking_status.reduce(function(n, val) {
				return n + (val == "Available");
			}, 0);
		setTimeout(() => this.appComponent.loading = false, 1000);
		})
	}

	public archieveSelected(start:any,end:any,min:any,name:any,type:any){
		if(this.tstart.length < 1) {
			this.tstart.push(start)
			this.tend.push(end)
		}else{
			for (let a = 0; a < this.tstart.length; ++a) {
				if(this.tstart[a] != start) {
					this.tstart.push(start)
				}
				if(this.tend[a] != end) {
					this.tend.push(end)
				}
				if(this.tstart[a] == start) {
					var i = this.tstart.indexOf(start);
		            if(i != -1) {
		                this.tstart.splice(i, 1);
		            }
				}
				if(this.tend[a] == end) {
					var i = this.tend.indexOf(end);
		            if(i != -1) {
		                this.tend.splice(i, 1);
		            }
				}
			}
		}
		var time_start = Math.min.apply(Math,this.tstart);
		var time_end = Math.max.apply(Math,this.tend);
		let booking_fee = this.model.booking_fee * (time_end - time_start);
		this.model.fees = [{
			deposit_fee : this.model.deposit_fee ,
			booking_fee : booking_fee ,
			admin_fee : this.model.admin_fee 
		}]
		var deposit = +this.model.fees[0].deposit_fee;
		var booking = +this.model.fees[0].booking_fee;
		var admin_fee = +this.model.fees[0].admin_fee;
		this.model.total_amount = deposit + booking + admin_fee;
		this.model.start_time = time_start+min;
		this.model.end_time = time_end+min;
		this.model.name = name;
	}

	public selectedDate() {  
		this.appComponent.loading = true
		
		this.day = this.days[this.dt.getDay()];
		this.filtered = null;
		this.ngOnInit();
	}

	next(){ 
		this.appComponent.loading = true
		this.step = 2;
		setTimeout(() => this.appComponent.loading = false, 1000);
	}

	change(){
		this.appComponent.loading = true
		this.step = 1
		this.selectedValues = []
		this.model = {};
		this.filtered = null
		this.selectedFacility = [];
		this.tstart = [];
		this.tend = [];
		this.ngOnInit()
		setTimeout(() => this.appComponent.loading = false, 1000);
	}

	onChange(event: any) {
	   let files = [].slice.call(event.target.files);
	   this.model.payment_proof = files;
	}
	
	remove(i: any){ 
		this.model.payment_proof.splice(i, 1)
	}

	cancel(){
		this.router.navigate([this.name.default_development.name_url + '/booking' ]);
	}

	getLandlord(event:any){
		this.appComponent.loading = true
		this.unitService.getById(this.model.property , this.name.default_development.name_url)
		.subscribe(unit => {
			this.unit = unit.properties[0];
			this.model.sender = this.unit.landlord.resident.username;
		});
		this.appComponent.loading = false
	}
	
}
