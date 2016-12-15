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
var MENUS = [
    {
        name: 'Dashboard',
        link: '/dashbard'
    },
    {
        name: 'Operations',
        link: '',
        sub: [
            { name: 'Guest, Visitor & Contractors', link: '' },
            { name: 'Incident Reports', link: '' },
            { name: 'Manage Orders', link: '' },
            { name: 'Manage Project', link: '' },
        ]
    },
    {
        name: 'Manage Request',
        link: '',
        sub: [
            { name: 'Browse Request', link: '' },
            { name: 'Add Request', link: '' },
            { name: 'Search Reference,no', link: '' }
        ]
    },
    {
        name: 'Facilities Booking',
        link: ''
    },
    {
        name: 'Payment System',
        link: ''
    },
    {
        name: 'Resident Database',
        link: '',
        sub: [
            { name: 'Browse Database', link: '' },
            { name: 'Add Resident', link: '' },
            { name: 'Manage Access control', link: '' }
        ]
    },
    {
        name: 'Manage Community',
        link: '',
        sub: [
            { name: 'Manage Announcement', link: '' },
            { name: 'E-voting', link: '' },
            { name: 'Manage Feedbacks', link: '' },
            { name: 'Lost & Found', link: '' },
        ]
    },
    {
        name: 'Useful Information',
        link: '',
        sub: [
            { name: 'AGM & Circular', link: '' },
            { name: 'Contact Directory', link: '' },
        ]
    },
];
var NavbarComponent = (function () {
    function NavbarComponent() {
        this.menus = MENUS;
    }
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navbar',
        templateUrl: '../templates/navbar.html',
        styleUrls: ['../templates/styles/navbar.css']
    }),
    __metadata("design:paramtypes", [])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map