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
require("fullcalendar");
var index_1 = require("../services/index");
require("../rxjs-operators");
var ng2_file_upload_1 = require("ng2-file-upload");
// import {ModalModule} from "ng2-modal";
var Model = (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;
var TestComponent = (function () {
    // Array of strings for multi select, string for single select.
    function TestComponent(cd, http, testService) {
        this.cd = cd;
        this.http = http;
        this.testService = testService;
        this.model = {};
        this.dialogVisible = false;
        this.idGen = 100;
        this.files = [];
        this.src = "";
        this.resizeOptions = {
            resizeMaxHeight: 250,
            resizeMaxWidth: 250
        };
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
        this.options1 = [];
        var numOptions = 100;
        var opts = new Array(numOptions);
        for (var i = 0; i < numOptions; i++) {
            opts[i] = {
                value: i.toString(),
                label: i.toString()
            };
        }
        this.options1 = opts.slice(0);
        this.filesToUpload = [];
    }
    TestComponent.prototype.selected = function (imageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    TestComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.events = [
            {
                "title": "All Day Event",
                "start": "2016-01-01"
            },
            {
                "title": "Long Event",
                "start": "2016-01-07",
                "end": "2016-01-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-01-11",
                "end": "2016-01-13"
            }
        ];
        this.myOptions = [
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
            { value: 'c', label: 'Gamma' },
        ];
        this.mySelectValue = ['b', 'c'];
    };
    TestComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.testService.getAll().subscribe(function (models) { _this.models = models; console.log(models); });
    };
    TestComponent.prototype.handleDayClick = function (event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    };
    TestComponent.prototype.handleEventClick = function (e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }
        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    };
    TestComponent.prototype.saveEvent = function () {
        //update
        if (this.event.id) {
            var index = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        }
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        this.dialogVisible = false;
    };
    TestComponent.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    };
    TestComponent.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    TestComponent.prototype.Save = function () {
        // let a = this.filesToUpload.length;
        // for (let i = 0; i < a; i++) {
        //           this.model.attachment = this.filesToUpload[i]	       
        // }	
        this.model.attachment = this.filesToUpload;
        console.log(this.makeFileRequest);
        console.log(this.filesToUpload);
        console.log(this.model);
    };
    TestComponent.prototype.onChange = function (event, input, a) {
        var files = [].slice.call(event.target.files);
        this.model.attachment = this.src;
        console.log(this.model);
    };
    TestComponent.prototype.upload = function () {
        console.log(this.model);
        this.makeFileRequest("http://localhost:3000/upload", [], this.model).then(function (result) {
            console.log(result);
        }, function (error) {
            console.error(error);
        });
    };
    TestComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        this.model.attachment = this.filesToUpload;
    };
    TestComponent.prototype.makeFileRequest = function (url, params, files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    TestComponent.prototype.remove = function (i) {
        this.model.attachment.splice(i, 1);
    };
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'newsletter',
        templateUrl: '/app/templates/test.html',
        styleUrls: ['/app/templates/styles/newsletter.css'],
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef, http_1.Http, index_1.TestService])
], TestComponent);
exports.TestComponent = TestComponent;
var MyEvent = (function () {
    function MyEvent() {
        this.allDay = true;
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;
//# sourceMappingURL=test.component.js.map