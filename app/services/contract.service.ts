import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Contract, Contracts } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class ContractService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    
    getContracts(): Promise<Contract[]> {
        return Promise.resolve(Contracts);
    }

    getContract(id: string): Promise<Contract> {
        return this.getContracts()
            .then(contracts => contracts.find(contract => contract._id === id));
    }

    getAll(){
        return this.http.get( url + 'api/contracts')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'api/contracts/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

   create(body:any): Promise<Contract> {
        console.log(body);
        return this.http.post(url +  'api/contracts', JSON.stringify(body), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Contract): Promise<Contract> {
        return this.http.post(url + 'api/contracts/update/' + body._id,body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete(url + 'api/contracts/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}