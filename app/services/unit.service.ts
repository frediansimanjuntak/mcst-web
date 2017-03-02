import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Development, Developments } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global'
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class UnitService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getDevelopments(): Promise<Development[]> {
        return Promise.resolve(Developments);
    }

    getDevelopment(id: string): Promise<Development> {
    return this.getDevelopments()
               .then(developments => developments.find(development => development._id == id));
    }

    getAll(name:string){
        return this.http.get( url + 'properties/' + name, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string, name:string){
        return this.http.get( url + 'properties/' + name + '/' + id,  this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTenants(id:string, name:string){
        return this.http.get( url + 'properties/' + name + '/tenant/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRegVehicles(id:string, name:string){
        return this.http.get( url + 'properties/' + name + '/register_vehicle/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any, name:string): Promise<any> {
        return this.http.post(url +  'properties/' + name, JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    createResident(body:any): Promise<any> {
        return this.http.post(url +  'users/user_tenant_landlord', JSON.stringify(body), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    createRegVehicle(body:any, name:string, id:string): Promise<any> {
        return this.http.post(url +  'properties/' + name + '/register_vehicle/' + id, body, this.jwt2())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:any, name:string): Promise<any> {
        return this.http.post(url + 'properties/' + name + '/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    generateCode(id:string, name:string, body:any): Promise<any> {
        return this.http.post(url + 'properties/' + name + '/generate_code/' + id, body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string, name: string): Promise<void> {
        return this.http.delete( url + 'properties/' + name + '/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    deleteLandlord(idUnit: string, name: string, body:any): Promise<void> {
        return this.http.put( url + 'properties/' + name + '/' + idUnit , JSON.stringify(body),this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    deleteTenant(idTenant:string, idUnit: string, name: string, body:any): Promise<void> {
        return this.http.put( url + 'properties/' + name + '/' + idUnit + '/tenant/' + idTenant, JSON.stringify(body),this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    deleteRegVehicle(idRegVehicle:string, idUnit: string, name: string): Promise<void> {
        return this.http.delete( url + 'properties/' + name + '/' + idUnit + '/register_vehicle/' + idRegVehicle, this.jwt())
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
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    private jwt2() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}