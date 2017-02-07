import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { PaymentReminder, PaymentReminders } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class PaymentReminderService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getPaymentReminders(): Promise<PaymentReminder[]> {
        return Promise.resolve(PaymentReminders);
    }

    getPaymentReminder(id: string): Promise<PaymentReminder> {
        return this.getPaymentReminders()
            .then(payments => payments.find(payment => payment._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/payment_reminder', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/payment_reminder/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<PaymentReminder> {
        return this.http.post(url +  'api/payment_reminder', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:PaymentReminder): Promise<PaymentReminder> {
        return this.http.post(url + 'api/payment_reminder/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/payment_reminder/' + id, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    publish(id: string): Promise<PaymentReminder> {
        return this.http.post(url + 'api/payment_reminder/publish/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}