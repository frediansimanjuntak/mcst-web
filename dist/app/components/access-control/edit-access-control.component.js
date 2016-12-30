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
var EditAccessControlComponent = (function () {
    function EditAccessControlComponent(router, accesscontrolService, userService, unitService, alertService, route) {
        this.router = router;
        this.accesscontrolService = accesscontrolService;
        this.userService = userService;
        this.unitService = unitService;
        this.alertService = alertService;
        this.route = route;
        this.model = {};
    }
    EditAccessControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.unitService.getDevelopment("1")
            .then(function (unit) {
            _this.unit = unit;
            console.log(unit);
        });
        this.userService.getUsers()
            .then(function (users) {
            _this.users = users;
            console.log(users);
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.accesscontrolService.getAccessControl(this.id).then(function (accesscontrol) { return _this.accesscontrol = accesscontrol; });
        }
    };
    EditAccessControlComponent.prototype.createAccessControl = function () {
        var _this = this;
        console.log(this.model);
        this.accesscontrolService.create(this.model)
            .then(function (response) {
            _this.alertService.success('Create access control successful', true);
            _this.router.navigate(['/access_control']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditAccessControlComponent.prototype.updateAccessControl = function () {
        var _this = this;
        console.log(this.accesscontrol);
        this.accesscontrolService.update(this.accesscontrol)
            .then(function (response) {
            _this.alertService.success('Update access control successful', true);
            _this.router.navigate(['/access_control']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditAccessControlComponent;
}());
EditAccessControlComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-development',
        templateUrl: '/app/templates/edit-access-control.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.AccessControlService,
        index_1.UserService,
        index_1.UnitService,
        index_1.AlertService,
        router_1.ActivatedRoute])
], EditAccessControlComponent);
exports.EditAccessControlComponent = EditAccessControlComponent;
//# sourceMappingURL=edit-access-control.component.js.map