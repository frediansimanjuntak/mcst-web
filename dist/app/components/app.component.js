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
require("../rxjs-operators");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(slimLoadingBarService, router) {
        var _this = this;
        this.slimLoadingBarService = slimLoadingBarService;
        this.router = router;
        this.loading = true;
        router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
    }
    AppComponent.prototype.start = function () {
        this.slimLoadingBarService.start(function () {
            console.log('Loading complete');
        });
        console.log('aaa');
    };
    // Shows and hides the loading spinner during RouterEvent changes
    AppComponent.prototype.navigationInterceptor = function (event) {
        var _this = this;
        if (event instanceof router_1.NavigationStart) {
            this.loading = true;
        }
        if (event instanceof router_1.NavigationEnd) {
            setTimeout(function () { return _this.loading = false; }, 5000);
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof router_1.NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof router_1.NavigationError) {
            this.loading = false;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        template: "\n  \t<headers></headers>\n  \t<navbar></navbar>\n  \t\n    \n    <ng2-slim-loading-bar></ng2-slim-loading-bar>\n\t  \n   \t<router-outlet></router-outlet>\n\n  \t\n  \t\n\t",
        styles: ["\n\t.gif {\n\t    display: inline-block;\n\t    margin-left: auto;\n\t    margin-right: auto;\n\t    height: 30px; \n\t}\n\n\t.loading {\n\t    opacity: 0;\n\t    transition: opacity .8s ease-in-out;\n\t    position: fixed;\n\t    height: 100%;\n\t    width: 100%;\n\t    top: 0;\n\t    left: 0;\n\t    background: #000;\n\t    z-index: -1;\n\t}\n\n\t.images{\n\t    text-align:center;\n\t}\n\t"]
    }),
    __metadata("design:paramtypes", [ng2_slim_loading_bar_1.SlimLoadingBarService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map