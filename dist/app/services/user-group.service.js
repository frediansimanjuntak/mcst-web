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
var index_1 = require("../models/index");
var UserGroupService = (function () {
    function UserGroupService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserGroupService.prototype.getUserGroups = function () {
        return Promise.resolve(index_1.UserGroups);
    };
    UserGroupService.prototype.getAll = function () {
        return this.http.get('https://192.168.10.73:3333/api/user-groups')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    UserGroupService.prototype.getById = function (id) {
        return this.http.get('https://192.168.10.73:3333/api/user-groups' + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    UserGroupService.prototype.create = function (body) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.post('https://192.168.10.73:3333/api/user-groups', body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    UserGroupService.prototype.update = function (body) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.put('https://192.168.10.73:3333/api/user-groups' + body._id, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // delete(id:string){
    //     let options = new RequestOptions({
    //         headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
    //     });
    //     return this.http.delete('https://192.168.10.73:3333/api/user-groups' + id, options)
    //         .map((res:Response) => res.json())
    //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }
    UserGroupService.prototype.delete = function (id) {
        return this.http.delete(global_1.url + 'api/usergroup/' + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    UserGroupService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return UserGroupService;
}());
UserGroupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserGroupService);
exports.UserGroupService = UserGroupService;
//# sourceMappingURL=user-group.service.js.map