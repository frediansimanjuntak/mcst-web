import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Booking, Bookings } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class BookingService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getBookings(): Promise<Booking[]> {
        return Promise.resolve(Bookings);
    }

    getBooking(id: string): Promise<Booking> {
        return this.getBookings()
            .then(bookings => bookings.find(booking => booking._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/bookings')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/bookings/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Booking> {
        return this.http.post(url +  'api/bookings', body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Booking): Promise<Booking> {
        return this.http.post(url + 'api/bookings/update/' + body._id,body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/bookings/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}