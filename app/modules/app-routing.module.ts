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
  PollComponent,
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
  TestComponent
} from '../components/index';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user',     component: UserComponent, canActivate: [AuthGuard] },
  { path: 'user/add/',   component: EditUserComponent },
  { path: 'user/edit/:id',   component: EditUserComponent },
  { path: 'dashboard',     component: DashboardComponent },
  { path: ':name/newsletter',   component: NewsletterComponent },
  { path: ':name/newsletter/add',   component: EditNewsletterComponent },
  { path: ':name/newsletter/edit/:id',   component: EditNewsletterComponent },
  { path: ':name/incident',   component: IncidentComponent },
  { path: ':name/incident/add',   component: EditIncidentComponent },
  { path: ':name/incident/view/:id',   component: IncidentComponent },
  { path: ':name/payment',   component: PaymentComponent },
  { path: ':name/payment/add',   component: EditPaymentComponent },
  { path: ':name/payment/view/:id',   component: PaymentComponent },
  { path: ':name/contract',   component: ContractComponent },
  { path: ':name/contract/add',   component: EditContractComponent },
  { path: ':name/contract/add/:id',   component: EditContractComponent },
  { path: ':name/contract/add/note/:id',   component: ContractNoteComponent },
  { path: ':name/contract/add/notice/:id',   component: ContractNoticeComponent },
  { path: ':name/contract/view/:id',   component: ContractComponent },
  { path: ':name/contract/edit/:id',   component: EditContractComponent },
  { path: ':name/facility',   component: FacilityComponent },
  { path: ':name/facility/add',   component: EditFacilityComponent },
  { path: ':name/facility/view/:id',   component: FacilityComponent },
  { path: ':name/facility/edit/:id',   component: EditFacilityComponent },
  { path: ':name/booking',   component: BookingComponent },
  { path: ':name/booking/add',   component: EditBookingComponent },
  { path: ':name/booking/view/:id',   component: BookingComponent },
  { path: ':name/setting',     component: SettingComponent },
  { path: ':name/setting/edit/:id',     component: EditSettingComponent },
  { path: ':name/access_control',   component: AccessControlComponent },
  { path: ':name/access_control/add',   component: EditAccessControlComponent },
  { path: ':name/access_control/edit/:id',   component: EditAccessControlComponent },
  { path: ':name/development',   component: DevelopmentComponent },
  { path: ':name/development/add',   component: EditDevelopmentComponent },
  { path: ':name/development/edit/:id',   component: EditDevelopmentComponent },
  { path: ':name/unit',   component: UnitComponent },
  { path: ':name/unit/add',   component: EditUnitComponent },
  { path: ':name/unit/view/:id',   component: ViewUnitComponent },
  { path: ':name/user_group',   component: UserGroupComponent },
  { path: ':name/user_group/add',   component: EditUserGroupComponent },
  { path: ':name/user_group/edit/:id',   component: EditUserGroupComponent },
  { path: ':name/announcement',   component: AnnouncementComponent },
  { path: ':name/announcement/add',   component: EditAnnouncementComponent },
  { path: ':name/announcement/edit/:id',   component: EditAnnouncementComponent },
  { path: ':name/petition', component: PetitionComponent },
  { path: ':name/petition/view/:id', component: PetitionComponent },
  { path: ':name/petition/add',   component: EditPetitionComponent },
  { path: ':name/visit', component: VisitComponent },
  { path: ':name/company', component: CompanyComponent },
  { path: ':name/company/edit/:id',   component: EditCompanyComponent },
  { path: ':name/company/add',   component: EditCompanyComponent },
  { path: ':name/contractor', component: ContractorComponent },
  { path: ':name/:name/contractor/edit/:id', component: EditContractorComponent },
  { path: ':name/contractor/add',   component: EditContractorComponent },
  { path: ':name/notification', component: NotificationComponent },

  // { path: 'petition/edit/:id',   component: EditAnnouncementComponent },
  // { path: 'form',     component: HeroFormComponent },
  // { path: 'table',     component: TableDemoComponent },
  { path: 'test',     component: TestComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
