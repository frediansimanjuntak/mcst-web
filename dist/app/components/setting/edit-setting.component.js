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
require("rxjs/add/operator/switchMap");
require("../../rxjs-operators");
var EditUserComponent = (function () {
    function EditUserComponent(router, userService, route, alertService, developmentService) {
        this.router = router;
        this.userService = userService;
        this.route = route;
        this.alertService = alertService;
        this.developmentService = developmentService;
        this.model = {};
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.userService.getById(this.id).subscribe(function (user) { return _this.user = user; });
        }
        ;
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    };
    EditUserComponent.prototype.updateSetting = function () {
        var _this = this;
        this.userService.update(this.user)
            .then(function (response) {
            _this.alertService.success('Update User successful', true);
            _this.router.navigate(['/user']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditUserComponent.prototype.number = function (event) {
        var pattern = /[0-9\+\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    EditUserComponent.prototype.text = function (event) {
        var pattern = /[a-z\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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
        router_1.ActivatedRoute,
        index_1.AlertService,
        index_1.DevelopmentService])
], EditUserComponent);
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-setting.component.js.map