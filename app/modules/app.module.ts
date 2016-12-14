import { NgModule, Directive }          from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }  				from '@angular/forms';
import { ReactiveFormsModule }			from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { Ng2TableModule }               from 'ng2-table/ng2-table';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { PaginationModule }             from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule }     		from './app-routing.module';

import { 
  AppComponent,
  AttachmentComponent,
  BookingComponent,
  CompanyComponent,
  ContractComponent,
  DevelopmentComponent,
  FacilityComponent,
  HeaderComponent,
  IncidentComponent,
  NavbarComponent,
  NewsletterComponent,
  PaymentComponent,
  PetitionComponent,
  PollComponent,
  QuotationComponent,
  SettingComponent,
  UserComponent,
  VisitComponent,
} from '../components/index';

import { 
  AttachmentService,
  BookingService,
  CompanyService,
  ContractService,
  DevelopmentService,
  FacilityService,
  IncidentService,
  NewsletterService,
  PaymentService,
  PetitionService,
  PollService,
  QuotationService,
  SettingService,
  UserService,
  VisitService,
} from '../services/index';

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
    AttachmentComponent,
    BookingComponent,
    CompanyComponent,
    ContractComponent,
    DevelopmentComponent,
    FacilityComponent,
    HeaderComponent,
    IncidentComponent,
    NavbarComponent,
    NewsletterComponent,
    PaymentComponent,
    PetitionComponent,
    PollComponent,
    QuotationComponent,
    SettingComponent,
    UserComponent,
    VisitComponent, 
  ],
  providers: [ 
    AttachmentService,
    BookingService,
    CompanyService,
    ContractService,
    DevelopmentService,
    FacilityService,
    IncidentService,
    NewsletterService,
    PaymentService,
    PetitionService,
    PollService,
    QuotationService,
    SettingService,
    UserService,
    VisitService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
