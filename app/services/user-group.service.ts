import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { UserGroup, UserGroups } from '../models/index';
 
@Injectable()
export class UserGroupService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getUserGroups(): Promise<UserGroup[]> {
        return Promise.resolve(UserGroups);
    }

    getUserGroup(id: string): Promise<any> {
        return this.getUserGroups()
            .then(usergroup => usergroup.find(usergroup => usergroup._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/usergroups')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // getById(id:string){
    //     return this.http.get('https://192.168.10.73:3333/api/usergroups' + id)
    //         .map((res:Response) => res.json())
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    create(body:UserGroup){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post(url + 'api/usergroups',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }


    update(body:UserGroup){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post(url + 'api/usergroups' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // delete(id:string){
    //     let options = new RequestOptions({
    //         headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
    //     });
    //     return this.http.delete('https://192.168.10.73:3333/api/usergroups' + id, options)
    //         .map((res:Response) => res.json())
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    delete(id: string): Promise<void> {
    return this.http.delete( url + 'api/usergroups/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}