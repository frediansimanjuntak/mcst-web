import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DashboardComponent }   from './dashboard.component';
// import { HeroesComponent }      from './heroes.component';

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard',  component: DashboardComponent },
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
