import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Company } from '../models/index';
 
@Injectable()
export class CompanyService {
    constructor(private http: Http) {}

    getAll(){
        return this.http.get('https://192.168.10.73:3333/api/companies')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get('https://192.168.10.73:3333/api/companies' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:Company){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post('https://192.168.10.73:3333/api/companies',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:Company){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.put('https://192.168.10.73:3333/api/companies' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id:string){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.delete('https://192.168.10.73:3333/api/companies' + id, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}