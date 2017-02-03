import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Feedback, Feedbacks } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class FeedbackService {
    private headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getFeedbacks(): Promise<Feedback[]> {
        return Promise.resolve(Feedbacks);
    }

    getFeedback(id: string): Promise<Feedback> {
        return this.getFeedbacks()
            .then(users => users.find(user => user._id === id));
    }

    getAll(){
        return this.http.get( url + 'api/feedback', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'api/feedback' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Feedback> {
        console.log(body);
        return this.http.post(url +  'api/feedback', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    reply(body:Feedback): Promise<Feedback> {
        return this.http.post(url + 'api/feedback/reply/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/feedbacks/' + id, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    archieve(id: string): Promise<Feedback> {
        return this.http.post(url + 'api/feedback/achieve/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    publish(id: string): Promise<Feedback> {
        return this.http.post(url + 'api/feedback/publish/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    unarchieve(id: string): Promise<Feedback> {
        return this.http.put(url + 'api/feedback/achieve/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }
}