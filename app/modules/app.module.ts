import { NgModule, Directive }          from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }  				        from '@angular/forms';
import { FileSelectDirective }          from 'ng2-file-upload';
import { FileDropDirective }            from 'ng2-file-upload';
import { ReactiveFormsModule }			    from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { Ng2TableModule }               from 'ng2-table/ng2-table';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { PaginationModule }             from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule }     		    from './app-routing.module';
import { url }                          from '../global'
import { DataTableModule,SharedModule,ScheduleModule,DialogModule,InputMaskModule,CheckboxModule } from 'primeng/primeng';
import { EqualValidator }               from '../components/user/equal-validator.directive';

import { 
  AccessControlComponent,
  AlertComponent,
  AppComponent,
  AttachmentComponent,
  BookingComponent,
  CompanyComponent,
  ContractComponent,
  ContractorComponent,
  DashboardComponent,
  DevelopmentComponent,
  EditDevelopmentComponent, 
  FacilityComponent,
  HeaderComponent,
  IncidentComponent,
  EditIncidentComponent,
  LoginComponent,
  NavbarComponent,
  NewsletterComponent,
  EditNewsletterComponent,
  PaymentComponent,
  PetitionComponent,
  PollComponent,
  QuotationComponent,
  RegisterComponent,
  SettingComponent,
  EditSettingComponent,
  UserComponent,
  EditUserComponent,
  UnitComponent,
  EditUnitComponent,
  UserGroupComponent,
  EditUserGroupComponent,
  VisitComponent,
  TestComponent
} from '../components/index';

import {
  AccessControlService,
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
  UnitService,
  VisitService,
} from '../services/index';

@NgModule({
  imports:      [
    CommonModule, 
    DataTableModule,  
  	BrowserModule,
  	FormsModule,
  	ReactiveFormsModule,
  	HttpModule,
  	Ng2TableModule,
  	Ng2BootstrapModule,
  	PaginationModule,
  	AppRoutingModule,
    SharedModule,
    ScheduleModule,
    DialogModule,
    InputMaskModule,
    CheckboxModule,
  ],
  declarations: [ 
    AccessControlComponent,
    EqualValidator,
    AlertComponent,
  	AppComponent,
    AttachmentComponent,
    BookingComponent,
    CompanyComponent,
    ContractComponent,
    ContractorComponent,
    DashboardComponent,
    DevelopmentComponent,
    EditDevelopmentComponent,
    FacilityComponent,
    FileSelectDirective,
    HeaderComponent,
    IncidentComponent,
    EditIncidentComponent,
    LoginComponent,
    NavbarComponent,
    NewsletterComponent,
    EditNewsletterComponent,
    PaymentComponent,
    PetitionComponent,
    PollComponent,
    QuotationComponent,
    RegisterComponent,
    SettingComponent,
    EditSettingComponent,
    UserComponent,
    EditUserComponent,
    EditUnitComponent,
    UnitComponent,
    UserGroupComponent,
    EditUserGroupComponent,
    VisitComponent, 
    TestComponent
  ],
  providers: [ 
    AccessControlService,
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
    UnitService,
    UserGroupService,
    VisitService,
  ],
  bootstrap:    [ AppComponent ] 
})
export class AppModule { }
