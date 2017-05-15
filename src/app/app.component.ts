/**
 * Angular 2 decorators and services
 */
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-progress-bar';
import { UserService } from './services/index';
import { NotificationsService } from 'angular2-notifications';
import {
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    Router,
    ActivatedRoute
} from '@angular/router'

@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    template: `
      <router-outlet name="header"></router-outlet>
      <router-outlet name="navbar"></router-outlet>
      <ng2-slim-loading-bar></ng2-slim-loading-bar>
      <router-outlet></router-outlet>
      <router-outlet name="footer"></router-outlet>
      <simple-notifications style="position: absolute;
        z-index: 99999;" [options]="options"></simple-notifications>
    <p-confirmDialog width="425"></p-confirmDialog>
  `,
  // styles: [`
  //   .gif {
  //       display: inline-block;
  //       margin-left: auto;
  //       margin-right: auto;
  //       height: 30px; 
  //   }

  //   .loading {
  //       opacity: 0;
  //       transition: opacity .8s ease-in-out;
  //       position: fixed;
  //       height: 100%;
  //       width: 100%;
  //       top: 0;
  //       left: 0;
  //       background: #000;
  //       z-index: -1;
  //   }

  //   .images{
  //       text-align:center;
  //   }
  // `],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { 
  loading: boolean = true;
    authToken : any;
    public options = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        animate: "fromLeft"
    }
    public angularclassLogo = 'assets/img/angularclass-avatar.png';
    public name = 'Angular 2 Webpack Starter';
    public url = 'https://twitter.com/AngularClass';
    constructor(
        private slimLoadingBarService: SlimLoadingBarService,
        private router: Router, 
        private userService:UserService,
        private _notificationsService: NotificationsService,
        public appState: AppState,
        private route: ActivatedRoute,
    ) {
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
    }    

    getToken(){
        this.userService.getByToken()
        .subscribe(
            name => {
                  this.name = name.user;
                  if (this.route._routerState.snapshot.url == '/') {
                    this.router.navigate([this.name.default_development.name_url, 'dashboard']);
                  }
            },
            error => {
                this.name = '';
                this.router.navigate(['login']);
            }
        )
    }
}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
