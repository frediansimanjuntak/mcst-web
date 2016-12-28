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
var forms_1 = require("@angular/forms");
var index_1 = require("../../models/index");
var index_2 = require("../../services/index");
// import { EqualValidator } from './equal-validator.directive';
require("../../rxjs-operators");
require("rxjs/add/operator/switchMap");
var EditUserGroupComponent = (function () {
    function EditUserGroupComponent(router, userGroupService, userService, alertService, formbuilder, route) {
        this.router = router;
        this.userGroupService = userGroupService;
        this.userService = userService;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.route = route;
        this.model = {};
        this.users = [];
    }
    EditUserGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this.formbuilder.group({
            description: ['', forms_1.Validators.required],
            chief: ['', forms_1.Validators.required],
            users: this.formbuilder.array([]),
        });
        // let self = this; 
        // this.userService.getAll()
        //     .subscribe(user => {
        //         self.users = user;
        //         console.log(user);
        //     });
        // if( this.id != null) {
        //     this.userService.getById(this.id).subscribe(user => {this.users = user;console.log(user);});
        // };
        // this.unitService.getAll("585b36585d3cc41224fe518a")
        //     .subscribe(unit => {
        //         self.unit = unit;
        //         console.log(unit);
        //     });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.getUsers();
        console.log(this.users);
        this.addUser();
        if (this.id != null) {
            this.userGroupService.getUserGroup(this.id).then(function (usergroup) { _this.userGroup = usergroup; console.log(userGroup); });
        }
        ;
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    };
    EditUserGroupComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    EditUserGroupComponent.prototype.initUser = function () {
        return this.formbuilder.group({});
    };
    EditUserGroupComponent.prototype.addUser = function () {
        var control = this.myForm.controls['users'];
        var userCtrl = this.initUser();
        control.push(userCtrl);
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    };
    EditUserGroupComponent.prototype.removeUser = function (i) {
        var control = this.myForm.controls['users'];
        control.removeAt(i);
    };
    EditUserGroupComponent.prototype.createUserGroup = function (model) {
        // call API to save
        // ...
        console.log(model);
        //   this.userGroupService.create(model)
        // .then(
        //     data => {
        //         this.alertService.success('Create usergroup successful', true);
        //         this.router.navigate(['/user']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
    };
    EditUserGroupComponent.prototype.updateUserGroup = function () {
        var _this = this;
        this.userGroupService.update(this.userGroup)
            .then(function (response) {
            _this.alertService.success('Update Usergroup successful', true);
            _this.router.navigate(['/user']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditUserGroupComponent;
}());
__decorate([
    core_1.Input('group'),
    __metadata("design:type", index_1.UserGroup)
], EditUserGroupComponent.prototype, "userGroup", void 0);
EditUserGroupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-user-group',
        templateUrl: '/app/templates/edit-user-group.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_2.UserGroupService,
        index_2.UserService,
        index_2.AlertService,
        forms_1.FormBuilder,
        router_1.ActivatedRoute])
], EditUserGroupComponent);
exports.EditUserGroupComponent = EditUserGroupComponent;
//# sourceMappingURL=edit-user-group.component.js.map