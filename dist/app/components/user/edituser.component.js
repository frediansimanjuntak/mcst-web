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
var EditUserComponent = (function () {
    function EditUserComponent(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.users = [];
        this.model = {};
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
    }
    EditUserComponent.prototype.register = function () {
        var _this = this;
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
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
                _this.alertService.success('Registration successful', true);
                _this.router.navigate(['/user']);
            }
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditUserComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; console.log(users); });
    };
    return EditUserComponent;
}());
EditUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: "\n    <div class=\"col-md-6 col-md-offset-3\">\n    <h1>Hi {{user.username}}!</h1>\n    <p>You're logged in with Angular 2!!</p>\n    <h3>All registered users:</h3>\n    <ul>\n        <li *ngFor=\"let user of users\">\n            {{user.username}}\n            - <a (click)=\"deleteUser(user.id)\">Delete</a>\n        </li>\n    </ul>\n    <p><a [routerLink]=\"['/login']\">Logout</a></p>\n</div>\n  ",
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        index_1.AlertService])
], EditUserComponent);
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edituser.component.js.map