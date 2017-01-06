import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class TestService {
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
        return this.http.get('https://128.199.245.43:3000/api/todos')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}