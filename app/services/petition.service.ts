import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { Petition, Petitions } from '../models/index';
 
@Injectable()
export class PetitionService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) {}

    getPetitions(): Promise<Petition[]> {
        return Promise.resolve(Petitions);
    }

    getPetition(id: string): Promise<any> {
        return this.getPetitions()
            .then(petition => petition.find(petition => petition._id === id));
    }


    //----------------------------API----------------------------------//
    getAll(){
        return this.http.get(url + 'api/petitions')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // getById(id:string){
    //     return this.http.get( url + 'api/petitions' + id)
    //         .map((res:Response) => res.json())
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }

    create(body:Petition){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.post(url + 'api/petitions',body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(body:Petition){
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
        return this.http.put(url + 'api/petitions' + body._id,body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id: string): Promise<void> {
        return this.http.delete( url + 'api/petitions/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    archive(id: string): Promise<void> {
        return this.http.post( url + 'api/petitions/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }  

    unarchive(id: string): Promise<void> {
        return this.http.put( url + 'api/petitions/' + id, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }  

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}