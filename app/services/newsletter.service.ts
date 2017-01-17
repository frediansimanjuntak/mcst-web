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

    getAll(id: string){
        return this.http.get(url + 'api/newsletters/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string, id_dev:string){
        return this.http.get( url + 'api/newsletters/' + id_dev + '/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // create(body:any, id_dev:string){
    //     return this.http.post( url + 'api/newsletters/' + id_dev,body, this.options)
    //         .map((res:Response) => res.json())
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    create(body:any, id_dev:string): Promise<any> {
        return this.http.post(url + 'api/newsletters/' + id_dev, JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any, id_dev:string): Promise<any> {
        return this.http.post(url + 'api/newsletters/' + id_dev + '/update/' + body._id ,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    release(id: string, id_dev: string): Promise<void> {
        return this.http.post( url + 'api/newsletters/' + id_dev + '/release/' + id, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string, id_dev: string): Promise<void> {
        return this.http.delete( url + 'api/newsletters/' + id_dev + '/' + id,  this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}