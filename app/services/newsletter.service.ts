import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Development } from '../models/index';
import { url } from '../global'
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class NewsletterService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getAll(){
        return this.http.get('https://192.168.10.38:3000/api/newsletters')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get('https://192.168.10.73:3333/api/newsletters' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post('https://192.168.10.38:3000/api/newsletters',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:Development){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.put('https://192.168.10.73:3333/api/newsletters' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: string): Promise<void> {
    return this.http.delete('https://192.168.10.38:3000/api/newsletters/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}