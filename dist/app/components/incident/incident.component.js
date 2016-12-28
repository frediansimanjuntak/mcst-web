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
        this.tabs = [
            { title: 'All', content: '' },
            { title: 'New', content: '' },
            { title: 'Reviewing', content: '' },
            { title: 'In-Progress', content: '' },
            { title: 'Resolved', content: '' },
            { title: 'Urgent', content: '' }
        ];
    }
    IncidentComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        // this.incidentService.getIncidents()
        //     .then((){
        //             this.data           = ( incidents => this.incidents = incidents );
        //             this.dataNew        = this.incidents.filter(incidents => incidents.status === 'new' ); 
        //             this.dataReviewing  = this.incidents.filter(incidents => incidents.status === 'reviewing' ); 
        //             this.dataInProgress = this.incidents.filter(incidents => incidents.status === 'inprogress' ); 
        //             this.dataResolved   = this.incidents.filter(incidents => incidents.status === 'resolved' ); 
        //             this.dataUrgent     = this.incidents.filter(incidents => incidents.status === 'urgent' );
        //     });
    };
    IncidentComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    // edit(incident: Incident){
    //     this.router.navigate(['/incident/edit', incident._id]);
    // }
    IncidentComponent.prototype.view = function (incident) {
        this.router.navigate(['/incident/view', incident._id]);
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