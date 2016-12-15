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
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent },
  // { path: 'upload', 	component: FileUploadComponent },
  // { path: 'form',     component: HeroFormComponent },
  // { path: 'table',     component: TableDemoComponent },
  // { path: 'users',     component: UsersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
