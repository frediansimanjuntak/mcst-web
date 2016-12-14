import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
// import { User } from '../models/index';
 
@Injectable()
export class PollService {
    constructor(private http: Http) {}
 
    // getAll() {
    //     return this.http.get('https://192.168.10.73:3333/api/users',  this.jwt()).map((response: Response) => response.json());
    // }
 
    // getById(id: number) {
    //     return this.http.get('https://192.168.10.73:3333/api/users' + id, this.jwt()).map((response: Response) => response.json());
    // }
 
    // create(user: User) {
    //     return this.http.post('https://192.168.10.73:3333/api/users', user, this.jwt()).map((response: Response) => console.log(response.json()));
    // }
 
    // update(user: User) {
    //     return this.http.put('https://192.168.10.73:3333/api/users' + user.username, user, this.jwt()).map((response: Response) => response.json());
    // }
 
    // delete(id: number) {
    //     return this.http.delete('https://192.168.10.73:3333/api/users' + id, this.jwt()).map((response: Response) => response.json());
    // }
 
    // // private helper methods
 
    // private jwt() {
    //     // create authorization header with jwt token
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}