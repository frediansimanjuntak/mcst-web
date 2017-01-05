import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Booking } from '../../models/index';
import { BookingService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'development',
  templateUrl: '/app/templates/booking.html',
})

export class BookingComponent implements OnInit {
	booking: Booking;
    bookings: Booking[] = [];
    model: any = {}; 
	
	constructor(private router: Router,private bookingService: BookingService,private alertService: AlertService) {}

	ngOnInit() {
        this.loadAllDevelopments();      
    }
 
    deleteBooking(booking: Booking) {
        this.bookingService.delete(booking._id) 
        .then(
			response => {
				if(response) { 
	                alert(`The booking could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete booking successful', true);
	                this.loadAllDevelopments()
	            }
            },
            error=> { 
                alert(`The Development could not be deleted, server Error.`);
            }
        );
    }
   
    private loadAllDevelopments() {
        this.bookingService.getBookings().then(bookings => { this.bookings = bookings; });
    }

    add(){
        this.router.navigate(['/booking/add']);
    }

    view(booking: Booking){
        this.router.navigate(['/booking/edit', booking._id]);
    }
}
