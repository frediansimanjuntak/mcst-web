import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Payment, Payments } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class PaymentService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getPayments(): Promise<Payment[]> {
        return Promise.resolve(Payments);
    }

    getPayment(id: string): Promise<Payment> {
        return this.getPayments()
            .then(payments => payments.find(payment => payment._id === id));
    }

    getAll(){
        return this.http.get(url + 'payment', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:any){
        return this.http.get(url + 'payment/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Payment> {
        return this.http.post(url +  'payment', body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any , id:string): Promise<Payment> {
        return this.http.post(url + 'payment/update/' + id, body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'payment/' + id, this.jwt())
            .toPromise()
            .then(() => null)
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