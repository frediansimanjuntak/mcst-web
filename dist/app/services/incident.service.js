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
var IncidentService = (function () {
    function IncidentService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    IncidentService.prototype.getIncidents = function () {
        return Promise.resolve(index_1.Incidents);
    };
    IncidentService.prototype.getIncident = function (id) {
        return this.getIncidents()
            .then(function (users) { return users.find(function (user) { return user._id === id; }); });
    };
    IncidentService.prototype.getAll = function () {
        return this.http.get(global_1.url + 'api/incidents')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    IncidentService.prototype.getById = function (id) {
        return this.http.get(global_1.url + 'api/incidents' + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    IncidentService.prototype.create = function (body) {
        console.log(body);
        return this.http.post(global_1.url + 'api/incidents', JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    IncidentService.prototype.update = function (body) {
        return this.http.post(global_1.url + 'api/incidents/update/' + body._id, body, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    IncidentService.prototype.delete = function (id) {
        return this.http.delete(global_1.url + 'api/incidents/' + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    IncidentService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return IncidentService;
}());
IncidentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], IncidentService);
exports.IncidentService = IncidentService;
//# sourceMappingURL=incident.service.js.map