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
  ContractorComponent,
  DevelopmentComponent,
  FacilityComponent,
  HeaderComponent,
  IncidentComponent,
  NavbarComponent,
  PaymentComponent,
  PetitionComponent,
  PollComponent,
  QuotationComponent,
  UserComponent,
  UserGroupComponent,
  VisitComponent,
} from '../components/index';

import { 
  AttachmentService,
  BookingService,
  CompanyService,
  ContractService,
  ContractorService,
  DevelopmentService,
  FacilityService,
  IncidentService,
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
  	AppComponent,
    AttachmentComponent,
    BookingComponent,
    CompanyComponent,
    ContractComponent,
    ContractorComponent,
    DevelopmentComponent,
    FacilityComponent,
    HeaderComponent,
    IncidentComponent,
    NavbarComponent,
    PaymentComponent,
    PetitionComponent,
    PollComponent,
    QuotationComponent,
    UserComponent,
    UserGroupComponent,
    VisitComponent, 
  ],
  providers: [ 
    AttachmentService,
    BookingService,
    CompanyService,
    ContractService,
    ContractorService,
    DevelopmentService,
    FacilityService,
    IncidentService,
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
