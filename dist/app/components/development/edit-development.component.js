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
var EditDevelopmentComponent = (function () {
    function EditDevelopmentComponent(router, developmentService, alertService) {
        this.router = router;
        this.developmentService = developmentService;
        this.alertService = alertService;
        this.developments = [];
        this.model = {};
    }
    EditDevelopmentComponent.prototype.createDevelopment = function () {
        var _this = this;
        console.log(this.model);
        this.developmentService.create(this.model)
            .then(function (response) {
            _this.alertService.success('Update development successful', true);
            _this.router.navigate(['/development']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditDevelopmentComponent.prototype.updateDevelopment = function () {
        var _this = this;
        this.developmentService.update(this.model)
            .then(function (response) {
            _this.alertService.success('Update development successful', true);
            _this.router.navigate(['/development']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditDevelopmentComponent;
}());
EditDevelopmentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-development',
        templateUrl: '/app/templates/edit-development.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.DevelopmentService,
        index_1.AlertService])
], EditDevelopmentComponent);
exports.EditDevelopmentComponent = EditDevelopmentComponent;
//# sourceMappingURL=edit-development.component.js.map