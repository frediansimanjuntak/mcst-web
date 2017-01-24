import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { LostFound, LostFounds } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class LostFoundService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getLostFounds(): Promise<LostFound[]> {
        return Promise.resolve(LostFounds);
    }

    getLostFound(id: string): Promise<any> {
        return this.getLostFounds()
            .then(lostfound => lostfound.find(lostfound => lostfound._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/lost_found', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'api/lost_found/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<any> {
        return this.http.post(url +  'api/lost_found', body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any): Promise<LostFound> {
        return this.http.post(url + 'api/lost_found/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/lost_found/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    archieve(id: string): Promise<LostFound> {
        console.log(this.options);
        return this.http.post(url + 'api/lost_found/archieve/' + id, '', this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}