import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { UserGroup, UserGroups } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class UserGroupService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getUserGroups(): Promise<UserGroup[]> {
        return Promise.resolve(UserGroups);
    }

    getUserGroup(id: string): Promise<any> {
        return this.getUserGroups()
            .then(usergroup => usergroup.find(usergroup => usergroup._id === id));
    }

    

    getAll(){
        return this.http.get(url + 'api/usergroups', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'api/usergroups/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<UserGroup> {
        return this.http.post(url +  'api/usergroups', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:UserGroup): Promise<UserGroup> {
        return this.http.post(url + 'api/usergroups/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete( url + 'api/usergroups/' + id, this.options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}