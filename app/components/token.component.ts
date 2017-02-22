import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/index';
import { AppComponent } from '../components/index';

@Component({
  // moduleId: module.id,
  selector: 'token',
  template: `<div></div>`,
})
export class TokenComponent implements OnInit {
    name : any;
 
    constructor(private userService: UserService, private appComponent: AppComponent, private router: Router) { }
 
    ngOnInit() {
        if(localStorage.getItem('authToken')) { 
            this.userService.getByToken()
            .subscribe(name => {
              this.name = name;
              this.appComponent.getToken()
              this.router.navigate([this.name.default_development.name_url, 'dashboard']);
            })
        } else {
            this.router.navigate(['/login']);
        }
    }
}