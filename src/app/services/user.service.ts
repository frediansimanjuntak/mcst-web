import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User, Users } from '../models/index';
import { AuthenticationService } from '../services/index';
import { NotificationsService } from 'angular2-notifications';
import { url } from '../global';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class UserService {
    constructor(private http: Http, private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationsService) {}

    getUsers(): Promise<User[]> {
        return Promise.resolve(Users);
    }

    getUser(id: string): Promise<User> {
        return this.getUsers()
            .then(users => users.find(user => user._id === id));
    }

    getAll(){
        return this.http.get(url + 'users', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'users/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getByToken(){    
        return this.http.get(url + 'me', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error || 'Server error'));
    }

    createResident(body:any): Promise<User> {
        return this.http.post(url +  'sign_up', body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    createStaff(body:any): Promise<User> {
        return this.http.post(url +  'users/super_admin' , body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    createUser(body:any): Promise<User> {
        return this.http.post(url +  'users' , body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:User): Promise<User> {
        return this.http.post(url + 'users/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string, body: any): Promise<void> {
        return this.http.put(url + 'users/' + id, body, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    checkError(code: number, message: string){
        if (code == 412) {
            this.router.navigate(['/login']);
        } else if (code == 411) {
           this.router.navigate(['/login']);
        } else if (code == 0) {
            this.notificationService.error('Connection error', 'Please check your connection and try again later')
        } else {
            this.notificationService.error('Error', message)
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}