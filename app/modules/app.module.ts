import { NgModule, Directive }          from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }  				        from '@angular/forms';
import { ReactiveFormsModule }			    from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { Ng2TableModule }               from 'ng2-table/ng2-table';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { PaginationModule }             from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule }     		    from './app-routing.module';

import { 
  AlertComponent,
  AppComponent,
  AttachmentComponent,
  BookingComponent,
  CompanyComponent,
  ContractComponent,
  ContractorComponent,
  DashboardComponent,
  DevelopmentComponent, 
  FacilityComponent,
  HeaderComponent,
  IncidentComponent,
  LoginComponent,
  NavbarComponent,
  NewsletterComponent,
  EditNewsletterComponent,
  PaymentComponent,
  PetitionComponent,
  PollComponent,
  QuotationComponent,
  RegisterComponent,
  UserComponent,
  EditUserComponent,
  UserGroupComponent,
  VisitComponent,
} from '../components/index';

import {
  AlertService,
  AttachmentService,
  AuthenticationService,
  CompanyService,
  ContractService,
  ContractorService,
  DevelopmentService,
  FacilityService,
  IncidentService,
  NewsletterService,
  PaymentService,
  PetitionService,
  PollService,
  QuotationService,
  UserService,
  UserGroupService,
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
    AlertComponent,
  	AppComponent,
    AttachmentComponent,
    BookingComponent,
    CompanyComponent,
    ContractComponent,
    ContractorComponent,
    DashboardComponent,
    DevelopmentComponent,
    FacilityComponent,
    HeaderComponent,
    IncidentComponent,
    LoginComponent,
    NavbarComponent,
    NewsletterComponent,
    EditNewsletterComponent,
    PaymentComponent,
    PetitionComponent,
    PollComponent,
    QuotationComponent,
    RegisterComponent,
    UserComponent,
    EditUserComponent,
    UserGroupComponent,
    VisitComponent, 
  ],
  providers: [ 
    AlertService,
    AttachmentService,
    AuthenticationService,
    CompanyService,
    ContractService,
    ContractorService,
    DevelopmentService,
    FacilityService,
    IncidentService,
    NewsletterService,
    PaymentService,
    PetitionService,
    PollService,
    QuotationService,
    UserService,
    UserGroupService,
    VisitService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
