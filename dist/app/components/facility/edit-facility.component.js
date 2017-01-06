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
var forms_1 = require("@angular/forms");
var index_1 = require("../../models/index");
var index_2 = require("../../services/index");
require("../../rxjs-operators");
require("rxjs/add/operator/switchMap");
var EditFacilityComponent = (function () {
    function EditFacilityComponent(router, facilityService, alertService, formbuilder, route) {
        this.router = router;
        this.facilityService = facilityService;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.route = route;
        this.model = {};
        this.days = [
            { value: 'monday', name: 'Monday' },
            { value: 'tuesday', name: 'Tuesday' },
            { value: 'wednesday', name: 'Wednesday' },
            { value: 'thursday', name: 'Thursday' },
            { value: 'friday', name: 'Friday' },
            { value: 'saturday', name: 'Saturday' },
            { value: 'sunday', name: 'Sunday' },
        ];
    }
    EditFacilityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this.formbuilder.group({
            _id: [''],
            name: ['', forms_1.Validators.required],
            development: ['123123', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            facility_type: ['', forms_1.Validators.required],
            payment_type: ['', forms_1.Validators.required],
            booking_type: ['', forms_1.Validators.required],
            schedule: this.formbuilder.array([]),
            status: ['', forms_1.Validators.required],
            maintenance_start: [''],
            maintenance_end: [''],
            created_by: [''],
            created_at: ['']
        });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.facilityService.getFacility(this.id)
                .then(function (facility) {
                _this.facility = facility;
                for (var _i = 0, _a = _this.facility.schedule; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    var control = _this.myForm.controls['schedule'];
                    control.push(_this.initSchedule());
                }
                _this.myForm.setValue(_this.facility);
            });
        }
    };
    EditFacilityComponent.prototype.initSchedule = function () {
        return this.formbuilder.group({
            day: [''],
            start_time: [this.start_time],
            end_time: ['']
        });
    };
    EditFacilityComponent.prototype.addSchedule = function () {
        var control = this.myForm.controls['schedule'];
        var scheduleCtrl = this.initSchedule();
        control.push(scheduleCtrl);
    };
    EditFacilityComponent.prototype.removeSchedule = function (i) {
        var control = this.myForm.controls['schedule'];
        control.removeAt(i);
    };
    EditFacilityComponent.prototype.createFacility = function (model) {
        console.log('model=', this.model);
        index_1.Facilities.push(this.model);
        console.log('facilities=', index_1.Facilities);
        this.router.navigate(['/facility']);
        // console.log(model)
        // this.facilityService.create(model)
        // .then(
        //     response => {
        //         this.alertService.success('Update facility successful', true);
        //         this.router.navigate(['/facility']);
        //     },
        //     error => { 
        //         this.alertService.error(error);
        //     }
        // );
    };
    EditFacilityComponent.prototype.updateFacility = function (facility) {
        var _this = this;
        console.log(facility);
        this.facilityService.update(facility)
            .then(function (response) {
            _this.alertService.success('Update development successful', true);
            _this.router.navigate(['/development']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return EditFacilityComponent;
}());
EditFacilityComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-facility',
        templateUrl: '/app/templates/edit-facility.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_2.FacilityService,
        index_2.AlertService,
        forms_1.FormBuilder,
        router_1.ActivatedRoute])
], EditFacilityComponent);
exports.EditFacilityComponent = EditFacilityComponent;
//# sourceMappingURL=edit-facility.component.js.map