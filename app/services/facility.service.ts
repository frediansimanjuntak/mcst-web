import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Facility } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class FacilityService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getAll(){
        return this.http.get(url + 'api/facilities')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/facilities/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Facility> {
        return this.http.post(url +  'api/facilities', body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Facility): Promise<Facility> {
        return this.http.post(url + 'api/facilities/update/' + body._id,body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete(url + 'api/facilities/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}