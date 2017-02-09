import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global'
import { AuthenticationService } from '../services/index';
import { Contractor, Contractors } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ContractorService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getContractors(): Promise<Contractor[]> {
        return Promise.resolve(Contractors);
    }

    getContractor(id: string): Promise<any> {
        return this.getContractors()
            .then(contractor => contractor.find(contractor => contractor._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/contractors', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'api/contractors/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(formData:any): Promise<Contractor> {
        return this.http.post(`${url +  'api/contractors'}`, formData, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Contractor): Promise<Contractor> {
        return this.http.post(url + 'api/contractors/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/contractors/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    activation(id: string): Promise<void> {
        return this.http.post( url + 'api/contractors/activation/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}