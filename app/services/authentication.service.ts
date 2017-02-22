import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/catch';
import { url } from '../global';
 
@Injectable()
export class AuthenticationService {
    public headers: Headers;
    public token: string;
    constructor(private http: Http,private _router: Router) {}
 
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('authToken');
        this._router.navigate(['/']);
    }
    
    login(username: string, password: string): Observable<void> {
        return this.http.post('https://192.168.5.55:5000/' + 'auth/local', { username: username, password: password })
            .map((response: Response) => {
                 // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('authToken', JSON.stringify(user));
                }
            });
    }
}