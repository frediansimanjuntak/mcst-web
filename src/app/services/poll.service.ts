import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../services/index';
import { Poll } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PollService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getAll(){
        return this.http.get(url + 'polls', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'polls/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Poll> {
        return this.http.post(url +  'polls', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Poll): Promise<Poll> {
        return this.http.post(url + 'polls/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'polls/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }


    start(id: string): Promise<void> {
        return this.http.post(url + 'polls/start_poll/' + id, '', this.jwt())
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