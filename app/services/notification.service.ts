import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { Notification, Notifications } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class NotificationService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getNotifications(): Promise<Notification[]> {
        return Promise.resolve(Notifications);
    }

    getNotification(id: string): Promise<any> {
        return this.getNotifications()
            .then(notification => notification.find(notification => notification._id === id));
    }

    getAll(id:string){
        return this.http.get(url + 'api/notifications/user/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUnread(id:string){
        return this.http.get(url + 'api/notifications/user/' + id + '/unread', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    read(body:any, id:string): Promise<any>{
        return this.http.post(url + 'api/notifications/user/' + id, JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}