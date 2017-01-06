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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';
var VisitComponent = (function () {
    function VisitComponent(router, visitService, alertService, route, location, formbuilder) {
        this.router = router;
        this.visitService = visitService;
        this.alertService = alertService;
        this.route = route;
        this.location = location;
        this.formbuilder = formbuilder;
        this.visits = [];
        this.visitActive = [];
        this.DateOptions = {};
        this.model = {};
        this.checked = [];
        this.selectedValues = [];
        this.btnArchive = false;
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.check_in = [
            { value: 'F', display: 'Female' },
            { value: 'M', display: 'Male' }
        ];
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
        this.tabs = [
            { title: 'Dynamic Title 1', content: '' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
            { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true },
            { title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass' }
        ];
        this.activeDate = this.activeDateFull = new Date();
    }
    VisitComponent.prototype.ngOnInit = function () {
        this.developmentId = '585b36585d3cc41224fe518a';
        if (typeof this.activeDate !== "string") {
            this.activeDate = this.convertDate(this.activeDate);
        }
        this.loadVisits();
        this.myForm = this.formbuilder.group({
            property: ['', forms_1.Validators.required],
            visitor: this.formbuilder.group({
                full_name: ['', forms_1.Validators.required],
<<<<<<< Updated upstream
                vehicle: ['', forms_1.Validators.required],
                pass: ['', forms_1.Validators.required],
            }),
            purpose: ['', forms_1.Validators.required],
            remarks: ['', forms_1.Validators.required],
            check_in: [forms_1.Validators.required],
=======
                vehicle: [''],
                pass: [''],
            }),
            purpose: [''],
            remarks: [''],
            check_in: ['', forms_1.Validators.required],
>>>>>>> Stashed changes
        });
        this.DateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            editableDateField: false,
            // customPlaceholderTxt: 'No auto post (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };
    };
    VisitComponent.prototype.convertDate = function (date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
    };
    VisitComponent.prototype.toInt = function (num) {
        return +num;
    };
    VisitComponent.prototype.deletePetition = function (petition) {
        console.log(petition);
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
<<<<<<< Updated upstream
    VisitComponent.prototype.checkIn = function (visit) {
        this.visit = visit;
        console.log(visit);
    };
=======
    VisitComponent.prototype.preCheckIn = function (visit) {
        this.visit = visit;
        this.checkInForm = this.formbuilder.group({
            property: [{ value: visit.property, disabled: true }, forms_1.Validators.required],
            visitor: this.formbuilder.group({
                full_name: [{ value: visit.visitor.full_name, disabled: true }, forms_1.Validators.required],
                vehicle: [{ value: visit.visitor.vehicle, disabled: true }],
                pass: [visit.visitor.pass],
            }),
            purpose: [{ value: visit.purpose, disabled: true }],
            remarks: [{ value: visit.remarks, disabled: true }],
            check_in: [''],
        });
        // this.myForm.setValue(this.user); 
    };
    VisitComponent.prototype.checkOut = function (visit) {
        visit.check_out = new Date();
        console.log(visit);
    };
    VisitComponent.prototype.checkIn = function (model, isValid) {
        var _this = this;
        this.checkInSsubmitted = true;
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        model.check_in = new Date();
        if (isValid == true) {
            console.log(model);
            this.visitService.create(model)
                .subscribe(function (data) {
                _this.alertService.success('Add guest successful', true);
                _this.router.navigate(['/unit']);
            }, function (error) {
                console.log(error);
                alert("Guest register could not be save, server Error.");
            });
        }
    };
    VisitComponent.prototype.addGuest = function (model, isValid) {
        var _this = this;
        this.addSubmitted = true;
        // model.properties.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        if (model.check_in == true) {
            model.check_in = new Date();
        }
        else {
            model.check_in = '';
        }
        if (isValid == true) {
            console.log(model);
            this.visitService.create(model)
                .subscribe(function (data) {
                _this.alertService.success('Add guest successful', true);
                _this.router.navigate(['/unit']);
            }, function (error) {
                console.log(error);
                alert("Guest register could not be save, server Error.");
            });
        }
    };
>>>>>>> Stashed changes
    VisitComponent.prototype.loadVisits = function () {
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
        this.visitService.getVisits().then(function (data) {
            _this.visits = data;
            _this.visitActive = _this.visits.filter(function (data) { return data.visit_date.slice(0, 10) == _this.activeDate; });
            console.log(_this.visitActive);
<<<<<<< Updated upstream
=======
            for (var i = 0; i < _this.visitActive.length; i++) {
                _this.visitActive[i].i = i + 1;
            }
>>>>>>> Stashed changes
        });
    };
    VisitComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    VisitComponent.prototype.viewPetition = function (visit) {
        this.router.navigate(['/petition/view', visit._id]);
    };
    VisitComponent.prototype.editPetition = function (visit) {
        this.router.navigate(['/petition/edit', visit._id]);
    };
    VisitComponent.prototype.onPickerClick = function (event) {
        this.activeDate = event.formatted;
        this.loadVisits();
        // this.dateToShow = ;
    };
    VisitComponent.prototype.previousDay = function () {
        (this.activeDate = new Date()).setDate(this.activeDateFull.getDate() - 1);
        this.activeDateFull = this.activeDate;
        this.ngOnInit();
    };
    VisitComponent.prototype.nextDay = function () {
        (this.activeDate = new Date()).setDate(this.activeDateFull.getDate() + 1);
        this.activeDateFull = this.activeDate;
        console.log(this.activeDateFull);
        this.ngOnInit();
    };
    VisitComponent.prototype.goBack = function () {
        this.location.back();
    };
    return VisitComponent;
}());
VisitComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'visit',
        templateUrl: '/app/templates/visit.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.VisitService,
        index_1.AlertService,
        router_1.ActivatedRoute,
        common_1.Location,
        forms_1.FormBuilder])
], VisitComponent);
exports.VisitComponent = VisitComponent;
//# sourceMappingURL=visit.component.js.map