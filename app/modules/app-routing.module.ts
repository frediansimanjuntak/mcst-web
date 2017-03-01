import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  AccessControlComponent,
  EditAccessControlComponent,
  AppComponent,
  AttachmentComponent,
  BookingComponent,
  EditBookingComponent,
  EditCompanyComponent,
  CompanyComponent,
  ContactComponent,
  ContractComponent,
  EditContractComponent,
  ContractorComponent,
  EditContractorComponent,
  ContractNoticeComponent,
  ContractNoteComponent,
  DevelopmentComponent,
  EditDevelopmentComponent,
  DashboardComponent,
  FacilityComponent,
  EditFacilityComponent,
  FeedbackComponent,
  HeaderComponent,
  IncidentComponent,
  EditIncidentComponent,
  LoginComponent,
  AuthGuard,
  RegisterComponent,
  NavbarComponent,
  NewsletterComponent,
  NotificationComponent,
  EditNewsletterComponent,
  PaymentComponent,
  EditPaymentComponent,
  PaymentReminderComponent,
  EditPaymentReminderComponent,
  PollComponent,
  EditPollComponent,
  QuotationComponent,
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
  AnnouncementComponent,
  EditAnnouncementComponent,
  PetitionComponent,
  EditPetitionComponent,
  TestComponent,
  LostFoundComponent,
  EditLostFoundComponent,
  TokenComponent,
  
} from '../components/index';

