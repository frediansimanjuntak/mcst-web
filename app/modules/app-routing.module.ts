import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  AppComponent,
  AttachmentComponent,
  BookingComponent,
  CompanyComponent,
  ContractComponent,
  ContractorComponent,
  DevelopmentComponent,
  EditDevelopmentComponent,
  DashboardComponent,
  FacilityComponent,
  HeaderComponent,
  IncidentComponent,
  LoginComponent,
  RegisterComponent,
  NavbarComponent,
  NewsletterComponent,
  EditNewsletterComponent,
  PaymentComponent,
  PetitionComponent,
  PollComponent,
  QuotationComponent,
  SettingComponent,
  UserComponent,
  EditUserComponent,
  UnitComponent,
  EditUnitComponent,
  UserGroupComponent,
  VisitComponent,
  TestComponent
} from '../components/index';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user',     component: UserComponent },
  { path: 'user/add/:_id',   component: EditUserComponent },
  { path: 'user/edit/:name/:id',   component: EditUserComponent },
  { path: 'dashboard',     component: DashboardComponent },
  { path: 'newsletter',   component: NewsletterComponent },
  { path: 'newsletter/add',   component: EditNewsletterComponent },
  { path: 'newsletter/edit/:id',   component: EditNewsletterComponent },
  { path: 'setting',     component: SettingComponent },
  // { path: 'newsletter/edit/:name',   component: EditNewsletterComponent },
  { path: 'development',   component: DevelopmentComponent },
  { path: 'development/add',   component: EditDevelopmentComponent },
  { path: 'development/edit/:id',   component: EditDevelopmentComponent },

  { path: 'unit',   component: UnitComponent },
  { path: 'unit/add',   component: EditUnitComponent },
  { path: 'unit/edit/:id',   component: EditUnitComponent },
  // { path: 'development/edit/:name',   component: EditDevelopmentComponent },
  // { path: 'form',     component: HeroFormComponent },
  // { path: 'table',     component: TableDemoComponent },
  { path: 'test',     component: TestComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
