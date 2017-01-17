import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Payment, Payments } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class PaymentService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getPayments(): Promise<Payment[]> {
        return Promise.resolve(Payments);
    }

    getPayment(id: string): Promise<Payment> {
        return this.getPayments()
            .then(payments => payments.find(payment => payment._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/payments', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/payments/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Payment> {
        console.log(body);
        return this.http.post(url +  'api/payments', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Payment): Promise<Payment> {
        return this.http.post(url + 'api/payments/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete(url + 'api/payments/' + id, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}