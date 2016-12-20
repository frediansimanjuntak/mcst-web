import { Component } from '@angular/core';
import '../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  	<headers></headers>
  	<navbar></navbar>
  	<router-outlet></router-outlet>
	`,
})

export class AppComponent  { 
	
}
