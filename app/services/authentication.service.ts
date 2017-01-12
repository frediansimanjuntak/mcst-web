import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class AuthenticationService {
  public headers: Headers;
  constructor(
    public http: Http,
    private _router: Router,
    ){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
 
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }

  login(username: string, password: string) {
        
        return this.http.post('https://192.168.5.180:3000/auth/local', JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user) {
                    console.log(user, "elic");
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("user", JSON.stringify(user));
                    this._router.navigate(['user']);
                }

            }).catch(this.handleError);
    }

   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['Login']);
    }; console.log(localStorage.getItem("user"));
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  } 
}