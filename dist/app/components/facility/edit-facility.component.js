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
require("rxjs/add/operator/switchMap");
var EditFacilityComponent = (function () {
    function EditFacilityComponent(router, facilityService, alertService, route) {
        this.router = router;
        this.facilityService = facilityService;
        this.alertService = alertService;
        this.route = route;
        this.model = {};
    }
    EditFacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.facilityService.getFacility(this.id).then(function (facility) { return _this.facility = facility; });
        }
    };
    EditFacilityComponent.prototype.createFacility = function () {
        var _this = this;
        this.facilityService.create(this.model)
            .then(function (response) {
            _this.alertService.success('Update facility successful', true);
            _this.router.navigate(['/facility']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditFacilityComponent.prototype.updateFacility = function () {
        var _this = this;
        this.facilityService.update(this.facility)
            .then(function (response) {
            _this.alertService.success('Update development successful', true);
            _this.router.navigate(['/development']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditFacilityComponent;
}());
EditFacilityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-facility',
        templateUrl: '/app/templates/edit-facility.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.FacilityService,
        index_1.AlertService,
        router_1.ActivatedRoute])
], EditFacilityComponent);
exports.EditFacilityComponent = EditFacilityComponent;
//# sourceMappingURL=edit-facility.component.js.map