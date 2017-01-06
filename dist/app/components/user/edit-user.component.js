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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var index_1 = require("../../services/index");
var index_2 = require("../../models/index");
require("rxjs/add/operator/switchMap");
require("../../rxjs-operators");
var EditUserComponent = (function () {
    // developmentID: string;
    function EditUserComponent(router, userService, route, alertService, formbuilder, unitService) {
        this.router = router;
        this.userService = userService;
        this.route = route;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.unitService = unitService;
        this.model = {};
        this.developmentID = "585b36585d3cc41224fe518a";
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this.formbuilder.group({
            username: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            confirmpassword: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            role: ['', forms_1.Validators.required],
            default_property: this.formbuilder.group({
                development: ['', forms_1.Validators.required],
                property: ['', forms_1.Validators.required],
                role: ['', forms_1.Validators.required]
            }),
            rented_property: this.formbuilder.group({
                development: [''],
                property: ['']
            }),
            owned_property: this.formbuilder.array([]),
            authorized_property: this.formbuilder.array([]),
            active: ['', forms_1.Validators.required],
            default_development: [''],
            authorized_development: ['']
        });
        var self = this;
        this.unitService.getDevelopment("1")
            .then(function (unit) {
            self.unit = unit;
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.userService.getUser(this.id)
                .then(function (user) {
                _this.user = user;
                _this.myForm = _this.formbuilder.group({
                    _id: [''],
                    username: ['', forms_1.Validators.required],
                    email: ['', forms_1.Validators.required],
                    password: ['', forms_1.Validators.required],
                    phone: ['', forms_1.Validators.required],
                    role: ['', forms_1.Validators.required],
                    default_property: _this.formbuilder.group({
                        development: ['', forms_1.Validators.required],
                        property: ['', forms_1.Validators.required],
                        role: ['', forms_1.Validators.required]
                    }),
                    details: _this.formbuilder.group({
                        first_name: [''],
                        last_name: [''],
                        identification_type: [''],
                        identification_no: [''],
                        identification_proof: _this.formbuilder.group({
                            front: [''],
                            back: ['']
                        })
                    }),
                    rented_property: _this.formbuilder.group({
                        development: [''],
                        property: ['']
                    }),
                    owned_property: _this.formbuilder.array([]),
                    authorized_property: _this.formbuilder.array([]),
                    active: ['', forms_1.Validators.required],
                    default_development: [''],
                    authorized_development: [''],
                    user_group: [''],
                    created_at: [''],
                });
                for (var _i = 0, _a = _this.user.owned_property; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    var control = _this.myForm.controls['owned_property'];
                    control.push(_this.initOwned());
                }
                for (var _b = 0, _c = _this.user.authorized_property; _b < _c.length; _b++) {
                    var entry = _c[_b];
                    var control = _this.myForm.controls['authorized_property'];
                    control.push(_this.initAuthorized());
                }
                _this.myForm.setValue(_this.user);
            });
        }
        ;
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    };
    EditUserComponent.prototype.initOwned = function () {
        return this.formbuilder.group({
            development: ['585b36585d3cc41224fe518a'],
            property: ['']
        });
    };
    EditUserComponent.prototype.initAuthorized = function () {
        return this.formbuilder.group({
            development: ['585b36585d3cc41224fe518a'],
            property: ['']
        });
    };
    EditUserComponent.prototype.addOwned = function () {
        var control = this.myForm.controls['owned_property'];
        var ownedCtrl = this.initOwned();
        control.push(ownedCtrl);
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    };
    EditUserComponent.prototype.removeOwned = function (i) {
        var control = this.myForm.controls['owned_property'];
        control.removeAt(i);
    };
    EditUserComponent.prototype.addAuthorized = function () {
        var control = this.myForm.controls['authorized_property'];
        var authCtrl = this.initAuthorized();
        control.push(authCtrl);
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    };
    EditUserComponent.prototype.removeAuthorized = function (i) {
        var control = this.myForm.controls['authorized_property'];
        control.removeAt(i);
    };
    EditUserComponent.prototype.createUser = function (model) {
        var _this = this;
        this.userService.create(model)
            .then(function (data) {
            _this.alertService.success('Create user successful', true);
            _this.router.navigate(['/user']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditUserComponent.prototype.updateUser = function (user) {
        console.log(user);
        // this.userService.update(this.user)
        // .then(
        //     response => {
        //         this.alertService.success('Update User successful', true);
        //         this.router.navigate(['/user']);
        //  },
        //     error=> { 
        //     	this.alertService.error(error);
        //     }
        // );
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
__decorate([
    core_1.Input('group'),
    __metadata("design:type", index_2.User)
], EditUserComponent.prototype, "user", void 0);
EditUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: '/app/templates/edit-user.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UserService,
        router_1.ActivatedRoute,
        index_1.AlertService,
        forms_1.FormBuilder,
        index_1.UnitService])
], EditUserComponent);
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edit-user.component.js.map