import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { url } from '../global';
import { Attachment } from '../models/index';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AttachmentService {
    public headers: Headers;
    public token: string;
    public options: RequestOptions;
    constructor(private http: Http) {}

    getAll(){
        return this.http.get(url + 'attachments', this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getById(id:string){    
        return this.http.get(url + 'attachments/' + id, this.jwt())
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(body:any, name:string): Promise<any> {
        return this.http.post(`${url + 'attachments'}`, body, this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    
    delete(id: string, name: string): Promise<void> {
        return this.http.delete( url + 'attachments/' + id,  this.jwt())
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }

    downloadPDF(link): any {
    return this.http.get(link, { responseType: ResponseContentType.Blob }).map(
        (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            }
        )
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    /*private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }*/

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('authToken'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}