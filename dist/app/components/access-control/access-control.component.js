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
    function AccessControlComponent(router, accesscontrolService, alertService) {
        this.router = router;
        this.accesscontrolService = accesscontrolService;
        this.alertService = alertService;
        this.accesscontrols = [];
        this.model = {};
    }
    AccessControlComponent.prototype.ngOnInit = function () {
        this.loadAllAccessControls();
        // this.onChangeTable(this.config);
    };
    AccessControlComponent.prototype.deleteAccessControl = function (accesscontrol) {
        var _this = this;
        console.log(accesscontrol);
        this.accesscontrolService.delete(accesscontrol._id)
            .then(function (response) {
            if (response) {
                alert("The access control could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Delete access control successful', true);
                _this.loadAllAccessControls();
            }
        }, function (error) {
            alert("The access control could not be deleted, server Error.");
        });
    };
    AccessControlComponent.prototype.loadAllAccessControls = function () {
        var _this = this;
        this.accesscontrolService.getAccessControls()
            .then(function (accesscontrols) {
            _this.accesscontrols = accesscontrols;
            _this.card = _this.accesscontrols.filter(function (accesscontrols) { return accesscontrols.access_type === 'card'; });
            _this.transponder = _this.accesscontrols.filter(function (accesscontrols) { return accesscontrols.access_type === 'transponder'; });
        });
    };
    AccessControlComponent.prototype.add = function () {
        this.router.navigate(['/access_control/add']);
    };
    AccessControlComponent.prototype.edit = function (accesscontrol) {
        this.router.navigate(['/access_control/edit', accesscontrol._id]);
    };
    return AccessControlComponent;
}());
AccessControlComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'development',
        templateUrl: '/app/templates/access-control.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.AccessControlService, index_1.AlertService])
], AccessControlComponent);
exports.AccessControlComponent = AccessControlComponent;
//# sourceMappingURL=access-control.component.js.map