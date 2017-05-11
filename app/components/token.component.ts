import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/index';
import { AppComponent } from '../components/index';

@Component({
  // moduleId: module.id,
  selector: 'token',
  template: `<div class="se-pre-con"></div>`,
  styles: [ `.no-js #loader {
      display: none;
    }

    .js #loader {
      display: block;
      position: absolute;
      left: 100px;
      top: 0;
    }

    .se-pre-con {
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: url(assets/image/loading-icon/loader-64x/Preloader_2.gif) center no-repeat #fff;
    }` ]
})
export class TokenComponent implements OnInit {
    name : any;
 
    constructor(private userService: UserService, private appComponent: AppComponent, private router: Router) { }
 
    ngOnInit() {
        this.userService.getByToken()
        .subscribe(
        	name => {
          		this.name = name.user;
          		this.appComponent.getToken()
          		this.router.navigate([this.name.default_development.name_url, 'dashboard']);
        	},
        	error => {
        		this.router.navigate(['login']);
        	}
        )
    }
}