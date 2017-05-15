import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Feedback, Feedbacks } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class FeedbackService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getFeedbacks(): Promise<Feedback[]> {
        return Promise.resolve(Feedbacks);
    }

    getFeedback(id: string): Promise<Feedback> {
        return this.getFeedbacks()
            .then(users => users.find(user => user._id === id));
    }

    getAll(){
        return this.http.get( url + 'feedback', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'feedback' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Feedback> {
        return this.http.post(url +  'feedback', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    reply(body:Feedback): Promise<Feedback> {
        return this.http.post(url + 'feedback/reply/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'feedbacks/' + id, this.jwt())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    archieve(id: string): Promise<Feedback> {
        return this.http.post(url + 'feedback/archieve/' + id,'', this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    publish(id: string): Promise<Feedback> {
        return this.http.post(url + 'feedback/publish/' + id,'', this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    unarchieve(id: string): Promise<Feedback> {
        return this.http.put(url + 'feedback/archieve/' + id,'', this.jwt())
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
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}