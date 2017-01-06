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
var index_1 = require("../../models/index");
var index_2 = require("../../services/index");
var ng2_file_upload_1 = require("ng2-file-upload");
require("../../rxjs-operators");
require("rxjs/add/operator/switchMap");
var EditIncidentComponent = (function () {
    function EditIncidentComponent(router, incidentService, alertService, route) {
        this.router = router;
        this.incidentService = incidentService;
        this.alertService = alertService;
        this.route = route;
        this.incidents = [];
        this.model = {};
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
        this.types = [
            { value: 'general', name: 'General' },
            { value: 'hygiene', name: 'Hygiene' },
            { value: 'damage', name: 'Damage' },
        ];
        this.selectedType = '';
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditIncidentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedType = 'general';
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.incidentService.getIncident(this.id).then(function (incident) { _this.incident = incident; });
        }
    };
    EditIncidentComponent.prototype.createIncident = function () {
        console.log('model=', this.model);
        index_1.Incidents.push(this.model);
        console.log('incidents=', index_1.Incidents);
        this.router.navigate(['/incident']);
        // this.incidentService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create incident successful', true);
        //         this.router.navigate(['/incident']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The incident could not be save, server Error.`);
        //     }
        // );
    };
    EditIncidentComponent.prototype.updateIncident = function () {
        var _this = this;
        console.log(this.incident);
        this.incidentService.update(this.incident)
            .then(function (response) {
            _this.alertService.success('Update incident successful', true);
            _this.router.navigate(['/incident']);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditIncidentComponent.prototype.onChange = function (event) {
        var files = [].slice.call(event.target.files);
        this.model.attachment = files;
    };
    EditIncidentComponent.prototype.remove = function (i) {
        this.model.attachment.splice(i, 1);
    };
    return EditIncidentComponent;
}());
EditIncidentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-incident',
        templateUrl: '/app/templates/edit-incident.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_2.IncidentService,
        index_2.AlertService,
        router_1.ActivatedRoute])
], EditIncidentComponent);
exports.EditIncidentComponent = EditIncidentComponent;
//# sourceMappingURL=edit-incident.component.js.map