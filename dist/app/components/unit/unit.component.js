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
require("../../rxjs-operators");
var UnitComponent = (function () {
    function UnitComponent(router, unitservice, alertService) {
        this.router = router;
        this.unitservice = unitservice;
        this.alertService = alertService;
        this.units = [];
        this.model = {};
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
    }
    UnitComponent.prototype.ngOnInit = function () {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllUnits();
        this.cols = [
            { field: 'unit_no', header: 'Unit No' },
            { field: 'unit_no_2', header: 'Unit No 2' },
            { field: 'block_no', header: 'Block No' },
            { field: 'street_name', header: 'Street Name' },
            { field: 'postal_code', header: 'Postal Code' },
            { field: 'country', header: 'Country' },
            { field: 'full_address', header: 'Full Address' },
            { field: 'status', header: 'Status' }
        ];
    };
    UnitComponent.prototype.toInt = function (num) {
        return +num;
    };
    UnitComponent.prototype.deleteUnit = function (unit) {
        var _this = this;
        console.log(unit);
        this.unitservice.delete(unit._id, this.developmentId)
            .then(function (response) {
            if (response) {
                console.log(response);
                // console.log(response.error());
                alert("The Unit could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Delete Unit successful', true);
                alert("Delete Unit successful");
                _this.ngOnInit();
            }
        }, function (error) {
            console.log(error);
            alert("The Unit could not be deleted, server Error.");
        });
    };
    UnitComponent.prototype.loadAllUnits = function () {
        var _this = this;
        this.unitservice.getAll()
            .subscribe(function (data) {
            setTimeout(function () {
                _this.data = data.find(function (data) { return data._id === _this.developmentId; });
                _this.dataUnit = _this.data.properties;
                // this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
                console.log(_this.dataUnit);
            }, 1000);
        });
    };
    UnitComponent.prototype.editUnit = function (unit) {
        this.router.navigate(['/unit/edit', unit._id]);
    };
    return UnitComponent;
}());
UnitComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'unit',
        templateUrl: '/app/templates/unit.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.UnitService, index_1.AlertService])
], UnitComponent);
exports.UnitComponent = UnitComponent;
//# sourceMappingURL=unit.component.js.map