"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../components/index");
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'user', component: index_1.UserComponent },
    { path: 'user/add/:_id', component: index_1.EditUserComponent },
    { path: 'user/edit/:name/:id', component: index_1.EditUserComponent },
    { path: 'dashboard', component: index_1.DashboardComponent },
    { path: 'newsletter', component: index_1.NewsletterComponent },
    { path: 'newsletter/add', component: index_1.EditNewsletterComponent },
    { path: 'newsletter/edit/:id', component: index_1.EditNewsletterComponent },
    { path: 'incident', component: index_1.IncidentComponent },
    { path: 'incident/add', component: index_1.EditIncidentComponent },
    { path: 'incident/view/:id', component: index_1.IncidentComponent },
    { path: 'facility', component: index_1.FacilityComponent },
    { path: 'facility/add', component: index_1.EditFacilityComponent },
    { path: 'facility/view/:id', component: index_1.FacilityComponent },
    { path: 'facility/edit/:id', component: index_1.EditFacilityComponent },
    { path: 'booking', component: index_1.BookingComponent },
    { path: 'booking/add', component: index_1.EditBookingComponent },
    { path: 'booking/view/:id', component: index_1.BookingComponent },
    { path: 'setting', component: index_1.SettingComponent },
    { path: 'setting/edit/:id', component: index_1.EditSettingComponent },
    { path: 'access_control', component: index_1.AccessControlComponent },
    { path: 'access_control/add', component: index_1.EditAccessControlComponent },
    { path: 'access_control/edit/:id', component: index_1.EditAccessControlComponent },
    // { path: 'newsletter/edit/:name',   component: EditNewsletterComponent },
    { path: 'development', component: index_1.DevelopmentComponent },
    { path: 'development/add', component: index_1.EditDevelopmentComponent },
    { path: 'development/edit/:id', component: index_1.EditDevelopmentComponent },
    { path: 'unit', component: index_1.UnitComponent },
    { path: 'unit/add', component: index_1.EditUnitComponent },
    { path: 'unit/edit/:id', component: index_1.EditUnitComponent },
    // { path: 'development/edit/:name',   component: EditDevelopmentComponent },
    { path: 'user_group', component: index_1.UserGroupComponent },
    { path: 'user_group/add', component: index_1.EditUserGroupComponent },
    { path: 'user_group/edit/:id', component: index_1.EditUserGroupComponent },
    { path: 'announcement', component: index_1.AnnouncementComponent },
    { path: 'announcement/add', component: index_1.EditAnnouncementComponent },
    { path: 'announcement/edit/:id', component: index_1.EditAnnouncementComponent },
    { path: 'petition', component: index_1.PetitionComponent },
    { path: 'petition/view/:id', component: index_1.PetitionComponent },
    { path: 'petition/add', component: index_1.EditPetitionComponent },
    // { path: 'petition/edit/:id',   component: EditAnnouncementComponent },
    // { path: 'form',     component: HeroFormComponent },
    // { path: 'table',     component: TableDemoComponent },
    { path: 'test', component: index_1.TestComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map