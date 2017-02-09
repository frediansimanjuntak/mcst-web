import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Contract } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ContractNoticeService {
    private headers = new Headers({ 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getAll(id: string){
        return this.http.get( url + 'api/contracts_notice/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(idcontract:string , id:string){
        return this.http.get( url + 'api/contracts_notice/' + idcontract +'/'+ id , this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

   create(body:any, id:string): Promise<Contract> {
        return this.http.post(url +  'api/contracts_notice/' + id, JSON.stringify(body), this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Contract, id:string): Promise<Contract> {
        return this.http.post(url + 'api/contracts_notice/update/' + id + '/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(idcontract: string, id:string): Promise<void> {
        return this.http.delete(url + 'api/contracts_notice/' + idcontract +'/'+ id, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    publish(idcontract:string,id: string): Promise<Contract> {
        return this.http.post(url + 'api/contracts_notice/'+ idcontract + '/publish/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}