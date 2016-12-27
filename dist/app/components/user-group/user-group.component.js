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
var index_1 = require("../../services/index");
require("../../rxjs-operators");
var UserGroupComponent = (function () {
    function UserGroupComponent(userGroupService, userService, alertService) {
        this.userGroupService = userGroupService;
        this.userService = userService;
        this.alertService = alertService;
        this.usergroups = [];
        this.users = [];
        this.model = {};
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
    }
    UserGroupComponent.prototype.ngOnInit = function () {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllUserGroup();
        this.getUsers();
        console.log(this.usergroups.length);
        // for (var i = 0; i < this.usergroups.length ; i++) {
        // 	Things[i]
        // }
    };
    UserGroupComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    UserGroupComponent.prototype.loadAllUserGroup = function () {
        var _this = this;
        this.userGroupService.getUserGroups().then(function (usergroups) { return _this.usergroups = usergroups; });
    };
    UserGroupComponent.prototype.toInt = function (num) {
        return +num;
    };
    return UserGroupComponent;
}());
UserGroupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-group',
        templateUrl: '/app/templates/user-group.html',
    }),
    __metadata("design:paramtypes", [index_1.UserGroupService,
        index_1.UserService,
        index_1.AlertService])
], UserGroupComponent);
exports.UserGroupComponent = UserGroupComponent;
//# sourceMappingURL=user-group.component.js.map