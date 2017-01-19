import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Development, Developments } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global'
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class NewsletterService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getDevelopments(): Promise<Development[]> {
        return Promise.resolve(Developments);
    }

    getDevelopment(id: string): Promise<Development> {
    return this.getDevelopments()
               .then(developments => developments.find(development => development._id == id));
    }

    getAll(name: string){
        return this.http.get(url + 'api/newsletters/' + name, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string, name:string){
        return this.http.get( url + 'api/newsletters/' + name + '/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any, name:string): Promise<any> {
        return this.http.post(url + 'api/newsletters/' + name, JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any, name:string): Promise<any> {
        return this.http.post(url + 'api/newsletters/' + name + '/update/' + body._id ,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    release(id: string, name: string): Promise<void> {
        return this.http.post( url + 'api/newsletters/' + name + '/release/' + id, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string, name: string): Promise<void> {
        return this.http.delete( url + 'api/newsletters/' + name + '/' + id,  this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}