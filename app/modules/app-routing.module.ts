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
  FacilityComponent,
  HeaderComponent,
  IncidentComponent,
  LoginComponent,
  RegisterComponent,
  NavbarComponent,
  PaymentComponent,
  PetitionComponent,
  PollComponent,
  QuotationComponent,
  UserComponent,
  UserGroupComponent,
  VisitComponent,
} from '../components/index';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user',     component: UserComponent }
  // { path: 'heroes',     component: HeroesComponent },
  // { path: 'upload', 	component: FileUploadComponent },
  // { path: 'form',     component: HeroFormComponent },
  // { path: 'table',     component: TableDemoComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
