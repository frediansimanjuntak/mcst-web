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
  UserComponent,
  EditUserComponent,
  UserGroupComponent,
  VisitComponent,
} from '../components/index';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user',     component: UserComponent },
  { path: 'dashboard',     component: DashboardComponent },
  { path: 'user/add', 	component: EditUserComponent },
  { path: 'newsletter',   component: NewsletterComponent },
  { path: 'newsletter/add',   component: EditNewsletterComponent },
  { path: 'newsletter/edit/:id',   component: EditNewsletterComponent },
  // { path: 'newsletter/edit/:name',   component: EditNewsletterComponent },
  { path: 'development',   component: DevelopmentComponent },
  { path: 'development/add',   component: EditDevelopmentComponent },
  { path: 'development/edit/:id',   component: EditDevelopmentComponent },
  // { path: 'development/edit/:name',   component: EditDevelopmentComponent },
  // { path: 'form',     component: HeroFormComponent },
  // { path: 'table',     component: TableDemoComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
