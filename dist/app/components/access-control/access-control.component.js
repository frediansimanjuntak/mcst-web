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
var AccessControlComponent = (function () {
    function AccessControlComponent(router, developmentService, alertService) {
        this.router = router;
        this.developmentService = developmentService;
        this.alertService = alertService;
        this.developments = [];
        this.model = {};
    }
    AccessControlComponent.prototype.ngOnInit = function () {
        this.loadAllDevelopments();
        // this.onChangeTable(this.config);
    };
    AccessControlComponent.prototype.deleteDevelopment = function (development) {
        var _this = this;
        this.developmentService.delete(development._id)
            .then(function (response) {
            if (response) {
                alert("The development could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Delete development successful', true);
                _this.loadAllDevelopments();
            }
        }, function (error) {
            alert("The Development could not be deleted, server Error.");
        });
    };
    AccessControlComponent.prototype.loadAllDevelopments = function () {
        var _this = this;
        this.developmentService.getAll().subscribe(function (developments) { _this.developments = developments; });
    };
    AccessControlComponent.prototype.add = function () {
        this.router.navigate(['/development/add']);
    };
    AccessControlComponent.prototype.edit = function (development) {
        this.router.navigate(['/development/edit', development._id]);
    };
    return AccessControlComponent;
}());
AccessControlComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'development',
        templateUrl: '/app/templates/development.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.DevelopmentService, index_1.AlertService])
], AccessControlComponent);
exports.AccessControlComponent = AccessControlComponent;
//# sourceMappingURL=access-control.component.js.map