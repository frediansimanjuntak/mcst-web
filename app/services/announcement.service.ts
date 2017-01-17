import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { Announcement, Announcements } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class AnnouncementService {
    token : string;
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) {
        var authToken = JSON.parse(localStorage.getItem('authToken'));
        this.token = authToken && authToken.token;
    }

    getAnnouncements(): Promise<Announcement[]> {
        return Promise.resolve(Announcements);
    }

    getAnnouncement(id: string): Promise<any> {
        return this.getAnnouncements()
            .then(announcement => announcement.find(announcement => announcement._id === id));
    }
 
    getAll(){
        return this.http.get(url + 'api/announcements', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'api/announcements/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Announcement> {
        return this.http.post(url +  'api/announcements', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any): Promise<Announcement> {
        return this.http.post(url + 'api/announcements/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/announcements/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}