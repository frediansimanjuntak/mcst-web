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
        this.items = [];
        this.user = [];
        this.chief = {};
        this._disabledV = '0';
        this.disabled = false;
        this.model = {};
        this.options1 = [];
    }
    EditUserGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getUsers();
        this.myForm = this.formbuilder.group({
            description: ['', forms_1.Validators.required],
            chief: [''],
            users: this.formbuilder.array([]),
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.userGroupService
                .getUserGroup(this.id)
                .then(function (usergroup) {
                _this.usergroup = usergroup;
                _this.chief.text = _this.users.find(function (myObj) { return myObj._id === _this.usergroup.chief; }).username;
                _this.chief.id = _this.usergroup.chief;
                _this.chiefField = true;
                // for (let i = 0; i < this.usergroup.users.length; i++) {
                //     this.user[i].text = this.users.find(myObj => myObj._id ===  this.usergroup.users[i] ).username;
                //     this.user[i].id = this.usergroup.users[i];
                // }
                var numOptions = _this.usergroup.users.length;
                var opts = new Array(numOptions);
                var _loop_1 = function (i) {
                    opts[i] = {
                        id: _this.usergroup.users[i],
                        text: _this.users.find(function (myObj) { return myObj._id === _this.usergroup.users[i]; }).username,
                    };
                };
                for (var i = 0; i < numOptions; i++) {
                    _loop_1(i);
                }
                _this.user = opts.slice(0);
            });
        }
        ;
    };
    Object.defineProperty(EditUserGroupComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    EditUserGroupComponent.prototype.selected = function (value) {
        // console.log('Selected value is: ', value);
    };
    EditUserGroupComponent.prototype.removed = function (value) {
        // console.log('Removed value is: ', value);
    };
    EditUserGroupComponent.prototype.refreshValueUser = function (value) {
        this.user = value;
    };
    EditUserGroupComponent.prototype.refreshValueChief = function (value) {
        this.chief = value;
        if (this.chief.length == 0) {
            this.chiefField = false;
        }
        else {
            this.chiefField = true;
        }
    };
    EditUserGroupComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(',');
    };
    EditUserGroupComponent.prototype.initUser = function () {
        return this.formbuilder.group({});
    };
    EditUserGroupComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.users = users;
            var numOptions = _this.users.length;
            var opts = new Array(numOptions);
            for (var i = 0; i < numOptions; i++) {
                opts[i] = {
                    id: _this.users[i]._id,
                    text: _this.users[i].username
                };
            }
            _this.myOptions = opts.slice(0);
            _this.items = _this.myOptions;
        });
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
    EditUserGroupComponent.prototype.createUserGroup = function () {
        this.model.users = [];
        for (var i = 0; i < this.user.length; i++) {
            this.model.users[i] = this.user[i].id;
        }
        this.model.chief = this.chief.id;
        console.log(this.model);
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
        if (this.chiefField && this.usergroup.description != '') {
            this.usergroup.users = [];
            for (var i = 0; i < this.user.length; i++) {
                this.usergroup.users[i] = this.user[i].id;
            }
            this.usergroup.chief = this.chief.id;
            console.log(this.usergroup);
        }
        //     this.userGroupService.update(this.usergroup)
        //     .then(
        //         response => {
        //             this.alertService.success('Update Usergroup successful', true);
        //             this.router.navigate(['/user']);
        //         },
        //         error=> { 
        //             this.alertService.error(error);
        //         }
        //     );
    };
    return EditUserGroupComponent;
}());
__decorate([
    core_1.Input('group'),
    __metadata("design:type", index_1.UserGroup)
], EditUserGroupComponent.prototype, "usergroup", void 0);
EditUserGroupComponent = __decorate([
    core_1.Component({
        moduleId: module.id.replace("/dist/", "/"),
        selector: 'edit-user-group',
        templateUrl: '/app/templates/edit-user-group.html',
        styleUrls: ['../../templates/styles/ng2-select.css']
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