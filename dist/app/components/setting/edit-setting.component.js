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
var EditSettingComponent = (function () {
    function EditSettingComponent(router, userService, route, alertService, developmentService) {
        this.router = router;
        this.userService = userService;
        this.route = route;
        this.alertService = alertService;
        this.developmentService = developmentService;
        this.model = {};
    }
    EditSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.userService.getUser(this.id).then(function (user) { return _this.user = user; });
        }
        ;
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    };
    EditSettingComponent.prototype.updateSetting = function () {
        var _this = this;
        this.user.details.identification_proof.front = this.model.front;
        this.user.details.identification_proof.back = this.model.back;
        console.log(this.user);
        this.userService.update(this.user)
            .then(function (response) {
            _this.alertService.success('Update User successful', true);
            _this.router.navigate(['/user']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditSettingComponent.prototype.number = function (event) {
        var pattern = /[0-9\+\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    EditSettingComponent.prototype.text = function (event) {
        var pattern = /[a-z\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    EditSettingComponent.prototype.onChange = function (event) {
        var files = [].slice.call(event.target.files);
        this.model.front = files;
    };
    EditSettingComponent.prototype.onChange1 = function (event) {
        var files = [].slice.call(event.target.files);
        this.model.back = files;
    };
    EditSettingComponent.prototype.remove = function (i) {
        this.model.front.splice(i, 1);
    };
    EditSettingComponent.prototype.remove1 = function (i) {
        this.model.back.splice(i, 1);
    };
    return EditSettingComponent;
}());
EditSettingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/templates/edit-setting.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        router_1.ActivatedRoute,
        index_1.AlertService,
        index_1.DevelopmentService])
], EditSettingComponent);
exports.EditSettingComponent = EditSettingComponent;
//# sourceMappingURL=edit-setting.component.js.map