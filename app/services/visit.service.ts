import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { Visit, Visits } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class VisitService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getVisits(): Promise<Visit[]> {
        return Promise.resolve(Visits);
    }

    getVisit(id: string): Promise<any> {
        return this.getVisits()
            .then(visit => visit.find(visit => visit._id === id));
    }

    getAll(){
        return this.http.get(url + 'guest_registrations', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'guest_registrations/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Visit> {
        return this.http.post(url +  'guest_registrations', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any): Promise<Visit> {
        return this.http.post(url + 'guest_registrations/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    checkIn(id: string): Promise<any> {
        return this.http.post(url + 'guest_registrations/checkin/' + id, '',this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    checkOut(id: string): Promise<any> {
        return this.http.post(url + 'guest_registrations/checkout/' + id, '', this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'guest_registrations/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}