import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../index';
import '../../rxjs-operators';

@Component({
  selector: 'contact',
  templateUrl: 'app/templates/contact.html'

})

export class ContactComponent  implements OnInit{ 

	constructor(
        private appComponent: AppComponent) {}
	
	ngOnInit(): void {
        setTimeout(() => this.appComponent.loading = false, 1000);
    }
   
}
