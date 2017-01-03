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
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';
var AnnouncementComponent = (function () {
    function AnnouncementComponent(router, announcementService, alertService, overlay, vcRef, modal) {
        this.router = router;
        this.announcementService = announcementService;
        this.alertService = alertService;
        this.modal = modal;
        this.announcements = [];
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
        overlay.defaultViewContainer = vcRef;
    }
    AnnouncementComponent.prototype.ngOnInit = function () {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllAnnouncements();
    };
    AnnouncementComponent.prototype.toInt = function (num) {
        return +num;
    };
    AnnouncementComponent.prototype.deleteAnnouncement = function (announcement) {
        console.log(announcement);
        // this.announcementService.delete(announcement._id) 
        //   .then(
        //     response => {
        //       if(response) { 
        //         console.log(response);
        //         // console.log(response.error());
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //       } else {
        //         this.alertService.success('Create user successful', true);
        //         alert(`Delete Newsletter successful`);
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> { 
        //       console.log(error);
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //     }
        // );
    };
    AnnouncementComponent.prototype.openCustom = function (announcement) {
        // this.modal.open(PublishAnnouncementModalComponent, new PublishAnnouncementModalData(announcement));
    };
    AnnouncementComponent.prototype.openModal = function (announcement) {
        console.log(announcement);
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('Publish Announcement')
            .body("\n          {{  announcement.valid_till }}\n             <form class=\"form-horizontal col-md-6\" name=\"form\" #f=\"ngForm\" novalidate>\n                <div class=\"form-group\" >\n                    <label class=\"control-label col-sm-4\" for=\"sticky\">Sticky?:</label>\n                    <div class=\"col-sm-8\">\n                         <label><input type=\"radio\" name=\"sticky\" [checked]=\"model.sticky === 'true'\" [(ngModel)]=\"announcement.publish\" [value]=true>Yes</label>\n                        <label><input type=\"radio\" name=\"sticky\" [checked]=\"model.sticky === false\" [(ngModel)]=\"announcement.publish\" [value]=false>No</label>     \n                    </div>\n                </div>\n                <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !valid_till.valid }\">\n                    <label class=\"control-label col-sm-4\" for=\"valid_till\">Valid till :</label>\n                    <div class=\"col-sm-8\">\n                        <input type=\"text\" class=\"form-control\" name=\"valid_till\" [(ngModel)]=\"announcement.valid_till\" #valid_till=\"ngModel\" required />\n                        <span *ngIf=\"f.submitted && !valid_till.valid\" class=\"help-block\">valid_till is required</span>\n                         <!--   <ng2-datepicker [(ngModel)]=\"announcement.valid_till\"></ng2-datepicker> -->\n                    </div>\n                </div>\n                <div class=\"form-group pull-right\">\n                    <button [disabled]=\"loading\" (click)=\"publishAnnouncement()\" class=\"btn btn-primary\">Create</button>\n                    <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n                    <a [routerLink]=\"['/announcement']\" class=\"btn btn-info\">Cancel</a>\n                </div>\n            </form>     \n\n           ")
            .open();
        // this.announcementService.publish(announcement._id, this.developmentId) 
        //     .then(
        //       response => {
        //         if(response) { 
        //           console.log(response);
        //           // console.log(response.error());
        //           alert(`The Newsletter could not be release, server Error.`);
        //         } else {
        //           this.alertService.success('Release Newsletter successful', true);
        //           alert(`Release Newsletter successful`);
        //           this.ngOnInit()
        //         }
        //       },
        //       error=> { 
        //         console.log(error);
        //           alert(`The Newsletter could not be release, server Error.`);
        //       }
        //   );
    };
    AnnouncementComponent.prototype.publishAnnouncement = function () {
    };
    AnnouncementComponent.prototype.loadAllAnnouncements = function () {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          = data.find(data => data._id === this.developmentId );
        //             this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' ); 
        //             this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
        //             console.log(this.dataAgm);
        //         }, 1000);
        //     });
        var _this = this;
        this.announcementService.getAnnouncements().then(function (data) {
            _this.announcements = data;
            _this.announcementsDrafted = _this.announcements.filter(function (data) { return data.publish === false; });
            _this.announcementsPublished = _this.announcements.filter(function (data) { return data.publish === true; });
        });
    };
    AnnouncementComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    AnnouncementComponent.prototype.editAnnouncement = function (anouncement) {
        this.router.navigate(['/announcement/edit', anouncement._id]);
    };
    return AnnouncementComponent;
}());
AnnouncementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'announcement',
        templateUrl: '/app/templates/announcement.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.AnnouncementService,
        index_1.AlertService, typeof (_a = typeof angular2_modal_1.Overlay !== "undefined" && angular2_modal_1.Overlay) === "function" && _a || Object, core_1.ViewContainerRef, typeof (_b = typeof bootstrap_1.Modal !== "undefined" && bootstrap_1.Modal) === "function" && _b || Object])
], AnnouncementComponent);
exports.AnnouncementComponent = AnnouncementComponent;
var _a, _b;
//# sourceMappingURL=announcement.component.js.map