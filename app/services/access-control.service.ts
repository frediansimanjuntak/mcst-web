import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AccessControl, AccessControls } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class AccessControlService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getAccessControls(): Promise<AccessControl[]> {
        return Promise.resolve(AccessControls);
    }

    getAccessControl(id: string): Promise<AccessControl> {
        return this.getAccessControls()
            .then(accesscontrols => accesscontrols.find(accesscontrol => accesscontrol._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/accesscontrols', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/accesscontrols/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<AccessControl> {
        console.log(body);
        return this.http.post(url +  'api/accesscontrols', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:AccessControl): Promise<AccessControl> {
        return this.http.post(url + 'api/accesscontrols/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete(url + 'api/accesscontrols/' + id, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }

}