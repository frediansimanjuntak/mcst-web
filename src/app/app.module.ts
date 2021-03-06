import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { NgModule, Directive, ElementRef, ApplicationRef  } from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { BrowserModule }                from '@angular/platform-browser';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { FormsModule }                  from '@angular/forms';
import { FileSelectDirective }          from 'ng2-file-upload';
import { SimpleNotificationsModule }    from 'angular2-notifications';
import { FileDropDirective }            from 'ng2-file-upload';
import { ReactiveFormsModule }          from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { Ng2BootstrapModule, PaginationModule, DatepickerModule, TabsModule, PopoverModule, ProgressbarModule  } from 'ng2-bootstrap';
import { SelectModule }                 from 'ng2-select/ng2-select';
import { MyDatePickerModule }           from 'mydatepicker';
import { SignaturePadModule }           from 'angular2-signaturepad';
import { signature_pad }                from 'signature_pad';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
// import { DatePickerModule }             from 'ng2-datepicker';
// import { SELECT_DIRECTIVES }            from 'ng2-select';
import { url }                          from './global'
import { DataTableModule,SharedModule,ScheduleModule,DialogModule,InputMaskModule,CheckboxModule,PanelModule,FieldsetModule,CalendarModule,DropdownModule,ConfirmDialogModule,ConfirmationService,RatingModule,AutoCompleteModule } from 'primeng/primeng';
import { EqualValidator }               from './components/user/equal-validator.directive';
import { ImageUploadModule }            from 'ng2-imageupload';
import { ModalModule }                  from "ngx-modal";
import { BootstrapModalModule }         from 'angular2-modal/plugins/bootstrap';
import { SlimLoadingBarModule }         from 'ng2-slim-progress-bar';
import { MomentModule }                 from 'angular2-moment';
import { PdfViewerComponent }           from 'ng2-pdf-viewer';
import { DatePipe } from '@angular/common';


import { 
  TokenComponent,
  AccessControlComponent,
  EditAccessControlComponent,
  AlertComponent,
  AnnouncementComponent,
  EditAnnouncementComponent,
  // PublishAnnouncementModalComponent,
  BookingComponent,
  EditBookingComponent,
  CompanyComponent,
  EditCompanyComponent,
  ContactComponent,
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
  PaymentReminderComponent,
  EditPaymentReminderComponent,
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
  FooterComponent,
  SignaturePadPage,
  EditContactComponent,
  LoadingComponent
} from './components/index';

import {
  AccessControlService,
  AlertService,
  AnnouncementService,
  AuthenticationService,
  BookingService,
  CompanyService,
  ContractService,
  ContractNoteService,
  ContractNoticeService,
  ContractorService,
  DevelopmentService,
  FacilityService,
  FeedbackService,
  IncidentService,
  NewsletterService,
  PaymentService,
  PaymentReminderService,
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
  AttachmentService,
  ContactService
} from './services/index';

import {
  CapitalizePipe,
  CapitalizeFirstPipe
} from './pipes/index';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    TokenComponent,
    AccessControlComponent,
    EditAccessControlComponent,
    EqualValidator,
    AlertComponent,
    BookingComponent,
    EditBookingComponent,
    CompanyComponent,
    EditCompanyComponent,
    ContactComponent,
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
    LoadingComponent,
    LoginComponent,
    NavbarComponent,
    NewsletterComponent,
    EditNewsletterComponent,
    PaymentComponent,
    EditPaymentComponent,
    PaymentReminderComponent,
    EditPaymentReminderComponent,
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
    EditLostFoundComponent,
    FooterComponent,
    SignaturePadPage,
    PdfViewerComponent,
    CapitalizePipe,
    CapitalizeFirstPipe,
    EditContactComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    CommonModule, 
    DataTableModule, 
    DropdownModule, 
    ReactiveFormsModule,
    Ng2BootstrapModule,
    PaginationModule,
    SharedModule,
    SignaturePadModule,
    ScheduleModule,
    DialogModule,
    InputMaskModule,
    CheckboxModule,
    SelectModule,
    PanelModule,
    FieldsetModule,
    DatepickerModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    ConfirmDialogModule,
    // ModalModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule,
    BootstrapModalModule,
    MyDatePickerModule,
    PopoverModule.forRoot(),
    CalendarModule,
    RatingModule,
    ImageUploadModule,
    MomentModule,
    SlimLoadingBarModule.forRoot(),
    ProgressbarModule.forRoot(),
    AutoCompleteModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AccessControlService,
    AlertService,
    AnnouncementService,
    AuthenticationService,
    AuthGuard,
    BookingService,
    CompanyService,
    ContractService,
    ContractNoteService,
    ContractNoticeService,
    ContractorService,
    ConfirmationService,
    DevelopmentService,
    FacilityService,
    FeedbackService,
    IncidentService,
    NewsletterService,
    NotificationService,
    PaymentService,
    PaymentReminderService,
    PetitionService,
    PollService,
    QuotationService,
    UserService,
    UnitService,
    UserGroupService,
    VisitService,
    LostFoundService,
    TestService,
    EditContractComponent,
    AppComponent,
    DatePipe,
    AttachmentService,
    ContactService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
