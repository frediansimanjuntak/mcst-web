import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { Notification, Notifications } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class NotificationService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getNotifications(): Promise<Notification[]> {
        return Promise.resolve(Notifications);
    }

    getNotification(id: string): Promise<any> {
        return this.getNotifications()
            .then(notification => notification.find(notification => notification._id === id));
    }

    getAll(id:string){
        return this.http.get(url + 'notifications/user/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUnread(id:string){
        return this.http.get(url + 'notifications/user/' + id + '/unread', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    read(body:any, id:string): Promise<any>{
        return this.http.post(url + 'notifications/user/' + id, JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
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