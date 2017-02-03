import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global'
import { AuthenticationService } from '../services/index';
import { Contractor, Contractors } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ContractorService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getContractors(): Promise<Contractor[]> {
        return Promise.resolve(Contractors);
    }

    getContractor(id: string): Promise<any> {
        return this.getContractors()
            .then(contractor => contractor.find(contractor => contractor._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/contractors', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'api/contractors/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Contractor> {
        return this.http.post(url +  'api/contractors', JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Contractor): Promise<Contractor> {
        return this.http.post(url + 'api/contractors/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/contractors/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    activation(id: string): Promise<void> {
        return this.http.post( url + 'api/contractors/activation/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}