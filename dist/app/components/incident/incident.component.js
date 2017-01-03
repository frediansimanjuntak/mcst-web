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
var IncidentComponent = (function () {
    function IncidentComponent(router, incidentService, alertService, route) {
        this.router = router;
        this.incidentService = incidentService;
        this.alertService = alertService;
        this.route = route;
        this.incidents = [];
        this.model = {};
    }
    IncidentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.images = [];
        this.images.push({ source: '/assets/image/1.png' });
        this.images.push({ source: '/assets/image/2.png' });
        this.images.push({ source: '/assets/image/3.png' });
        this.images.push({ source: '/assets/image/4.png' });
        this.images.push({ source: '/assets/image/5.png' });
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id == null) {
            this.loadAllIncident();
        }
        else {
            this.incidentService.getIncident(this.id).then(function (incident) { _this.incident = incident; });
        }
    };
    IncidentComponent.prototype.deleteIncident = function (incident) {
        var _this = this;
        console.log(incident._id);
        this.incidentService.delete(incident._id)
            .then(function (response) {
            if (response) {
                console.log(response);
                // console.log(response.error());
                alert("The Newsletter could not be deleted, server Error.");
            }
            else {
                _this.alertService.success('Create user successful', true);
                alert("Delete Newsletter successful");
                _this.ngOnInit();
            }
        }, function (error) {
            console.log(error);
            alert("The Newsletter could not be deleted, server Error.");
        });
    };
    IncidentComponent.prototype.loadAllIncident = function () {
        var _this = this;
        this.incidentService.getIncidents().then(function (incidents) {
            _this.incidents = incidents;
            _this.dataNew = _this.incidents.filter(function (incidents) { return incidents.status === 'new'; });
            _this.dataReviewing = _this.incidents.filter(function (incidents) { return incidents.status === 'reviewing'; });
            _this.dataInProgress = _this.incidents.filter(function (incidents) { return incidents.status === 'inprogress'; });
            _this.dataResolved = _this.incidents.filter(function (incidents) { return incidents.status === 'resolved'; });
            _this.dataUrgent = _this.incidents.filter(function (incidents) { return incidents.status === 'urgent'; });
        });
    };
    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }
    IncidentComponent.prototype.view = function (incident) {
        this.router.navigate(['/incident/view', incident._id]);
    };
    IncidentComponent.prototype.add = function () {
        this.router.navigate(['/incident/add']);
    };
    return IncidentComponent;
}());
IncidentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'incident',
        templateUrl: '/app/templates/incident.html',
        styleUrls: ['/app/templates/styles/newsletter.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, index_1.IncidentService, index_1.AlertService, router_1.ActivatedRoute])
], IncidentComponent);
exports.IncidentComponent = IncidentComponent;
//# sourceMappingURL=incident.component.js.map