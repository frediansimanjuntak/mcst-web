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
var Rx_1 = require("rxjs/Rx");
var index_1 = require("../models/index");
var global_1 = require("../global");
require("rxjs/add/operator/toPromise");
var AccessControlService = (function () {
    function AccessControlService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AccessControlService.prototype.getAccessControls = function () {
        return Promise.resolve(index_1.AccessControls);
    };
    AccessControlService.prototype.getAccessControl = function (id) {
        return this.getAccessControls()
            .then(function (accesscontrols) { return accesscontrols.find(function (accesscontrol) { return accesscontrol._id === id; }); });
    };
    AccessControlService.prototype.getAll = function () {
        return this.http.get(global_1.url + 'api/accesscontrols')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AccessControlService.prototype.getById = function (id) {
        return this.http.get(global_1.url + 'api/accesscontrols/' + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    AccessControlService.prototype.create = function (body) {
        console.log(body);
        return this.http.post(global_1.url + 'api/accesscontrols', JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AccessControlService.prototype.update = function (body) {
        return this.http.post(global_1.url + 'api/accesscontrols/update/' + body._id, body, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AccessControlService.prototype.delete = function (id) {
        return this.http.delete(global_1.url + 'api/accesscontrols/' + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    AccessControlService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return AccessControlService;
}());
AccessControlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AccessControlService);
exports.AccessControlService = AccessControlService;
//# sourceMappingURL=access-control.service.js.map