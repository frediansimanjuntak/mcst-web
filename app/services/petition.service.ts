import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { AuthenticationService } from '../services/index';
import { Petition, Petitions } from '../models/index';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PetitionService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {}
    

    getPetitions(): Promise<Petition[]> {
        return Promise.resolve(Petitions);
    }

    getPetition(id: string): Promise<any> {
        return this.getPetitions()
            .then(petition => petition.find(petition => petition._id === id));
    }

    getAll(){
        return this.http.get(url + 'petitions', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){
        return this.http.get( url + 'petitions/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(formData:any): Promise<Petition> {
        return this.http.post(`${url + 'petitions'}`, formData, this.jwt())
             .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(body:Petition): Promise<Petition> {
        return this.http.post(url + 'petitions/update/' + body._id,body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: string): Promise<void> {
        return this.http.delete( url + 'petitions/' + id, this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }     

    archive(body:any): Promise<Petition> {
        return this.http.post(url + 'petitions/archieve/' , body , this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    } 

    unarchive(id: string): Promise<void> {
        return this.http.put( url + 'petitions/archieve/' + id, this.jwt())
          .toPromise()
          .then(res => res.json().data)
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
            let headers = new Headers({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}