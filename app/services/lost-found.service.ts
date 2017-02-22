import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { LostFound, LostFounds } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class LostFoundService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getLostFounds(): Promise<LostFound[]> {
        return Promise.resolve(LostFounds);
    }

    getLostFound(id: string): Promise<any> {
        return this.getLostFounds()
            .then(lostfound => lostfound.find(lostfound => lostfound._id === id));
    }

    getAll(){
        return this.http.get(url + 'lost_found', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'lost_found/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(formData:any): Promise<any> {
        return this.http.post(`${url + 'lost_found'}`, formData, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any): Promise<LostFound> {
        return this.http.post(url + 'lost_found/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'lost_found/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    archieve(id: string): Promise<LostFound> {
        return this.http.post(url + 'lost_found/archieve/' + id, '', this.jwt())
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
            let headers = new Headers({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}