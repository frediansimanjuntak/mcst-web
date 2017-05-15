import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { UserGroup, UserGroups } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class UserGroupService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getUserGroups(): Promise<UserGroup[]> {
        return Promise.resolve(UserGroups);
    }

    getUserGroup(id: string): Promise<any> {
        return this.getUserGroups()
            .then(usergroup => usergroup.find(usergroup => usergroup._id === id));
    }

    

    getAll(){
        return this.http.get(url + 'user_groups', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'user_groups/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<UserGroup> {
        return this.http.post(url +  'user_groups', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:UserGroup): Promise<UserGroup> {
        return this.http.post(url + 'user_groups/update/' + body._id, body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete( url + 'user_groups/' + id, this.jwt())
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