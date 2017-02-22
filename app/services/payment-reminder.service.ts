import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PaymentReminder, PaymentReminders } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class PaymentReminderService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getPaymentReminders(): Promise<PaymentReminder[]> {
        return Promise.resolve(PaymentReminders);
    }

    getPaymentReminder(id: string): Promise<PaymentReminder> {
        return this.getPaymentReminders()
            .then(payments => payments.find(payment => payment._id === id));
    }

    getAll(){
        return this.http.get(url + 'payment_reminder', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'payment_reminder/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<PaymentReminder> {
        return this.http.post(url +  'payment_reminder', body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:PaymentReminder): Promise<PaymentReminder> {
        return this.http.post(url + 'payment_reminder/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'payment_reminder/' + id, this.jwt())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    publish(id: string): Promise<PaymentReminder> {
        return this.http.post(url + 'payment_reminder/publish/' + id,'', this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}