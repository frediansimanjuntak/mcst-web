import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { Notification, Notifications } from '../models/index';
 
@Injectable()
export class NotificationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getNotifications(): Promise<Notification[]> {
        return Promise.resolve(Notifications);
    }

    getNotification(id: string): Promise<any> {
        return this.getNotifications()
            .then(notification => notification.find(notification => notification._id === id));
    }

    getAll(id:string){
        return this.http.get(url + 'api/notifications/user/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUnread(id:string){
        return this.http.get(url + 'api/notifications/user/' + id + '/unread')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    read(body:Notification, id:string){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post(url + 'api/notifications/user/' + id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}