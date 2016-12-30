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
var AnnouncementComponent = (function () {
    function AnnouncementComponent(router, announcementService, alertService) {
        this.router = router;
        this.announcementService = announcementService;
        this.alertService = alertService;
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
    AnnouncementComponent.prototype.publishAnnouncement = function (announcement) {
        console.log(announcement);
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
        this.router.navigate(['/anouncement/edit', anouncement._id]);
    };
    return AnnouncementComponent;
}());
AnnouncementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'newsletter',
        templateUrl: '/app/templates/announcement.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.AnnouncementService,
        index_1.AlertService])
], AnnouncementComponent);
exports.AnnouncementComponent = AnnouncementComponent;
//# sourceMappingURL=announcement.component.js.map