import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Development } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class DevelopmentService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    // getAll(){
    //     return this.http.get(url + 'api/developments')
    //            .toPromise()
    //            .then(response => {response.json() as Development[], console.log(response.json()) })
    //            .catch(this.handleError);
    // }

    // getById(id:number){
    //     return this.http.get(url + 'api/developments/' + id)
    //       .toPromise()
    //       .then(response => {response.json() as Development, console.log(response.json())}) 
    //       .catch(this.handleError);

    // }

    getAll(){
        return this.http.get(url + 'api/developments')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/developments/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // getByName(name:string): Promise<Development>{
    //     return this.http.get(url + 'api/developments/' + name)
    //       .toPromise()
    //       .then(response => response.json().data as Development)
    //       .catch(this.handleError);
    // }

    create(body:any): Promise<Development> {
        return this.http.post(url +  'api/developments', body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Development): Promise<Development> {
        return this.http.put(url + 'api/developments/' + body._id,body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete(url + 'api/developments/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}