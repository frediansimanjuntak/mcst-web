import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Incident, Incidents } from '../models/index';
import { url } from '../global';
import 'rxjs/add/operator/toPromise';
 
@Injectable()
export class IncidentService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getIncidents(): Promise<Incident[]> {
        return Promise.resolve(Incidents);
    }

    getIncident(id: string): Promise<Incident> {
        return this.getIncidents()
            .then(users => users.find(user => user._id === id));
    }

    getAll(){
        return this.http.get( url + 'api/incidents')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'api/incidents' + id)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

   create(body:any): Promise<Incident> {
        console.log(body);
        return this.http.post(url +  'api/incidents', JSON.stringify(body), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Incident): Promise<Incident> {
        return this.http.post(url + 'api/incidents/update/' + body._id,body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
    return this.http.delete(url + 'api/incidents/' + id, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}