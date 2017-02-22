import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Contract } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ContractNoteService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getAll(id: string){
        return this.http.get( url + 'contract_note/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(idcontract:string , id:string){
        return this.http.get( url + 'contract_note/' + idcontract +'/'+ id , this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

   create(body:any, id:string): Promise<Contract> {
        return this.http.post(url +  'contract_note/' + id, body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Contract, id:string): Promise<Contract> {
        return this.http.post(url + 'contract_note/update/' + id + '/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(idcontract: string, id:string): Promise<void> {
        return this.http.delete(url + 'contract_note/' + idcontract +'/'+ id, this.jwt())
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}