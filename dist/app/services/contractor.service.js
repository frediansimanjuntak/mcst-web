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
var ContractorService = (function () {
    function ContractorService(http) {
        this.http = http;
    }
    ContractorService.prototype.getAll = function () {
        return this.http.get('https://192.168.10.73:3333/api/contractors')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContractorService.prototype.getById = function (id) {
        return this.http.get('https://192.168.10.73:3333/api/contractors' + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContractorService.prototype.create = function (body) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.post('https://192.168.10.73:3333/api/contractors', body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContractorService.prototype.update = function (body) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.put('https://192.168.10.73:3333/api/contractors' + body._id, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    ContractorService.prototype.delete = function (id) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.delete('https://192.168.10.73:3333/api/contractors' + id, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return ContractorService;
}());
ContractorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContractorService);
exports.ContractorService = ContractorService;
//# sourceMappingURL=contractor.service.js.map