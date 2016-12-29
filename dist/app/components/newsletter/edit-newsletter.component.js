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
var forms_1 = require("@angular/forms");
var ng2_file_upload_1 = require("ng2-file-upload");
require("../../rxjs-operators");
var EditNewsletterComponent = (function () {
    function EditNewsletterComponent(router, newsletterService, alertService, formbuilder) {
        this.router = router;
        this.newsletterService = newsletterService;
        this.alertService = alertService;
        this.formbuilder = formbuilder;
        this.developments = [];
        this.model = {};
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
        this.types = [
            { value: 'agm', name: 'AGM' },
            { value: 'circular', name: 'Circular' }
        ];
        this.selectedType = 'agm';
        // this.user = JSON.parse(localStorage.getItem('user'));
    }
    EditNewsletterComponent.prototype.ngOnInit = function () {
        this.myForm = this.formbuilder.group({
            newsletter: this.formbuilder.group({
                title: [''],
                description: [''],
                type: [''],
                attachment: [''],
                released: [''],
                pinned: this.formbuilder.group({
                    rank: [''],
                }),
                released_by: [''],
            })
        });
    };
    EditNewsletterComponent.prototype.createNewsletter = function (event) {
        var _this = this;
        if (this.model.released == true) {
            this.model.released_by = '583e4e9dd97c97149884fef5';
            this.model.released_at = Date.now();
        }
        else {
            this.model.released_by = null;
            this.model.released_at = null;
        }
        this.model.type = this.selectedType;
        this.model.created_by = '583e4e9dd97c97149884fef5';
        // this.model.pinned.rank = 0;
        console.log(this.model);
        this.newsletterService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Create newsletter successful', true);
            _this.router.navigate(['/newsletter']);
        }, function (error) {
            console.log(error);
            alert("The Newsletter could not be save, server Error.");
        });
    };
    EditNewsletterComponent.prototype.updateNewsletter = function () {
        var _this = this;
        this.newsletterService.update(this.model)
            .subscribe(function (response) {
            if (response.error) {
                _this.alertService.error(response.error);
            }
            else {
                // EmitterService.get(this.userList).emit(response.users);
                _this.alertService.success('Update newsletter successful', true);
                _this.router.navigate(['/newsletter']);
            }
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    EditNewsletterComponent.prototype.onChange = function (event) {
        var files = [].slice.call(event.target.files);
        this.model.attachment = files;
    };
    EditNewsletterComponent.prototype.remove = function (i) {
        this.model.attachment.splice(i, 1);
    };
    return EditNewsletterComponent;
}());
EditNewsletterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-development',
        templateUrl: '/app/templates/edit-newsletter.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.NewsletterService,
        index_1.AlertService,
        forms_1.FormBuilder])
], EditNewsletterComponent);
exports.EditNewsletterComponent = EditNewsletterComponent;
//# sourceMappingURL=edit-newsletter.component.js.map