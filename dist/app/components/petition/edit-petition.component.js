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
var ng2_file_upload_1 = require("ng2-file-upload");
require("../../rxjs-operators");
require("rxjs/add/operator/switchMap");
var EditPetitionComponent = (function () {
    function EditPetitionComponent(router, petitionService, alertService, route) {
        this.router = router;
        this.petitionService = petitionService;
        this.alertService = alertService;
        this.route = route;
        this.petitions = [];
        this.model = {};
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
        this.types = [
            { value: 'Maintenance', name: 'Maintenance' },
            { value: 'Moving In', name: 'Moving In' },
            { value: 'Renovation', name: 'Renovation' },
            { value: 'Add Tenant/ family', name: 'Add Tenant/ family' },
        ];
        this.selectedType = '';
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditPetitionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedType = 'Maintenance';
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id != null) {
            this.petitionService.getPetition(this.id).then(function (petition) { _this.petition = petition; });
        }
    };
    EditPetitionComponent.prototype.createPetition = function () {
        this.model.petition_type = this.selectedType;
        console.log(this.model);
        // this.petitionService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create Petition successful', true);
        //         this.router.navigate(['/incident']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The petition could not be save, server Error.`);
        //     }
        // );
    };
    EditPetitionComponent.prototype.updateIncident = function () {
        console.log(this.petition);
        // this.petitionService.update(this.petition)
        // .then(
        // 	response => {
        //               this.alertService.success('Update incident successful', true);
        //               this.router.navigate(['/incident']);
        //           },
        //           error => { 
        //           	this.alertService.error(error);
        //           }
        //       );
    };
    EditPetitionComponent.prototype.onChange = function (event) {
        var files = [].slice.call(event.target.files);
        this.model.attachment = files;
    };
    EditPetitionComponent.prototype.remove = function (i) {
        this.model.attachment.splice(i, 1);
    };
    return EditPetitionComponent;
}());
EditPetitionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-petition',
        templateUrl: '/app/templates/edit-petition.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.PetitionService,
        index_1.AlertService,
        router_1.ActivatedRoute])
], EditPetitionComponent);
exports.EditPetitionComponent = EditPetitionComponent;
//# sourceMappingURL=edit-petition.component.js.map