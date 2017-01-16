import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global'
import { Company, Companies } from '../models/index';
 
@Injectable()
export class CompanyService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

     getCompanies(): Promise<Company[]> {
        return Promise.resolve(Companies);
    }

    getCompany(id: string): Promise<any> {
        return this.getCompanies()
            .then(company => company.find(company => company._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/company')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'api/company/' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:Company){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post(url + 'api/company/',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:Company){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post(url + 'api/company/update/' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: string): Promise<void> {
        return this.http.delete( url + 'api/company/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    activation(id: string): Promise<void> {
        return this.http.post( url + 'api/company/activation/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}