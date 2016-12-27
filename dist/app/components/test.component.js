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
require("fullcalendar");
require("../rxjs-operators");
var ng2_file_upload_1 = require("ng2-file-upload");
var TestComponent = (function () {
    function TestComponent(cd) {
        this.cd = cd;
        this.model = {};
        this.dialogVisible = false;
        this.idGen = 100;
        this.uploader = new ng2_file_upload_1.FileUploader({ url: 'http://localhost:3001/upload' });
    }
    TestComponent.prototype.ngOnInit = function () {
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
        var a = this.uploader.queue.length;
        for (var i = 0; i <= a; ++i) {
            this.model.attachment = [{
                    "name": this.uploader.queue[i].file.name,
                    "type": this.uploader.queue[i].file.type,
                    "information": "Optional",
                    "created_by": "583e4e9dd97c97149884fef5",
                }];
            // this.model.pinned.rank = 0;
            console.log(this.uploader.queue);
            console.log(this.model);
        }
    };
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'newsletter',
        templateUrl: '/app/templates/test.html',
        styleUrls: ['/app/templates/styles/newsletter.css']
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
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