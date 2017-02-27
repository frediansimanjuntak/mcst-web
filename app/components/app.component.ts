import { Component, OnInit } from '@angular/core';
import '../rxjs-operators';
import { SlimLoadingBarService } from 'ng2-slim-progress-bar';
import { UserService } from '../services/index';
import { NotificationsService } from 'angular2-notifications';
import {
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    Router
} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
    <div *ngIf="name">
  	  <headers></headers>
  	  <navbar></navbar>
  	</div>
    <ng2-slim-loading-bar></ng2-slim-loading-bar>
   	<router-outlet></router-outlet>
    <footers *ngIf="name"></footers>
    <div class="loading-overlay" *ngIf="loading">
        <div class="aaa"></div>
        <button *ngIf="!loading" (click)="stop()"></button>
    </div>
    <simple-notifications style="position: absolute;
      z-index: 99999;" [options]="options"></simple-notifications>
    <p-confirmDialog width="425"></p-confirmDialog>


  	
  	
	`,
	styles:[`
	.gif {
	    display: inline-block;
	    margin-left: auto;
	    margin-right: auto;
	    height: 30px; 
	}

	.loading {
	    opacity: 0;
	    transition: opacity .8s ease-in-out;
	    position: fixed;
	    height: 100%;
	    width: 100%;
	    top: 0;
	    left: 0;
	    background: #000;
	    z-index: -1;
	}

	.images{
	    text-align:center;
	}
	`]
})

export class AppComponent implements OnInit { 
	loading: boolean = true;
    authToken : any;
    name: any;
    public options = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        animate: "fromLeft"
    }
    constructor(
        private slimLoadingBarService: SlimLoadingBarService,
        private router: Router, 
        private userService:UserService,
        private _notificationsService: NotificationsService,) {
        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
        
    }

    ngOnInit(): void {
        if(localStorage.getItem('authToken')) {
            this.getToken()
        }
    }

    start() {
        this.slimLoadingBarService.start(() => {});
    }

    stop() {
        this.slimLoadingBarService.stop();
    }


    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        // if (event instanceof NavigationEnd) {
        //    setTimeout(() => this.loading = false, 3000);
        // }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        // if (event instanceof NavigationCancel) {
        //     this.loading = false;
        // }
        // if (event instanceof NavigationError) {
        //     this.loading = false;
        // }
    }    

    getToken(){
        // this.authToken = JSON.parse(localStorage.getItem('authToken' || null));
        this.userService.getByToken()
        .subscribe(
            name => {
                  this.name = name;
            },
            error => {
                this.name = false;
                this.router.navigate(['login']);
            }
        )
    }
}
