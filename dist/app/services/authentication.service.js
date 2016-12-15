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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AuthenticationService = (function () {
    function AuthenticationService(http, _router) {
        this.http = http;
        this._router = _router;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
    }
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("user");
        this._router.navigate(['login']);
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('https://192.168.10.73:3333/api/auth', JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user) {
                console.log(user, "elic");
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("user", JSON.stringify(user));
                _this._router.navigate(['user']);
            }
        }).catch(this.handleError);
    };
    AuthenticationService.prototype.checkCredentials = function () {
        if (localStorage.getItem("user") === null) {
            this._router.navigate(['Login']);
        }
        ;
        console.log(localStorage.getItem("user"));
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map