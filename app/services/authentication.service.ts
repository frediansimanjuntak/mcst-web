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
    constructor(private http: Http,private _router: Router) {
        // set token if saved in local storage
        var authToken = JSON.parse(localStorage.getItem('authToken'));
        this.token = authToken && authToken.token;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }
 
    logout() {
        localStorage.removeItem("authToken");
        this._router.navigate(['login']);
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(url + 'auth/local', JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('authToken', JSON.stringify({ username: username, token: token }));
                    this._router.navigate(['/user']);
                    return true;
                } else {
                    return false;
                }
            });
    }

    checkCredentials(){
        if (localStorage.getItem("authToken") === null){
            this._router.navigate(['Login']);
        };
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    } 
}