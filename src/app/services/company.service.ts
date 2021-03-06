import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global'
import { AuthenticationService } from '../services/index';
import { Company, Companies } from '../models/index';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class CompanyService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

     getCompanies(): Promise<Company[]> {
        return Promise.resolve(Companies);
    }

    getCompany(id: string): Promise<any> {
        return this.getCompanies()
            .then(company => company.find(company => company._id === id));
    }

    getAll(){
        return this.http.get(url + 'company', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get(url + 'company/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any): Promise<Company> {
        return this.http.post(url +  'company', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Company): Promise<Company> {
        return this.http.post(url + 'company/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'company/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    activation(id: string): Promise<void> {
        return this.http.post( url + 'company/activation/' + id, this.jwt())
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
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}