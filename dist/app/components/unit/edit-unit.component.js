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
        this.status = [
            { value: 'inactive', name: 'Inactive' },
            { value: 'active', name: 'Active' }
        ];
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditUnitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.developmentId = '585b36585d3cc41224fe518a';
        this.myForm = this.formbuilder.group({
            address: this.formbuilder.group({
                unit_no: ['', forms_1.Validators.required],
                unit_no_2: ['', forms_1.Validators.required],
                block_no: ['', forms_1.Validators.required],
                street_name: ['', forms_1.Validators.required],
                postal_code: ['', forms_1.Validators.required],
                country: ['', forms_1.Validators.required],
                full_address: ['', forms_1.Validators.required]
            }),
            status: ['', forms_1.Validators.required],
            created_by: ['583e4e9dd97c97149884fef5']
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.unitservice
                .getDevelopments()
                .then(function (development) {
                _this.units = development[0].properties;
                _this.unit = _this.units.find(function (unit) { return unit._id === _this.id; });
            });
        }
    };
    EditUnitComponent.prototype.createUnit = function (model, isValid) {
        var _this = this;
        this.submitted = true;
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        if (isValid == true) {
            console.log(model);
            this.unitservice.create(model)
                .subscribe(function (data) {
                _this.alertService.success('Create Unit successful', true);
                _this.router.navigate(['/unit']);
            }, function (error) {
                console.log(error);
                alert("The Unit could not be save, server Error.");
            });
        }
    };
    EditUnitComponent.prototype.updateUnit = function () {
        console.log(this.unit);
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