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
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ng2_file_upload_1 = require("ng2-file-upload");
var forms_2 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng2_table_1 = require("ng2-table/ng2-table");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap/ng2-bootstrap");
var ng2_select_1 = require("ng2-select/ng2-select");
var my_date_picker_module_1 = require("mydatepicker/dist/my-date-picker.module");
// import { DatePickerModule }             from 'ng2-datepicker';
// import { SELECT_DIRECTIVES }            from 'ng2-select';
var app_routing_module_1 = require("./app-routing.module");
var primeng_1 = require("primeng/primeng");
var equal_validator_directive_1 = require("../components/user/equal-validator.directive");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var index_1 = require("../components/index");
var index_2 = require("../services/index");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            primeng_1.DataTableModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_2.ReactiveFormsModule,
            http_1.HttpModule,
            ng2_table_1.Ng2TableModule,
            ng2_bootstrap_1.Ng2BootstrapModule,
            ng2_bootstrap_2.PaginationModule,
            app_routing_module_1.AppRoutingModule,
            primeng_1.SharedModule,
            primeng_1.ScheduleModule,
            primeng_1.DialogModule,
            primeng_1.InputMaskModule,
            primeng_1.CheckboxModule,
            ng2_select_1.SelectModule,
            primeng_1.PanelModule,
            primeng_1.FieldsetModule,
            angular2_modal_1.ModalModule.forRoot(),
            bootstrap_1.BootstrapModalModule,
            my_date_picker_module_1.MyDatePickerModule
        ],
        declarations: [
            index_1.AccessControlComponent,
            index_1.EditAccessControlComponent,
            equal_validator_directive_1.EqualValidator,
            index_1.AlertComponent,
            index_1.AppComponent,
            index_1.AttachmentComponent,
            index_1.BookingComponent,
            index_1.CompanyComponent,
            index_1.ContractComponent,
            index_1.ContractorComponent,
            index_1.DashboardComponent,
            index_1.DevelopmentComponent,
            index_1.EditDevelopmentComponent,
            index_1.FacilityComponent,
            ng2_file_upload_1.FileSelectDirective,
            index_1.HeaderComponent,
            index_1.IncidentComponent,
            index_1.EditIncidentComponent,
            index_1.LoginComponent,
            index_1.NavbarComponent,
            index_1.NewsletterComponent,
            index_1.EditNewsletterComponent,
            index_1.PaymentComponent,
            index_1.PetitionComponent,
            index_1.PollComponent,
            index_1.QuotationComponent,
            index_1.RegisterComponent,
            index_1.SettingComponent,
            index_1.EditSettingComponent,
            index_1.UserComponent,
            index_1.EditUserComponent,
            index_1.EditUnitComponent,
            index_1.UnitComponent,
            index_1.UserGroupComponent,
            index_1.EditUserGroupComponent,
            index_1.VisitComponent,
            index_1.AnnouncementComponent,
            index_1.EditAnnouncementComponent,
            index_1.TestComponent
        ],
        providers: [
            index_2.AccessControlService,
            index_2.AlertService,
            index_2.AttachmentService,
            index_2.AnnouncementService,
            index_2.AuthenticationService,
            index_2.CompanyService,
            index_2.ContractService,
            index_2.ContractorService,
            index_2.DevelopmentService,
            index_2.FacilityService,
            index_2.IncidentService,
            index_2.NewsletterService,
            index_2.PaymentService,
            index_2.PetitionService,
            index_2.PollService,
            index_2.QuotationService,
            index_2.UserService,
            index_2.UnitService,
            index_2.UserGroupService,
            index_2.VisitService,
        ],
        bootstrap: [index_1.AppComponent],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map