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
var http_1 = require("@angular/http");
var index_1 = require("../../services/index");
require("../../rxjs-operators");
var NewsletterComponent = (function () {

    function NewsletterComponent(newsletterservice, alertService) {

        this.newsletterservice = newsletterservice;
        this.alertService = alertService;
        this.newsletters = [];
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
    NewsletterComponent.prototype.ngOnInit = function () {
        this.loadAllNewsletters();
    };
    NewsletterComponent.prototype.toInt = function (num) {
        return +num;
    };
    NewsletterComponent.prototype.deleteNewsletter = function (id) {
        var _this = this;
        this.newsletterservice.delete(id)
            .subscribe(function (response) {
            if (response.error) {
                alert("The user could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Create user successful', true);
                _this.loadAllNewsletters();
            }
        }, function (error) {
            alert("The Newsletter could not be deleted, server Error.");
        });
    };
    NewsletterComponent.prototype.loadAllNewsletters = function () {
        var _this = this;
        this.newsletterservice.getAll()
            .subscribe(function (newsletters) {
            setTimeout(function () {
                _this.data = newsletters.json();
                console.log(_this.data);
            }, 1000);
        });
    };
    NewsletterComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    return NewsletterComponent;
}());
NewsletterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'newsletter',
        templateUrl: '../../templates/newsletter.html',
    }),
    __metadata("design:paramtypes", [http_1.Http, index_1.NewsletterService, index_1.AlertService])
], NewsletterComponent);
exports.NewsletterComponent = NewsletterComponent;
//# sourceMappingURL=newsletter.component.js.map