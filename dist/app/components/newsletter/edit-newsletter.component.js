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
var index_1 = require("../../services/index");
require("../../rxjs-operators");
var EditNewsletterComponent = (function () {
    function EditNewsletterComponent(router, newsletterService, alertService) {
        this.router = router;
        this.newsletterService = newsletterService;
        this.alertService = alertService;
        this.developments = [];
        this.model = {};
    }
    EditNewsletterComponent.prototype.createUser = function () {
        var _this = this;
        console.log(this.model);
        this.newsletterService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Create development successful', true);
            _this.router.navigate(['/development']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditNewsletterComponent.prototype.updateUser = function () {
        var _this = this;
        this.newsletterService.update(this.model)
            .subscribe(function (response) {
            if (response.error) {
                _this.alertService.error(response.error);
            }
            else {
                // EmitterService.get(this.userList).emit(response.users);
                _this.alertService.success('Update development successful', true);
                _this.router.navigate(['/development']);
            }
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditNewsletterComponent;
}());
EditNewsletterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-development',
        template: "",
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.NewsletterService,
        index_1.AlertService])
], EditNewsletterComponent);
exports.EditNewsletterComponent = EditNewsletterComponent;
//# sourceMappingURL=edit-newsletter.component.js.map