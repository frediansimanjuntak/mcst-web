import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../services/index';
import { Poll } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PollService {
    private headers = new Headers( {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    // getPolls(): Promise<Poll[]> {
    //     return Promise.resolve(Polls);
    // }

    // getPoll(id: string): Promise<Poll> {
    //     return this.getPolls()
    //         .then(polls => polls.find(polls => polls._id === id));
    // }

    getAll(){
        return this.http.get(url + 'api/polls', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'api/polls/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Poll> {
        return this.http.post(url +  'api/polls', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Poll): Promise<Poll> {
        return this.http.post(url + 'api/polls/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/polls/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }


    start(id: string): Promise<void> {
        return this.http.post(url + 'api/polls/start_poll/' + id, '', this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }
    

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}