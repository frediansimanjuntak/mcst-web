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
var DevelopmentComponent = (function () {
    function DevelopmentComponent(developmentService, alertService) {
        this.developmentService = developmentService;
        this.alertService = alertService;
        this.developments = [];
        this.model = {};
        //Table----------------------
        this.rows = [];
        this.columns = [
            { title: 'Name', name: 'name', filtering: { filterString: '', placeholder: 'Filter by name' } },
            {
                title: 'Owner',
                name: 'owner',
                sort: false,
                filtering: { filterString: '', placeholder: 'Filter by owner' }
            },
            { title: 'Description', name: 'description', sort: false }
        ];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        // public config:any = {
        //   paging: true,
        //   sorting: {columns: this.columns},
        //   filtering: {filterString: ''},
        //   className: ['table-striped', 'table-bordered']
        // };
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '', columnName: 'name' }
        };
        this.data = [];
    }
    DevelopmentComponent.prototype.ngOnInit = function () {
        this.loadAllDevelopments();
        this.onChangeTable(this.config);
    };
    DevelopmentComponent.prototype.deleteDevelopment = function (id) {
        var _this = this;
        this.developmentService.delete(id)
            .subscribe(function (response) {
            if (response.error) {
                alert("The development could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Delete development successful', true);
                _this.loadAllDevelopments();
            }
        }, function (error) {
            alert("The Development could not be deleted, server Error.");
        });
    };
    DevelopmentComponent.prototype.loadAllDevelopments = function () {
        var _this = this;
        this.developmentService.getAll().subscribe(function (developments) { _this.developments = developments; console.log(developments); });
    };
    DevelopmentComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    DevelopmentComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    DevelopmentComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        this.columns.forEach(function (column) {
            if (column.filtering) {
                filteredData = filteredData.filter(function (item) {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter(function (item) {
                return item[config.filtering.columnName].match(_this.config.filtering.filterString);
            });
        }
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name].toString().match(_this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    };
    // public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    //   if (config.filtering) {
    //     Object.assign(this.config.filtering, config.filtering);
    //   }
    //   if (config.sorting) {
    //     Object.assign(this.config.sorting, config.sorting);
    //   }
    //      this.developmentService.getAll()
    //        .subscribe(developments => {
    //           this.data =developments;
    //           this.length = this.data.length;
    //           let filteredData = this.changeFilter(this.data, this.config);
    //           let sortedData = this.changeSort(filteredData, this.config);
    //           this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    //           this.length = sortedData.length;
    //       })
    // }
    DevelopmentComponent.prototype.onChangeTable = function (config, page) {
        var _this = this;
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        this.developmentService.getAll()
            .subscribe(function (developments) {
            _this.data = developments;
            _this.length = _this.data.length;
            var filteredData = _this.changeFilter(_this.data, _this.config);
            var sortedData = _this.changeSort(filteredData, _this.config);
            _this.rows = page && config.paging ? _this.changePage(page, sortedData) : sortedData;
            _this.length = sortedData.length;
            console.log(_this.data);
        });
    };
    DevelopmentComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    return DevelopmentComponent;
}());
DevelopmentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'development',
        templateUrl: '../../templates/development.html',
    }),
    __metadata("design:paramtypes", [index_1.DevelopmentService, index_1.AlertService])
], DevelopmentComponent);
exports.DevelopmentComponent = DevelopmentComponent;
//# sourceMappingURL=development.component.js.map