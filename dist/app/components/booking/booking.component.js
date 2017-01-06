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
var moment = require("moment");
var BookingComponent = (function () {
    function BookingComponent(router, bookingService, alertService, route) {
        this.router = router;
        this.bookingService = bookingService;
        this.alertService = alertService;
        this.route = route;
        this.dt = new Date();
        this.minDate = void 0;
        this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
            'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YY',
            startingDay: 1
        };
        this.opened = false;
        this.bookings = [];
        this.model = {};
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        (this.dateDisabled = []);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id == null) {
            this.loadAllBookings();
        }
        else {
            this.bookingService.getBooking(this.id).then(function (booking) { _this.booking = booking; });
        }
    };
    BookingComponent.prototype.deleteBooking = function (booking) {
        var _this = this;
        console.log(booking);
        this.bookingService.delete(booking._id)
            .then(function (response) {
            if (response) {
                alert("The booking could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Delete booking successful', true);
                _this.loadAllBookings();
            }
        }, function (error) {
            alert("The Booking could not be deleted, server Error.");
        });
    };
    BookingComponent.prototype.loadAllBookings = function () {
        var _this = this;
        this.bookingService.getBookings().then(function (bookings) { _this.bookings = bookings; });
    };
    BookingComponent.prototype.add = function () {
        this.router.navigate(['/booking/add']);
    };
    BookingComponent.prototype.view = function (booking) {
        this.router.navigate(['/booking/edit', booking._id]);
    };
    BookingComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    BookingComponent.prototype.today = function () {
        this.dt = new Date();
    };
    BookingComponent.prototype.d20090824 = function () {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD')
            .toDate();
    };
    BookingComponent.prototype.disableTomorrow = function () {
        this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
    };
    // todo: implement custom class cases
    BookingComponent.prototype.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var event_1 = _a[_i];
                var currentDay = new Date(event_1.date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                    return event_1.status;
                }
            }
        }
        return '';
    };
    BookingComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    BookingComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    BookingComponent.prototype.clear = function () {
        this.dt = void 0;
        this.dateDisabled = undefined;
    };
    BookingComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
    };
    return BookingComponent;
}());
BookingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'development',
        templateUrl: '/app/templates/booking.html',
        styles: ["\n  \t.full button span {\n\t    background-color: limegreen;\n\t    border-radius: 32px;\n\t    color: black;\n  \t}\n    .partially button span {\n\t    background-color: orange;\n\t    border-radius: 32px;\n\t    color: black;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.BookingService,
        index_1.AlertService,
        router_1.ActivatedRoute])
], BookingComponent);
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map