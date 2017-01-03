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
var index_1 = require("../../models/index");
var index_2 = require("../../services/index");
var forms_1 = require("@angular/forms");
require("../../rxjs-operators");
require("rxjs/add/operator/switchMap");
var EditAnnouncementComponent = (function () {
    function EditAnnouncementComponent(router, anouncementService, alertService, formbuilder, route) {
        this.router = router;
        this.anouncementService = anouncementService;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.route = route;
        this.model = {};
        this.autoPostOnDateOptions = {};
        this.validTillDateOptions = {};
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditAnnouncementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.autoPostOnDateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'No auto post (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };
        this.validTillDateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'Forever (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };
        this.model.auto_post_on = "no";
        this.model.valid_till = "forever";
        this.model.publish = false;
        this.model.sticky = 'no';
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.anouncementService
                .getAnnouncement(this.id)
                .then(function (announcement) {
                _this.announcement = announcement;
                if (_this.announcement.auto_post_on != "no") {
                    _this.model.auto_post_on = _this.announcement.auto_post_on;
                }
                else {
                    _this.model.auto_post_on = "";
                }
                if (_this.announcement.valid_till != "forever") {
                    _this.model.valid_till = _this.announcement.valid_till;
                }
                else {
                    _this.model.valid_till = "";
                }
            });
        }
        ;
    };
    EditAnnouncementComponent.prototype.createAnnouncement = function (event) {
        if (this.model.auto_post_on == "") {
            this.model.auto_post_on = "no";
        }
        if (this.model.valid_till == "") {
            this.model.valid_till = "forever";
        }
        console.log(this.model);
        // this.anouncementService.create(this.model)
        // .subscribe(
        //     data => {
        //         this.alertService.success('Create newsletter successful', true);
        //         this.router.navigate(['/newsletter']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The Newsletter could not be save, server Error.`);
        //     }
        // );
    };
    EditAnnouncementComponent.prototype.autoPostOnDateChanged = function (event) {
        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        this.model.auto_post_on = event.formatted.replace(/-/g, "/");
        ;
    };
    EditAnnouncementComponent.prototype.validTillDateChanged = function (event) {
        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        this.model.valid_till = event.formatted.replace(/-/g, "/");
        ;
    };
    EditAnnouncementComponent.prototype.updateAnnouncement = function () {
        if (this.model.auto_post_on == "") {
            this.announcement.auto_post_on = "no";
        }
        else {
            this.announcement.auto_post_on = this.model.auto_post_on;
        }
        if (this.model.valid_till == "") {
            this.announcement.valid_till = "forever";
        }
        else {
            this.announcement.valid_till = this.model.valid_till;
        }
        console.log(this.announcement);
        // this.anouncementService.update(this.model)
        // .subscribe(
        // 	response => {
        // 		if(response.error) { 
        //                this.alertService.error(response.error);
        //            } else {
        //                // EmitterService.get(this.userList).emit(response.users);
        //                    this.alertService.success('Update newsletter successful', true);
        //                    this.router.navigate(['/newsletter']);
        //            }
        //           },
        //           error=> { 
        //           	this.alertService.error(error);
        //           }
        //       );
    };
    EditAnnouncementComponent.prototype.toAnnouncement = function () {
        this.router.navigate(['/announcement']);
    };
    return EditAnnouncementComponent;
}());
__decorate([
    core_1.Input('group'),
    __metadata("design:type", index_1.Announcement)
], EditAnnouncementComponent.prototype, "announcement", void 0);
EditAnnouncementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-announcement',
        templateUrl: '/app/templates/edit-announcement.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_2.AnnouncementService,
        index_2.AlertService,
        forms_1.FormBuilder,
        router_1.ActivatedRoute])
], EditAnnouncementComponent);
exports.EditAnnouncementComponent = EditAnnouncementComponent;
//# sourceMappingURL=edit-announcement.component.js.map