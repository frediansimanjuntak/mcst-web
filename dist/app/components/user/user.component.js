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
var UserComponent = (function () {
    function UserComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.users = [];
        this.model = {};
        this.developmentID = "585a07d7870e2713c857b802";
        // this.user = JSON.parse(localStorage.getItem('user'));
        // console.log(this.user)
    }
    UserComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    UserComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService.delete(user._id)
            .then(function (response) {
            _this.alertService.success('Create user successful', true);
            _this.loadAllUsers();
        }, function (error) {
            alert("The user could not be deleted, server Error.");
        });
    };
    UserComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    UserComponent.prototype.add = function () {
        this.router.navigate(['/user/add', this.developmentID]);
    };
    UserComponent.prototype.edit = function (user) {
        this.router.navigate(['/user/edit', this.developmentID, user._id]);
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/templates/user.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.UserService, index_1.AlertService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map