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
var global_1 = require("../global");
require("rxjs/add/operator/toPromise");
var DevelopmentService = (function () {
    function DevelopmentService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    // getAll(){
    //     return this.http.get(url + 'api/developments')
    //            .toPromise()
    //            .then(response => {response.json() as Development[], console.log(response.json()) })
    //            .catch(this.handleError);
    // }
    // getById(id:number){
    //     return this.http.get(url + 'api/developments/' + id)
    //       .toPromise()
    //       .then(response => {response.json() as Development, console.log(response.json())}) 
    //       .catch(this.handleError);
    // }
    DevelopmentService.prototype.getAll = function () {
        return this.http.get(global_1.url + 'api/developments')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    DevelopmentService.prototype.getById = function (id) {
        return this.http.get(global_1.url + 'api/developments/' + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // getByName(name:string): Promise<Development>{
    //     return this.http.get(url + 'api/developments/' + name)
    //       .toPromise()
    //       .then(response => response.json().data as Development)
    //       .catch(this.handleError);
    // }
    DevelopmentService.prototype.create = function (body) {
        return this.http.post(global_1.url + 'api/developments', body, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    DevelopmentService.prototype.update = function (body) {
        return this.http.put(global_1.url + 'api/developments/' + body._id, body, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    DevelopmentService.prototype.delete = function (id) {
        return this.http.delete(global_1.url + 'api/developments/' + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    DevelopmentService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return DevelopmentService;
}());
DevelopmentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DevelopmentService);
exports.DevelopmentService = DevelopmentService;
//# sourceMappingURL=development.service.js.map