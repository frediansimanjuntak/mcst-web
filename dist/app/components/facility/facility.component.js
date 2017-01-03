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
var FacilityComponent = (function () {
    function FacilityComponent(router, facilityService, alertService) {
        this.router = router;
        this.facilityService = facilityService;
        this.alertService = alertService;
        this.facilities = [];
        this.model = {};
    }
    FacilityComponent.prototype.ngOnInit = function () {
        this.loadAllDevelopments();
    };
    FacilityComponent.prototype.deleteDevelopment = function (facility) {
        var _this = this;
        this.facilityService.delete(facility._id)
            .then(function (response) {
            if (response) {
                alert("The facility could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Delete facility successful', true);
                _this.loadAllDevelopments();
            }
        }, function (error) {
            alert("The Development could not be deleted, server Error.");
        });
    };
    FacilityComponent.prototype.loadAllDevelopments = function () {
        var _this = this;
        this.facilityService.getAll().subscribe(function (facilities) { _this.facilities = facilities; });
    };
    FacilityComponent.prototype.add = function () {
        this.router.navigate(['/facility/add']);
    };
    FacilityComponent.prototype.edit = function (facility) {
        this.router.navigate(['/facility/edit', facility._id]);
    };
    return FacilityComponent;
}());
FacilityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'facility',
        templateUrl: '/app/templates/facility.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.FacilityService, index_1.AlertService])
], FacilityComponent);
exports.FacilityComponent = FacilityComponent;
//# sourceMappingURL=facility.component.js.map