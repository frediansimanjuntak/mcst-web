import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Incident, Incidents } from '../models/index';
import { AuthenticationService } from '../services/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class IncidentService {
    private headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}

    getIncidents(): Promise<Incident[]> {
        return Promise.resolve(Incidents);
    }

    getIncident(id: string): Promise<Incident> {
        return this.getIncidents()
            .then(users => users.find(user => user._id === id));
    }

    getAll(){
        return this.http.get( url + 'api/incidents', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'api/incidents/' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

   create(body:any): Promise<any> {
        return this.http.post(`${url + 'api/incidents'}`, body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Incident): Promise<Incident> {
        return this.http.post(url + 'api/incidents/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete(url + 'api/incidents/' + id, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    starred(id: string): Promise<Incident> {
        return this.http.post(url + 'api/incidents/starred/' + id, '', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    unstarred(id: string): Promise<Incident> {
        return this.http.put(url + 'api/incidents/starred/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    archieve(id: string): Promise<Incident> {
        return this.http.post(url + 'api/incidents/archieve/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    unarchieve(id: string): Promise<Incident> {
        return this.http.put(url + 'api/incidents/archieve/' + id,'', this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }
}