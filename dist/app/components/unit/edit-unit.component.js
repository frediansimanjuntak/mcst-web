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
var forms_1 = require("@angular/forms");
require("../../rxjs-operators");
var TYPES = [
    { value: 'agm', name: 'AGM' },
    { value: 'circular', name: 'Circular' },
];
var EditUnitComponent = (function () {
    function EditUnitComponent(router, unitservice, alertService, formbuilder) {
        this.router = router;
        this.unitservice = unitservice;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.developments = [];
        this.types = TYPES;
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditUnitComponent.prototype.ngOnInit = function () {
        this.myForm = this.formbuilder.group({
            newsletter: this.formbuilder.group({
                title: [''],
                description: [''],
                type: [''],
                attachment: [''],
                released: [''],
                pinned: this.formbuilder.group({
                    rank: [''],
                }),
                released_by: [''],
            })
        });
    };
    EditUnitComponent.prototype.createUnit = function () {
        var _this = this;
        this.model.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        console.log(this.model);
        this.unitservice.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Create Unit successful', true);
            _this.router.navigate(['/newsletter']);
        }, function (error) {
            console.log(error);
            alert("The Unit could not be save, server Error.");
        });
    };
    return EditUnitComponent;
}());
EditUnitComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-unit',
        templateUrl: '/app/templates/edit-unit.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.UnitService,
        index_1.AlertService,
        forms_1.FormBuilder])
], EditUnitComponent);
exports.EditUnitComponent = EditUnitComponent;
//# sourceMappingURL=edit-unit.component.js.map