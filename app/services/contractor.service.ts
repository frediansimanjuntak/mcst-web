import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global'
import { Contractor, Contractors } from '../models/index';
 
@Injectable()
export class ContractorService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getContractors(): Promise<Contractor[]> {
        return Promise.resolve(Contractors);
    }

    getContractor(id: string): Promise<any> {
        return this.getContractors()
            .then(contractor => contractor.find(contractor => contractor._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/contractors')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/contractors' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:Contractor){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post('https://192.168.10.73:3333/api/contractors',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:Contractor){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.put(url + 'api/contractors' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: string): Promise<void> {
        return this.http.delete( url + 'api/contractors/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    activation(id: string): Promise<void> {
        return this.http.post( url + 'api/contractors/activation/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}