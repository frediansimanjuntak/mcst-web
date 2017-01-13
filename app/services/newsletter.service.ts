import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Development, Developments } from '../models/index';
import { url } from '../global'
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class NewsletterService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}


    getDevelopments(): Promise<Development[]> {
        return Promise.resolve(Developments);
    }


    getDevelopment(id: string): Promise<Development> {
    return this.getDevelopments()
               .then(developments => developments.find(development => development._id == id));
    }

    getAll(){
        return this.http.get(url + 'api/developments')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'api/newsletters' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post( url + 'api/newsletters/' + '585b36585d3cc41224fe518a',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:any){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.put( url + 'api/newsletters' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    release(id: string, id_dev: string): Promise<void> {
        return this.http.post( url + 'api/newsletters/' + id_dev + '/release/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    delete(id: string, id_dev: string): Promise<void> {
        return this.http.delete( url + 'api/newsletters/' + id_dev + '/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}