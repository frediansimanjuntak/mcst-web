import { NgModule, Directive }          from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }  				        from '@angular/forms';
import { FileSelectDirective }          from 'ng2-file-upload';
import { SimpleNotificationsModule }    from 'angular2-notifications';
import { FileDropDirective }            from 'ng2-file-upload';
import { ReactiveFormsModule }			    from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { Ng2TableModule }               from 'ng2-table/ng2-table';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { PaginationModule,DatepickerModule }             from 'ng2-bootstrap/ng2-bootstrap';
import { SelectModule }                 from 'ng2-select/ng2-select';
import { MyDatePickerModule }           from 'mydatepicker/dist/my-date-picker.module';
import { SignaturePadModule }           from 'angular2-signaturepad';
import { signature_pad }                from 'signature_pad';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
// import { DatePickerModule }             from 'ng2-datepicker';
// import { SELECT_DIRECTIVES }            from 'ng2-select';
import { AppRoutingModule }     		    from './app-routing.module';
import { url }                          from '../global'
import { DataTableModule,SharedModule,ScheduleModule,DialogModule,InputMaskModule,CheckboxModule,PanelModule,FieldsetModule,CalendarModule } from 'primeng/primeng';
import { EqualValidator }               from '../components/user/equal-validator.directive';
import { ImageUploadModule }            from 'ng2-imageupload';
import { ModalModule }                  from "ngx-modal";
import { BootstrapModalModule }         from 'angular2-modal/plugins/bootstrap';
import { SlimLoadingBarModule }         from 'ng2-slim-loading-bar';
import { PopoverModule }                from 'ngx-popover';

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
  EditBookingComponent,
  CompanyComponent,
  EditCompanyComponent,
  ContractComponent,
  EditContractComponent,
  ContractNoticeComponent,
  ContractNoteComponent,
  ContractorComponent,
  EditContractorComponent,
  DashboardComponent,
  DevelopmentComponent,
  EditDevelopmentComponent, 
  FacilityComponent,
  EditFacilityComponent,
  FeedbackComponent,
  HeaderComponent,
  IncidentComponent,
  EditIncidentComponent,
  LoginComponent,
  AuthGuard,
  NavbarComponent,
  NewsletterComponent,
  EditNewsletterComponent,
  PaymentComponent,
  EditPaymentComponent,
  PetitionComponent,
  EditPetitionComponent,
  PollComponent,
  EditPollComponent,
  QuotationComponent,
  RegisterComponent,
  SettingComponent,
  EditSettingComponent,
  UserComponent,
  EditUserComponent,
  UnitComponent,
  EditUnitComponent,
  ViewUnitComponent,
  UserGroupComponent,
  EditUserGroupComponent,
  VisitComponent,
  TestComponent,
  Galleria,
  NotificationComponent,
  LostFoundComponent,
  EditLostFoundComponent,

  SignaturePadPage,
} from '../components/index';

import {
  AccessControlService,
  AlertService,
  AttachmentService,
  AnnouncementService,
  AuthenticationService,
  BookingService,
  CompanyService,
  ContractService,
  ContractorService,
  DevelopmentService,
  FacilityService,
  FeedbackService,
  IncidentService,
  NewsletterService,
  PaymentService,
  NotificationService,
  PetitionService,
  PollService,
  QuotationService,
  UserService,
  UserGroupService,
  UnitService,
  VisitService,
  LostFoundService,
  TestService,
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
    SignaturePadModule,
    ScheduleModule,
    DialogModule,
    InputMaskModule,
    CheckboxModule,
    SelectModule,
    PanelModule,
    FieldsetModule,
    DatepickerModule,
    SimpleNotificationsModule,
    // ModalModule.forRoot(),
    ModalModule,
    BootstrapModalModule,
    MyDatePickerModule,
    CalendarModule,
    ImageUploadModule,
    PopoverModule,
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
    EditBookingComponent,
    CompanyComponent,
    EditCompanyComponent,
    ContractComponent,
    EditContractComponent,
    ContractNoticeComponent,
    ContractNoteComponent,
    ContractorComponent,
    EditContractorComponent,
    DashboardComponent,
    DevelopmentComponent,
    EditDevelopmentComponent,
    FacilityComponent,
    EditFacilityComponent,
    FeedbackComponent,
    FileSelectDirective,
    HeaderComponent,
    IncidentComponent,
    EditIncidentComponent,
    LoginComponent,
    NavbarComponent,
    NewsletterComponent,
    EditNewsletterComponent,
    PaymentComponent,
    EditPaymentComponent,
    PetitionComponent,
    EditPetitionComponent,
    PollComponent,
    EditPollComponent,
    QuotationComponent,
    RegisterComponent,
    SettingComponent,
    EditSettingComponent,
    UserComponent,
    EditUserComponent,
    EditUnitComponent,
    UnitComponent,
    ViewUnitComponent,
    UserGroupComponent,
    EditUserGroupComponent,
    VisitComponent, 
    AnnouncementComponent,
    EditAnnouncementComponent,
    TestComponent,
    Galleria,
    NotificationComponent,
    LostFoundComponent,
    
  ],
  providers: [ 
    AccessControlService,
    AlertService,
    AttachmentService,
    AnnouncementService,
    AuthenticationService,
    AuthGuard,
    BookingService,
    CompanyService,
    ContractService,
    ContractorService,
    DevelopmentService,
    FacilityService,
    FeedbackService,
    IncidentService,
    NewsletterService,
    NotificationService,
    PaymentService,
    PetitionService,
    PollService,
    QuotationService,
    UserService,
    UnitService,
    UserGroupService,
    VisitService,
    LostFoundService,
    TestService,
  ],
  bootstrap:    [ AppComponent ],
  // entryComponents: [ PublishAnnouncementModalComponent ] 
})
export class AppModule { }
