import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationsService } from 'angular2-notifications';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
	constructor(private router: Router, private userService: UserService, private _notificationsService: NotificationsService,) { }
 
   	canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean> {
		return this.userService.getByToken().map((user: any) => {
	  		if (user) {
				return true;
	  		} else {
				// not logged in so redirect to login page
				this.router.navigate(['/login']);
				return false;
	  		}
		}).catch((err: any, caught: Observable<boolean>): Observable<boolean> => {
			if (err.json().code) {
				if (err.code == 410) {
					// not logged in
					this.router.navigate(['/login']);
					return Observable.of(false);
		  		} else {
					this.router.navigate(['/login']);
					return Observable.of(false);
		  		}
			} else {
				if (err.status == 0) {
					this._notificationsService.error('Error', 'Connection error, please check your connection and try again later')
					this.router.navigate(['/login']);
					return Observable.of(false);
				}
		  	}
		}).take(1);
  	}
}