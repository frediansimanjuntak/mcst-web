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
var BookingComponent = (function () {
    function BookingComponent(router, bookingService, alertService, route) {
        this.router = router;
        this.bookingService = bookingService;
        this.alertService = alertService;
        this.route = route;
        this.bookings = [];
        this.model = {};
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
            alert("The Development could not be deleted, server Error.");
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
    return BookingComponent;
}());
BookingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'development',
        templateUrl: '/app/templates/booking.html',
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.BookingService, index_1.AlertService, router_1.ActivatedRoute])
], BookingComponent);
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map