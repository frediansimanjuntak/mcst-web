import { NgModule, Directive }          from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }  				from '@angular/forms';
import { ReactiveFormsModule }			from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { Ng2TableModule }               from 'ng2-table/ng2-table';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { PaginationModule }             from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule }     		from './app-routing.module';

import { AppComponent }  				from '../components/app.component';
import { HeaderComponent }  			from '../components/header.component';
import { NavbarComponent }  			from '../components/navbar.component';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	ReactiveFormsModule,
  	HttpModule,
  	Ng2TableModule,
  	Ng2BootstrapModule,
  	PaginationModule,
  	AppRoutingModule,
  ],
  declarations: [ 
  	AppComponent,
  	HeaderComponent,
  	NavbarComponent 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
