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

    getOwn(){
        return this.http.get(url + 'notifications/user', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUnread(){
        return this.http.get(url + 'notifications/user/unread', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    read(body:any): Promise<any>{
        return this.http.post(url + 'notifications/user', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    markAsRead(id:string): Promise<any>{
        return this.http.post(url + 'notifications/mark_read/' + id, '', this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    generateLink(notification: any){
        var link:string = '';
        switch (notification.ref)
            {
                case 'petition' :
                    link = '/petition/view/' + notification.ref_id;
                break;
                case 'incident' :
                    link = '/incident/view/' + notification.ref_id;
                break;
                case 'payment' :
                    link = '/payment/view/' + notification.ref_id;
                break;
                case 'contract' :
                    link = '/contract/view/' + notification.ref_id;
                break;
                case 'facility' :
                    link = '/facility/view/' + notification.ref_id;
                break;
                case 'booking' :
                    link = '/booking/view/' + notification.ref_id;
                break;
                case 'unit' :
                    link = '/unit/view/' + notification.ref_id;
                break;
                case 'lost_found' :
                    link = '/lost_found/view/' + notification.ref_id;
                break;
                case 'poll' :
                    link = '/poll/view/' + notification.ref_id;
                break;     
            }
        return link;
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