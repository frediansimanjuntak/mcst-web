import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe  } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking, Facility } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService, UnitService, PaymentService } from '../../services/index';

import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  // moduleId: module.id,
  selector: 'booking',
  templateUrl: '../../templates/booking.html',
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
	loading: boolean = true
	booking: Booking;
	bookings: any[] = [];
	facilities: Facility[] = [];
	myForm: FormGroup;
	model: any = {}; 
	id: string;
	units: any[];
	all: any[] = [];
	unit: any;
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
	facility: any;
	type: any;
	status: any;
	period1: any;
	period2: any;
	user:any;
	dataFilter: string = '';

	constructor(
		private router: Router,
		private facilityService: FacilityService,
		private bookingService: BookingService,
		private alertService: AlertService,
		private formbuilder: FormBuilder,
		private route: ActivatedRoute,
		private userService: UserService,
		
		private unitService: UnitService,
		private confirmationService: ConfirmationService,
		private paymentService: PaymentService,
		private _notificationsService: NotificationsService,){}

	ngOnInit() {
		this.userService.getByToken().subscribe(name => {this.name = name.user;})
		this.myForm = this.formbuilder.group({
			name : [''],
			status : ['all'],
			start : [0],
			end : [23]
		})
		this.facilityService.getAll()
		.subscribe(facilities => { 
			this.facilities = facilities;
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
		}
		if( this.id != null) {
		   this.bookingService.getById(this.id)
			.subscribe(booking => {
				this.booking = booking;
				setTimeout(() => this.loading = false, 1000);
			});
		}
	}
 
	deleteBooking(booking: Booking) {
		this.loading = true
		this.bookingService.delete(booking._id)
		.then(
			data => {
				this._notificationsService.success('Success', 'Delete booking successful')
				this.ngOnInit();
			},
			error => {
				this.userService.checkError(error.json().code)
				this._notificationsService.error('Error', error.json().message)
				setTimeout(() => this.loading = false, 1000);
			}
		);
	}

	deleteConfirmation(booking) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to delete this booking?',
			header: 'Delete Confirmation',
			icon: 'fa fa-trash',
			accept: () => {
				this.deleteBooking(booking)
			}
		});
	}

	filterRefno(){
        this.loading=true;
		this.bookings  = this.all.filter(data => data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);
		this.selectedDay = this.bookings;
		this.filtered = this.bookings;
		setTimeout(() => this.loading = false, 1000);
    }

	private loadAllBookings() {
		this.day     = new Date(this.dt.getTime());
		this.day     = this.convertDate(this.day);
		this.userService.getByToken()
		.subscribe(name => {
			this.name = name.user;
			this.unitService.getAll(this.name.default_development.name_url)
			.subscribe(units => {
				this.units = units.properties;
				this.bookingService.getAll()
				.subscribe(bookings => {
					for (var i = 0; i < bookings.length; ++i) {
						if (bookings[i].start_time.length < 5 ) {
							bookings[i].start_time = moment(bookings[i].start_time, 'H:mm').format('HH:mm')
						}else{
							bookings[i].start_time = moment(bookings[i].start_time, 'HH:mm').format('HH:mm')
						}
						let a = this.units.find(data => data._id == bookings[i].property);
						if (a && a != undefined && a != null) {
							bookings[i].unit = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
						}
					}
					this.all = bookings
					this.bookings = bookings;
					this.selectedDay = this.bookings.filter(data => data.booking_date.slice(0,10) == this.day);
					setTimeout(() => this.loading = false, 1000);
				})
			})
		});
	}

	add(){
		this.router.navigate([this.name.default_development.name_url + '/booking/add']);
	}

	goBack(){
		this.router.navigate([this.name.default_development.name_url + '/booking']);
	}

	view(booking: Booking){
		this.router.navigate([this.name.default_development.name_url + '/booking/view', booking._id]);
	}

	filter(booking: any){
		this.loading = true
		this.facility = booking.name;
		this.type = booking.type;
		this.status = booking.status;
		this.day  = new Date(this.dt.getTime());
		this.day  = this.convertDate(this.day);
		var start = booking.start.toString() + ":00"
		var end   = booking.end.toString() + ":00"
		this.period1 = start;
		this.period2 = end;
		if(booking.status == "all") {
			this.filtered = this.bookings.filter(data => 
				data.booking_date.slice(0,10) == this.day &&
				data.start_time >= start && 
				data.end_time <= end &&
				data.facility.name == booking.name 
			);
			setTimeout(() => this.loading = false, 1000);
		};
		if(booking.status != "all") {
			this.filtered = this.bookings.filter(data => 
				data.booking_date.slice(0,10) == this.day &&
				data.start_time >= start && 
				data.end_time <= end &&
				data.facility.name == booking.name &&
				data.status == booking.status
			);
			setTimeout(() => this.loading = false, 1000);
		}
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
		this.loading = true
		this.day     = new Date(this.dt.getTime());
		this.day     = this.convertDate(this.day);
		this.ngOnInit();
	}

	viewPayment(payment: any){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/view', payment._id]);
    }
}
