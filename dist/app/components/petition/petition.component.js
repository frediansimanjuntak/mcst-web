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
var common_1 = require("@angular/common");
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';
var PetitionComponent = (function () {
    function PetitionComponent(router, petitionService, alertService, route, location) {
        this.router = router;
        this.petitionService = petitionService;
        this.alertService = alertService;
        this.route = route;
        this.location = location;
        this.petitions = [];
        this.validTillDateOptions = {};
        this.model = {};
        this.checked = [];
        this.selectedValues = [];
        this.btnArchive = false;
        this.filterQuery = "";
        this.rowsOnPage = 10;
        this.sortBy = "email";
        this.sortOrder = "asc";
        this.sortByWordLength = function (a) {
            return a.city.length;
        };
        this.tabs = [
            { title: 'Dynamic Title 1', content: '' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
            { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true },
            { title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass' }
        ];
    }
    PetitionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.developmentId = '585b36585d3cc41224fe518a';
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        if (this.id == null) {
            this.loadAllPetitions();
        }
        else {
            this.petitionService.getPetition(this.id).then(function (petition) { _this.petition = petition; });
        }
    };
    PetitionComponent.prototype.toInt = function (num) {
        return +num;
    };
    PetitionComponent.prototype.logCheckbox = function (element) {
        console.log("Checkbox " + element.value + " was " + (element.checked ? '' : 'un') + "checked\n");
    };
    PetitionComponent.prototype.deletePetition = function (petition) {
        console.log(petition);
        // this.announcementService.delete(announcement._id) 
        //   .then(
        //     response => {
        //       if(response) { 
        //         console.log(response);
        //         // console.log(response.error());
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //       } else {
        //         this.alertService.success('Create user successful', true);
        //         alert(`Delete Newsletter successful`);
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> { 
        //       console.log(error);
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //     }
        // );
    };
    PetitionComponent.prototype.openModal = function (announcement) {
    };
    PetitionComponent.prototype.loadAllPetitions = function () {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          = data.find(data => data._id === this.developmentId );
        //             this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' ); 
        //             this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
        //             console.log(this.dataAgm);
        //         }, 1000);
        //     });
        var _this = this;
        this.petitionService.getPetitions().then(function (data) {
            _this.petitions = data;
            _this.petitionPending = _this.petitions.filter(function (data) { return data.status === 'pending'; });
            _this.petitionProgress = _this.petitions.filter(function (data) { return data.status === 'progress'; });
            _this.petitionApproved = _this.petitions.filter(function (data) { return data.status === 'approved'; });
        });
    };
    PetitionComponent.prototype.setActiveTab = function (index) {
        this.tabs[index].active = true;
    };
    ;
    PetitionComponent.prototype.viewPetition = function (petition) {
        this.router.navigate(['/petition/view', petition._id]);
    };
    PetitionComponent.prototype.editPetition = function (petition) {
        this.router.navigate(['/petition/edit', petition._id]);
    };
    PetitionComponent.prototype.checkSelected = function () {
        this.btnArchive = this.selectedValues.length > 0 ? true : false;
    };
    PetitionComponent.prototype.goBack = function () {
        this.location.back();
    };
    PetitionComponent.prototype.archieveSelected = function () {
        console.log(this.selectedValues);
    };
    PetitionComponent.prototype.clearSelected = function () {
        this.selectedValues = [];
        this.checkSelected();
    };
    return PetitionComponent;
}());
PetitionComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'petition',
        templateUrl: '/app/templates/petition.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.PetitionService,
        index_1.AlertService,
        router_1.ActivatedRoute,
        common_1.Location])
], PetitionComponent);
exports.PetitionComponent = PetitionComponent;
//# sourceMappingURL=petition.component.js.map