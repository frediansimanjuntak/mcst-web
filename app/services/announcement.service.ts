import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { Announcement, Announcements } from '../models/index';
 
@Injectable()
export class AnnouncementService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getAnnouncements(): Promise<Announcement[]> {
        return Promise.resolve(Announcements);
    }

    getAnnouncement(id: string): Promise<any> {
        return this.getAnnouncements()
            .then(announcement => announcement.find(announcement => announcement._id === id));
    }

    getAll(){
        return this.http.get('https://192.168.10.73:3333/api/user-groups')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get('https://192.168.10.73:3333/api/user-groups' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:Announcement){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post('https://192.168.10.73:3333/api/user-groups',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:Announcement){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.put('https://192.168.10.73:3333/api/user-groups' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    // delete(id:string){
    //     let options = new RequestOptions({
    //         headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
    //     });
    //     return this.http.delete('https://192.168.10.73:3333/api/user-groups' + id, options)
    //         .map((res:Response) => res.json())
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    delete(id: string): Promise<void> {
    return this.http.delete( url + 'api/announcement/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}