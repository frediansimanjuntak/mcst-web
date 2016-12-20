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
var EditUserComponent = (function () {
    function EditUserComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.users = [];
        this.model = {};
    }
    EditUserComponent.prototype.createUser = function () {
        var _this = this;
        console.log(this.model);
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Create user successful', true);
            _this.router.navigate(['/user']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditUserComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService.update(this.model)
            .subscribe(function (response) {
            if (response.error) {
                _this.alertService.error(response.error);
            }
            else {
                // EmitterService.get(this.userList).emit(response.users);
                _this.alertService.success('Update User successful', true);
                _this.router.navigate(['/user']);
            }
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditUserComponent;
}());
EditUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/templates/edit-user.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], EditUserComponent);
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-user.component.js.map