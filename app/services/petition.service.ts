import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { Petition, Petitions } from '../models/index';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PetitionService {
    private headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http, private authenticationService: AuthenticationService) {}
    

    getPetitions(): Promise<Petition[]> {
        return Promise.resolve(Petitions);
    }

    getPetition(id: string): Promise<any> {
        return this.getPetitions()
            .then(petition => petition.find(petition => petition._id === id));
    }

    getAll(){
        return this.http.get(url + 'api/petitions', this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'api/petitions' + id, this.options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:Petition): Promise<Petition> {
        return this.http.post(url + 'api/petitions',JSON.stringify(body), this.options)
             .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Petition): Promise<Petition> {
        return this.http.post(url + 'api/petitions/update/' + body._id,body, this.options)
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete( url + 'api/petitions/' + id, this.options)
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }     

    archive(id: string): Promise<void> {
        return this.http.post( url + 'api/petitions/archieve' + id, this.options)
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);
    }  

    unarchive(id: string): Promise<void> {
        return this.http.put( url + 'api/petitions/archieve' + id, this.options)
          .toPromise()
          .then(res => res.json().data)
          .catch(this.handleError);    
    }  

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}