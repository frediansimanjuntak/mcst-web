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
var UnitComponent = (function () {
    function UnitComponent(unitservice, alertService) {
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
        this.tabs = [
            { title: 'Dynamic Title 1', content: '' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
            { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true },
            { title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass' }
        ];
    }
    UnitComponent.prototype.ngOnInit = function () {
        this.developmentId = '585a07d7870e2713c857b802';
        this.loadAllUnits();
        this.cols = [
            { field: 'date', header: 'Date' },
            { field: 'title', header: 'Title' },
            { field: 'uploaded_on', header: 'Uploaded on' },
            { field: 'uploaded_by', header: 'Uploaded by' },
            { field: 'attachment', header: 'Attachment' },
        ];
    };
    UnitComponent.prototype.toInt = function (num) {
        return +num;
    };
    UnitComponent.prototype.deleteUnit = function (newsletter) {
        var _this = this;
        this.unitservice.delete(newsletter._id, this.developmentId)
            .then(function (response) {
            if (response) {
                console.log(response);
                // console.log(response.error());
                alert("The Newsletter could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Create user successful', true);
                alert("Delete Newsletter successful");
                _this.ngOnInit();
            }
        }, function (error) {
            console.log(error);
            alert("The Newsletter could not be deleted, server Error.");
        });
    };
    // releaseNewsletter(newsletter: any){
    //   newsletter.released = 'true';
    //   console.log(newsletter);
    //   this.newsletterservice.update(newsletter)
    //   .subscribe(
    //     response => {
    //       if(response.error) { 
    //                 this.alertService.error(response.error);
    //             } else {
    //                 // EmitterService.get(this.userList).emit(response.users);
    //                    this.alertService.success('Release newsletter successful', true);
    //                    this.ngOnInit()
    //             }
    //           },
    //           error=> { 
    //             this.alertService.error(error);
    //           }
    //       );
    // }
    UnitComponent.prototype.loadAllUnits = function () {
        var _this = this;
        this.unitservice.getAll()
            .subscribe(function (data) {
            setTimeout(function () {
                _this.data = data.find(function (data) { return data._id === _this.developmentId; });
                // this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' ); 
                // this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
                console.log(_this.dataAgm);
            }, 1000);
        });
    };
    UnitComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    return UnitComponent;
}());
UnitComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'unit',
        templateUrl: '/app/templates/unit.html',
    }),
    __metadata("design:paramtypes", [index_1.UnitService, index_1.AlertService])
], UnitComponent);
exports.UnitComponent = UnitComponent;
//# sourceMappingURL=unit.component.js.map