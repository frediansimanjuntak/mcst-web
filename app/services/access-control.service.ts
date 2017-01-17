import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AccessControl, AccessControls } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class AccessControlService {
    token : string;
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) {
        var authToken = JSON.parse(localStorage.getItem('authToken'));
        this.token = authToken && authToken.token;
    }

    getAccessControls(): Promise<AccessControl[]> {
        return Promise.resolve(AccessControls);
    }

    getAccessControl(id: string): Promise<AccessControl> {
        return this.getAccessControls()
            .then(accesscontrols => accesscontrols.find(accesscontrol => accesscontrol._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/access_controls/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<AccessControl> {
        return this.http.post(url +  'api/access_controls', body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:AccessControl): Promise<AccessControl> {
        return this.http.post(url + 'api/access_controls/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/access_controls/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}