const routes: Routes = [
  { path: '', component: TokenComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':name/user',     component: UserComponent, canActivate: [AuthGuard] },
  { path: ':name/user/add',   component: EditUserComponent, canActivate: [AuthGuard] },
  { path: ':name/user/add/:id/:type',   component: EditUserComponent, canActivate: [AuthGuard] },
  { path: ':name/user/edit/:id',   component: EditUserComponent, canActivate: [AuthGuard] },
  { path: ':name/dashboard',     component: DashboardComponent, canActivate: [AuthGuard] },
  { path: ':name/newsletter',   component: NewsletterComponent, canActivate: [AuthGuard] },
  { path: ':name/newsletter/add',   component: EditNewsletterComponent, canActivate: [AuthGuard] },
  { path: ':name/newsletter/edit/:id',   component: EditNewsletterComponent, canActivate: [AuthGuard] },
  { path: ':name/incident',   component: IncidentComponent, canActivate: [AuthGuard] },
  { path: ':name/incident/add',   component: EditIncidentComponent, canActivate: [AuthGuard] },
  { path: ':name/incident/view/:id',   component: IncidentComponent, canActivate: [AuthGuard] },
  { path: ':name/payment',   component: PaymentComponent, canActivate: [AuthGuard] },
  { path: ':name/payment/add',   component: EditPaymentComponent, canActivate: [AuthGuard] },
  { path: ':name/payment/view/:id',   component: PaymentComponent, canActivate: [AuthGuard] },
  { path: ':name/payment_system',   component: PaymentReminderComponent, canActivate: [AuthGuard] },
  { path: ':name/payment_system/add',   component: EditPaymentReminderComponent, canActivate: [AuthGuard] },
  { path: ':name/payment_system/edit/:id',   component: EditPaymentReminderComponent, canActivate: [AuthGuard] },
  { path: ':name/payment_system/view/:id',   component: PaymentReminderComponent, canActivate: [AuthGuard] },
  { path: ':name/contact',   component: ContactComponent, canActivate: [AuthGuard] },
  { path: ':name/contract',   component: ContractComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/add',   component: EditContractComponent, canActivate: [AuthGuard] },
  { path: ':name/add/contract/:type/:refid/:refno',   component: EditContractComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/add/note/:id',   component: ContractNoteComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/note/:id/view/:_id',   component: ContractNoteComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/notice/:id/view/:_id',   component: ContractNoticeComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/add/notice/:id',   component: ContractNoticeComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/view/:id',   component: ContractComponent, canActivate: [AuthGuard] },
  { path: ':name/contract/edit/:id',   component: EditContractComponent, canActivate: [AuthGuard] },
  { path: ':name/facility',   component: FacilityComponent, canActivate: [AuthGuard] },
  { path: ':name/facility/add',   component: EditFacilityComponent, canActivate: [AuthGuard] },
  { path: ':name/facility/view/:id',   component: FacilityComponent, canActivate: [AuthGuard] },
  { path: ':name/facility/edit/:id',   component: EditFacilityComponent, canActivate: [AuthGuard] },
  { path: ':name/feedback',   component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: ':name/feedback/reply',   component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: ':name/booking',   component: BookingComponent, canActivate: [AuthGuard] },
  { path: ':name/booking/add',   component: EditBookingComponent, canActivate: [AuthGuard] },
  { path: ':name/booking/view/:id',   component: BookingComponent, canActivate: [AuthGuard] },
  { path: ':name/setting',     component: SettingComponent, canActivate: [AuthGuard] },
  { path: ':name/setting/edit/:id',     component: EditSettingComponent, canActivate: [AuthGuard] },
  { path: ':name/access_control',   component: AccessControlComponent, canActivate: [AuthGuard] },
  { path: ':name/access_control/add',   component: EditAccessControlComponent, canActivate: [AuthGuard] },
  { path: ':name/access_control/edit/:id',   component: EditAccessControlComponent, canActivate: [AuthGuard] },
  { path: ':name/development',   component: DevelopmentComponent, canActivate: [AuthGuard] },
  { path: ':name/development/add',   component: EditDevelopmentComponent, canActivate: [AuthGuard] },
  { path: ':name/development/edit/:id',   component: EditDevelopmentComponent, canActivate: [AuthGuard] },
  { path: ':name/unit',   component: UnitComponent, canActivate: [AuthGuard] },
  { path: ':name/unit/add',   component: EditUnitComponent, canActivate: [AuthGuard] },
  { path: ':name/unit/view/:id',   component: ViewUnitComponent, canActivate: [AuthGuard] },
  { path: ':name/user_group',   component: UserGroupComponent, canActivate: [AuthGuard] },
  { path: ':name/user_group/add',   component: EditUserGroupComponent, canActivate: [AuthGuard] },
  { path: ':name/user_group/edit/:id',   component: EditUserGroupComponent, canActivate: [AuthGuard] },
  { path: ':name/announcement',   component: AnnouncementComponent, canActivate: [AuthGuard] },
  { path: ':name/announcement/add',   component: EditAnnouncementComponent, canActivate: [AuthGuard] },
  { path: ':name/announcement/edit/:id',   component: EditAnnouncementComponent, canActivate: [AuthGuard] },
  { path: ':name/petition', component: PetitionComponent, canActivate: [AuthGuard] },
  { path: ':name/petition/view/:id', component: PetitionComponent, canActivate: [AuthGuard] },
  { path: ':name/petition/add',   component: EditPetitionComponent, canActivate: [AuthGuard] },
  { path: ':name/visit', component: VisitComponent, canActivate: [AuthGuard] },
  { path: ':name/company', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: ':name/company/edit/:id',   component: EditCompanyComponent, canActivate: [AuthGuard] },
  { path: ':name/company/add',   component: EditCompanyComponent, canActivate: [AuthGuard] },
  { path: ':name/contractor', component: ContractorComponent, canActivate: [AuthGuard] },
  { path: ':name/:name/contractor/edit/:id', component: EditContractorComponent, canActivate: [AuthGuard] },
  { path: ':name/contractor/add',   component: EditContractorComponent, canActivate: [AuthGuard] },
  { path: ':name/notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: ':name/lost_found', component: LostFoundComponent, canActivate: [AuthGuard] },
  { path: ':name/lost_found/view/:id', component: LostFoundComponent, canActivate: [AuthGuard] },
  { path: ':name/lost_found/add',   component: EditLostFoundComponent, canActivate: [AuthGuard] },
  { path: ':name/poll', component: PollComponent, canActivate: [AuthGuard] },
  { path: ':name/poll/view/:id', component: PollComponent, canActivate: [AuthGuard] },
  { path: ':name/poll/edit/:id',   component: EditPollComponent, canActivate: [AuthGuard] },
  { path: ':name/poll/add',   component: EditPollComponent, canActivate: [AuthGuard] },
 
  // { path: 'petition/edit/:id',   component: EditAnnouncementComponent },
  { path: ':name/test',     component: TestComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
