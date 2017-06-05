import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Booking, Facility, Bookings } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService, UnitService, PaymentService } from '../../services/index';

import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';

var moment = require('moment');
export var Binformation: any[] = [];
import  * as _  from "underscore";

@Component({
  // moduleId: module.id,
  selector: 'edit-booking',
  templateUrl: '../../templates/edit-booking.html',
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
	#booking-system ul.steps.steps-5 {
	    width: 40%;
	    float: left;
	    margin: 0;
	}
	#booking-system .abc {
	    width: 100% !important;
	}

  `]
})

export class EditBookingComponent implements OnInit  { 
	public dt: Date = new Date();
	public minDate: Date = void 0;
	private opened: boolean = false;
	loading: boolean = true
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
	selectedValues: number[] = [];
	times_start : any[] = [];
	times_end : any[] = [];
	period : any[] = [];
	tstart : any[] = [];
	tend : any[] = [];
	timeStart : any[] = [];
	timeEnd : any[] = [];
	timings: any[] = [];
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
	customClass: any[] = [];
	unavailableDay: any[] = [];
	availableDay: any[] = [];
	valid: boolean;


	constructor(
		private router: Router,
		private bookingService: BookingService,
		private facilityService: FacilityService,
		private alertService: AlertService,
		private formbuilder: FormBuilder,
		private route: ActivatedRoute,
		private userService: UserService,
		private unitService: UnitService,
		
		private _notificationsService: NotificationsService,
		private ref: ChangeDetectorRef,
		private paymentService: PaymentService){
		(this.minDate = new Date()).setDate(this.minDate.getDate());
	}

	ngOnInit() {
		this.model.payment_proof = []
		this.selectedFacility = [];
		let booking_date;
		booking_date     = new Date(this.dt.getTime());
		booking_date     = this.convertDate1(booking_date);
		this.model.booking_date = booking_date
		let date;
		date     = new Date(this.dt.getTime());
		date     = this.convertDate(date);
		this.model.date = date
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
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
			}
			for (let z = 0; z < this.facilities.length; ++z) {
				for (let x = 0; x < this.facilities[z].schedule.length; ++x) {
					var days = this.availableDay.indexOf(this.facilities[z].schedule[x].day.charAt(0).toUpperCase() + this.facilities[z].schedule[x].day.slice(1));
					if(days == -1) {
						this.availableDay.push(this.facilities[z].schedule[x].day.charAt(0).toUpperCase() + this.facilities[z].schedule[x].day.slice(1));
					}
				}
			}
			this.unavailableDay = ['Monday', 'Tuesday', 'Wednesday', 'thursday', 'Friday', 'Saturday', 'Sunday',];
			this.unavailableDay = _.difference(this.unavailableDay, this.availableDay);
			let no = 0
			while(no < 100){
				for (let y = 0; y < this.unavailableDay.length; ++y) {
					let selectedDate;
					selectedDate = new Date(this.dt.getTime());
					selectedDate = moment(selectedDate).add(no,'y')
					var monday = moment(selectedDate)
						.startOf('year')
						.day(this.unavailableDay[y]);
					if (monday.date() > 7) monday.add(7,'d');
					var year = monday.year();
					while(year === monday.year()){
						// document.body.innerHTML += "<p>"+monday.toString()+"</p>";
						var day = new Date(monday.toString());
						var dayWrapper = moment(day);
						this.customClass.push({
							date: dayWrapper,
							mode: 'day',
							clazz: 'btn-empty'
						})
						monday.add(7,'d');
					}
				}
				no = no + 1;
			}
		});
		this.userService.getByToken()
		.subscribe(name => {
			this.name = name.user;
			this.unitService.getAll(this.name.default_development.name_url)
			.subscribe(units => {
				this.units = units.properties;
				this.units = this.units.filter(data => data.landlord.data && 
					data.landlord.data.resident ? data.landlord.data.resident : false &&  
					data.landlord.data.resident != null && 
					data.tenant.data && 
					data.tenant.data.length > 0 )
				setTimeout(() => this.loading = false, 1000);
			})
		})
	}

	private loadAllBookings() {
		this.bookingService.getAll()
		.subscribe(bookings => { 
			this.bookings = bookings; 
			setTimeout(() => this.loading = false, 1000);
		});
	}

	createBooking() { 
		this.loading = true
		let formData:FormData = new FormData();
		if(this.model.payment_proof.length > 0) {
			for (var i = 0; i < this.model.payment_proof.length; i++) {
				formData.append("payment_proof[]", this.model.payment_proof[i]);
			}
		}
		formData.append("total_amount", this.model.total_amount);
		formData.append("start_time", this.model.start_time);
		formData.append("end_time", this.model.end_time);
		formData.append("name", this.model.name);
		formData.append("fees.deposit_fee", this.model.fees[0].deposit_fee);
		formData.append("fees.booking_fee", this.model.fees[0].booking_fee);
		formData.append("fees.admin_fee", this.model.fees[0].admin_fee);
		formData.append("booking_date", this.model.booking_date);
		formData.append("payment_method", this.model.payment_method);
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
				if (error.json().message) {
                    if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this._notificationsService.error("Error", error.json().message)    
                    }
                    
                }else{
                    this.userService.checkError(error.status, '')
                } 
				this.loading = false
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
		this.loading = true
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
			this.loading = false
		}, error => {
			if (error.json().message) {
                if (error.json().code) {
                    this.userService.checkError(error.json().code, error.json().message)
                }else{
                    this._notificationsService.error("Error", error.json().message)    
                }
                
            }else{
                this.userService.checkError(error.status, '')
            } 
            this.loading = false
        });
	}

	startTime(start){
		this.loading = true
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
			this.loading = false
		}, error => {
			if (error.json().message) {
                if (error.json().code) {
                    this.userService.checkError(error.json().code, error.json().message)
                }else{
                    this._notificationsService.error("Error", error.json().message)    
                }
                
            }else{
                this.userService.checkError(error.status, '')
            } 
            this.loading = false
        });
	}

	filter(){
		this.loading = true
		this.timings = [];
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
		 this.bookingService.getAll()
		.subscribe(bookings => {
			this.bookings = bookings
			this.facilityService.getById(this.model.facility)
			.subscribe(facility => {
				this.facility = facility;
				this.facility_name = facility.name;
				this.model.deposit_fee = facility.fee.deposit;
				this.model.booking_fee = facility.fee.booking;
				this.model.admin_fee = facility.fee.admin;
				this.timeStart = [];
				this.timeEnd = [];
				this.filtered = this.facility.schedule.filter(facility => 
					facility.start_time <= start && 
					facility.end_time >= end
				);
				if (this.filtered.length > 0) {   
					this.min =    ":00"
					for (var i = this.model.start; i < this.model.end; ++i) {
						this.timeStart.push(i+this.min)
					}
					let timestart = this.model.start;
					while(timestart < this.model.end){       
						timestart += 1;
						this.timeEnd.push(timestart)
					}
				}
				let booking_date;
				booking_date     = new Date(this.dt.getTime());
				booking_date     = this.convertDate1(booking_date);
				for (let z = 0; z < this.timeStart.length; ++z) {
					let hours = this.durationMinutes(this.timeStart[z], this.timeEnd[z])
					console.log(hours)
					if(hours < 0) {
			    		hours = Math.abs(hours);
					}
					for(let i = 0; i < hours; i++) {
						let add30Min = i * 60;
					    let timeAdded = moment(this.timeStart[z], 'HH:mm').add(add30Min, 'minutes').format('HH:mm');
					    let timeAdded2 = moment(this.timeEnd[z], 'HH:mm').add(add30Min, 'minutes').format('HH:mm');
					    let booking = this.bookings.filter(data => moment(data.booking_date).format('YYYY-MM-DD') == booking_date && data.facility._id == this.model.facility && data.start_time < timeAdded2 && data.end_time > timeAdded)
					    let time_hour = moment().format('HH');
					    let time_minute = moment().format('mm');
					    let date = moment().format("dddd, DD-MM-YYYY");
					    let timeAdded_hour = moment(timeAdded, 'HH:mm').format('HH');
					    let timeAdded_minute = moment(timeAdded, 'HH:mm').format('mm');
					    if (booking !== null && booking !== [] && booking.length > 0) {
					    	this.pushTime('Unavailable', timeAdded, timeAdded2, this.timings);
					    }else {
					    	if (date == this.date) {
					    		if (+time_hour > +timeAdded_hour) {
						    		this.pushTime('Unavailable', timeAdded, timeAdded2, this.timings);
						    	}else if (+time_hour == +timeAdded_hour) {
						    		if (+time_minute > +timeAdded_minute) {
						    			this.pushTime('Unavailable', timeAdded, timeAdded2, this.timings);
						    		}else{
						    			this.pushTime(null, timeAdded, timeAdded2, this.timings);
						    		}
						    	}else{
						    		this.pushTime(null, timeAdded, timeAdded2, this.timings);
						    	}
					    	}else{
					    		this.pushTime(null, timeAdded, timeAdded2, this.timings);
					    	}
					    	
					    }
					}
				}
				setTimeout(() => this.loading = false, 1000);
			});
		});
	}

	durationMinutes(time_from: any, time_to: any) {
		let mFrom = moment(time_from, 'HH:mm');
		let mTo = moment(time_to, 'HH:mm');
		let diff = mTo.diff(mFrom, 'minutes');
		return diff / 60;
	}

	pushTime(status: any, time: any, time2:any, array: any) {
	  	if(status) {
	  		array.push({time: time, time2: time2, status:"Not Available"});
	  	} else {
	    	array.push({time: time, time2: time2, status:"Available"});
	  	}
	}

	public getSelected(timing:any, name:any){
		let start = timing.time.toString().slice(0,2)
		let end = timing.time2.toString().slice(0,2)
		if(this.tstart.length < 1) {
			this.tstart.push(start)
			this.tend.push(end)
			this.valid = true
		}else{
			var i = this.tstart.indexOf(start);
			if(i != -1) {
				this.tstart.splice(i, 1);
				this.valid = false
			}else{
				this.tstart.push(start)
				this.valid = true
			}
			var i = this.tend.indexOf(end);
			if(i != -1) {
				this.tend.splice(i, 1);
				this.valid = false
			}else{
				this.tend.push(end)
				this.valid = true
			}
		}
		var time_start = Math.min.apply(Math,this.tstart);
		var time_end = Math.max.apply(Math,this.tend);
		console.log(time_start , time_end)
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
		this.model.start_time = moment(time_start, 'h').format('HH:mm');
		this.model.end_time = moment(time_end, 'h').format('HH:mm');
		this.model.name = name;
		console.log(this.model)
	}

	public selectedDate(date:any) {  
		this.loading = true
		this.day = this.days[this.dt.getDay()];
		this.filtered = null;
		this.ngOnInit()
	}

	next(){ 
		this.loading = true
		if (this.model.total_amount && this.model.start_time && this.model.end_time) {
			if (this.valid) {
				this.step = 2;
			} else {
				this._notificationsService.error('Failed','Please choose booking time before go to next step.')
			}	
		} else {
			this._notificationsService.error('Failed','Please choose booking time before go to next step.')
		}
		setTimeout(() => this.loading = false, 1000);
			
	}

	change(){
		this.loading = true
		this.step = 1
		this.selectedValues = []
		this.model = {};
		this.filtered = null
		this.selectedFacility = [];
		this.tstart = [];
		this.tend = [];
		this.ngOnInit()
		setTimeout(() => this.loading = false, 1000);
	}

	onChange(event: any) {
	   let files = [].slice.call(event.target.files);
	    for (let z = 0; z < files.length; ++z) {
		   	if (!files[z].type.includes("image")) {
		   		this._notificationsService.error('Error', 'Please upload image only!.')
			  	this.model.payment_proof = [];
			  	break;
		   	}else{
				this.model.payment_proof = files;
		   	}
	   	}
	}
	
	remove(i: any){ 
		this.model.payment_proof.splice(i, 1)
	}

	cancel(){
		this.router.navigate([this.name.default_development.name_url + '/booking' ]);
	}

	getLandlord(event:any){
		this.loading = true
		this.unitService.getById(this.model.property , this.name.default_development.name_url)
		.subscribe(unit => {
			this.unit = unit.properties[0];
			if(this.unit.landlord.data) {
				this.model.sender = this.unit.landlord.data.resident._id;
				this.model.sender_name = this.unit.landlord.data.resident.username;
			}else{
				this.model.sender = this.unit.tenant.data[0].resident._id;
				this.model.sender_name = this.unit.tenant.data[0].resident.username;
			}
			setTimeout(() => this.loading = false, 1000);
		},error => {
			if (error.json().message) {
                if (error.json().code) {
                    this.userService.checkError(error.json().code, error.json().message)
                }else{
                    this._notificationsService.error("Error", error.json().message)    
                }
                
            }else{
                this.userService.checkError(error.status, '')
            } 
            this.loading = false
        });
	}
	
}
