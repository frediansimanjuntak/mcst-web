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
require("rxjs/add/operator/switchMap");
// import { User } from '../../models/index';
// import { Unit } from '../../models/unit.interface';
var EditUnitComponent = (function () {
    function EditUnitComponent(router, route, unitservice, alertService, formbuilder) {
        this.router = router;
        this.route = route;
        this.unitservice = unitservice;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.model = {};
        this.events = []; // use later to display form changes
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditUnitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.developmentId = '585b36585d3cc41224fe518a';
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.unitservice
                .getDevelopments()
                .then(function (development) {
                _this.units = development[0].properties;
                _this.unit = _this.units.find(function (unit) { return unit._id === _this.id; });
                console.log(_this.unit);
                _this.myForm = _this.formbuilder.group({
                    address: _this.formbuilder.group({
                        unit_no: [_this.unit.address.unit_no],
                        unit_no_2: [_this.unit.address.unit_no_2],
                        block_no: [_this.unit.address.block_no],
                        street_name: [_this.unit.address.street_name],
                        postal_code: [_this.unit.address.postal_code],
                        country: [_this.unit.address.country],
                        full_address: [_this.unit.address.full_address]
                    }),
                    _id: [_this.unit._id],
                    status: [_this.unit.status],
                    created_by: ['583e4e9dd97c97149884fef5']
                });
            });
        }
        else {
            this.myForm = this.formbuilder.group({
                address: this.formbuilder.group({
                    unit_no: [''],
                    unit_no_2: [''],
                    block_no: [''],
                    street_name: [''],
                    postal_code: [''],
                    country: [''],
                    full_address: ['']
                }),
                status: [''],
                created_by: ['583e4e9dd97c97149884fef5']
            });
        }
        // this.subcribeToFormChanges();
    };
    EditUnitComponent.prototype.subcribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.myForm.statusChanges;
        var myFormValueChanges$ = this.myForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    // save(model: Unit, isValid: boolean) {
    //     this.submitted = true; // set form submit to true
    //     // check if model is valid
    //     // if valid, call API to save customer
    //     console.log(model, isValid);
    // }
    EditUnitComponent.prototype.createUnit = function (model) {
        var _this = this;
        this.submitted = true;
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        console.log(model);
        this.unitservice.create(model)
            .subscribe(function (data) {
            _this.alertService.success('Create Unit successful', true);
            _this.router.navigate(['/unit']);
        }, function (error) {
            console.log(error);
            alert("The Unit could not be save, server Error.");
        });
    };
    EditUnitComponent.prototype.updateUnit = function (model) {
        console.log(model);
        // this.unitservice.update(model)
        // .then(
        //     response => {
        //         this.alertService.success('Update development successful', true);
        //         this.router.navigate(['/development']);
        //     },
        //     error => { 
        //         this.alertService.error(error);
        //     }
        // );
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
        router_1.ActivatedRoute,
        index_1.UnitService,
        index_1.AlertService,
        forms_1.FormBuilder])
], EditUnitComponent);
exports.EditUnitComponent = EditUnitComponent;
//# sourceMappingURL=edit-unit.component.js.map