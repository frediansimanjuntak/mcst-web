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
import { SelectModule }                 from 'ng2-select/ng2-select';
import { MyDatePickerModule }           from 'mydatepicker/dist/my-date-picker.module';
// import { DatePickerModule }             from 'ng2-datepicker';
// import { SELECT_DIRECTIVES }            from 'ng2-select';
import { AppRoutingModule }     		    from './app-routing.module';
import { url }                          from '../global'
import { DataTableModule,SharedModule,ScheduleModule,DialogModule,InputMaskModule,CheckboxModule,PanelModule,FieldsetModule } from 'primeng/primeng';
import { EqualValidator }               from '../components/user/equal-validator.directive';
import { ImageUploadModule }            from 'ng2-imageupload';
import { ModalModule }                  from "ng2-modal";
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { 
  AccessControlComponent,
  EditAccessControlComponent,
  AlertComponent,
  AppComponent,
  AttachmentComponent,
  AnnouncementComponent,
  EditAnnouncementComponent,
  // PublishAnnouncementModalComponent,
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
  EditPetitionComponent,
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
  TestComponent,
  Galleria,
} from '../components/index';

import {
  AccessControlService,
  AlertService,
  AttachmentService,
  AnnouncementService,
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
    SelectModule,
    PanelModule,
    FieldsetModule,
    // ModalModule.forRoot(),
    ModalModule,
    BootstrapModalModule,
    MyDatePickerModule,
    
    ImageUploadModule,
    SlimLoadingBarModule.forRoot(),
  ],
  declarations: [ 
    AccessControlComponent,
    EditAccessControlComponent,
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
    EditPetitionComponent,
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
    AnnouncementComponent,
    EditAnnouncementComponent,
    TestComponent,
    Galleria,
    
  ],
  providers: [ 
    AccessControlService,
    AlertService,
    AttachmentService,
    AnnouncementService,
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
  bootstrap:    [ AppComponent ],
  // entryComponents: [ PublishAnnouncementModalComponent ] 
})
export class AppModule { }
