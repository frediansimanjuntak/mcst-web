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
var NewsletterComponent = (function () {
    function NewsletterComponent(newsletterservice) {
        this.newsletterservice = newsletterservice;
        this.newsletters = [];
        this.model = {};
        this.tabs = [
            { title: 'Dynamic Title 1', content: '' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
            { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true },
            { title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass' }
        ];
        //Table----------------------
        this.rows = [];
        this.columns = [
            { title: 'Title', name: 'title', filtering: { filterString: '', placeholder: 'Filter by name' } },
            {
                title: 'Message',
                name: 'message',
                sort: false,
                filtering: { filterString: '', placeholder: 'Filter by Email' }
            },
            { title: 'Sticky', className: ['phone-header', 'text-success'], name: 'sticky', sort: false },
            { title: 'Auto post on', name: 'auto_post_on', sort: '', filtering: { filterString: '', placeholder: 'Filter by role.' } },
            { title: 'Valid till', className: 'text-warning', name: 'valid till' },
            { title: 'Created on', className: 'text-warning', name: 'created n' }
        ];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
        this.data = this.newsletters;
    }
    NewsletterComponent.prototype.ngOnInit = function () {
        this.loadAllNewsletters();
        this.onChangeTable(this.config);
    };
    NewsletterComponent.prototype.deleteUser = function (id) {
        //      this.newsletterservice.delete(id) 
        //      // .subscribe(() => { this.loadAllUsers() });
        //      .subscribe(
        // response => {
        // 	if(response.error) { 
        //               alert(`The development could not be deleted, server Error.`);
        //           } else {
        //                  this.alertService.success('Delete development successful', true);
        //               this.loadAllNewsletters()
        //           }
        //          },
        //          error=> { 
        //              alert(`The Development could not be deleted, server Error.`);
        //          }
        //      );
    };
    NewsletterComponent.prototype.loadAllNewsletters = function () {
        var _this = this;
        this.newsletterservice.getAll().subscribe(function (newsletters) { _this.newsletters = newsletters; console.log(newsletters); });
    };
    NewsletterComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    NewsletterComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    NewsletterComponent.prototype.changeSort = function (data, config) {
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
    NewsletterComponent.prototype.changeFilter = function (data, config) {
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
    NewsletterComponent.prototype.onChangeTable = function (config, page) {
        var _this = this;
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        this.newsletterservice.getNewsletter()
            .subscribe(function (Response) {
            _this.data = languages;
            _this.length = _this.data.length;
            var filteredData = _this.changeFilter(_this.data, _this.config);
            var sortedData = _this.changeSort(filteredData, _this.config);
            _this.rows = page && config.paging ? _this.changePage(page, sortedData) : sortedData;
            _this.length = sortedData.length;
        });
    };
    NewsletterComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    return NewsletterComponent;
}());
NewsletterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'newsletter',
        templateUrl: '../../templates/newsletter.html',
    }),
    __metadata("design:paramtypes", [index_1.NewsletterService])
], NewsletterComponent);
exports.NewsletterComponent = NewsletterComponent;
//# sourceMappingURL=newsletter.component.js.map