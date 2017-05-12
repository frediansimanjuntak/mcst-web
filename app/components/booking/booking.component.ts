import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe  } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Booking, Facility } from '../../models/index';
import { BookingService, AlertService, FacilityService, UserService, UnitService, PaymentService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

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
		private appComponent: AppComponent,
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
				this.paymentService.getById(this.booking.payment)
				.subscribe(payment => {
					this.user = payment.sender;
					setTimeout(() => this.appComponent.loading = false, 1000);
				})
			});
		}
	}
 
	deleteBooking(booking: Booking) {
		this.appComponent.loading = true
		this.bookingService.delete(booking._id)
			.then(
					data => {
						this._notificationsService.success(
								'Success',
								'Delete booking successful',
						)
						this.ngOnInit();
					},
					error => {
						console.log(error);
						this._notificationsService.error(
								'Error',
								'The Booking could not be deleted, server Error',
						)
						setTimeout(() => this.appComponent.loading = false, 1000);
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
        this.appComponent.loading=true;
		this.bookings  = this.all.filter(data => data.reference_no.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1);
		this.selectedDay = this.bookings;
		this.filtered = this.bookings;
		setTimeout(() => this.appComponent.loading = false, 1000);
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
					this.all = bookings
					this.bookings = bookings;
					for (var i = 0; i < this.all.length; ++i) {
						let a = this.units.find(data => data._id == this.all[i].property);
						if (a && a != undefined) {
							this.all[i].unit = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
						}
					}
					for (var i = 0; i < this.bookings.length; ++i) {
						let a = this.units.find(data => data._id == this.bookings[i].property);
						if (a && a != undefined) {
							this.bookings[i].unit = '#'+a.address.unit_no +'-'+ a.address.unit_no_2;
						}
					}
					this.selectedDay = this.bookings.filter(data => moment(data.booking_date).format('YYYY-MM-DD') == this.day);
					setTimeout(() => this.appComponent.loading = false, 1000);
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
		this.appComponent.loading = true
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
			setTimeout(() => this.appComponent.loading = false, 1000);
		};
		if(booking.status != "all") {
			this.filtered = this.bookings.filter(data => 
				data.booking_date.slice(0,10) == this.day &&
				data.start_time >= start && 
				data.end_time <= end &&
				data.facility.name == booking.name &&
				data.status == booking.status
			);
			setTimeout(() => this.appComponent.loading = false, 1000);
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
		this.appComponent.loading = true
		this.day     = new Date(this.dt.getTime());
		this.day     = this.convertDate(this.day);
		this.ngOnInit();
	}

	viewPayment(payment: any){
        this.router.navigate([this.name.default_development.name_url + '/payment_system/view', payment]);
    }
}
