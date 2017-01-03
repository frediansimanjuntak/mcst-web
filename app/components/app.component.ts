import { Component } from '@angular/core';
import '../rxjs-operators';
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
  	<headers></headers>
  	<navbar></navbar>
  	<div class="loading-overlay" *ngIf="loading">
    	loading
	</div>
   	<router-outlet></router-outlet>

  	
  	
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

export class AppComponent  { 
	loading: boolean = true;

    constructor(private router: Router) {
        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }


    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
           setTimeout(() => this.loading = false, 2000);
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }
}
