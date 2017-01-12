import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as $ from 'jquery';
import 'fullcalendar';
import {Options} from "fullcalendar";
import { Router } from '@angular/router';

import { TestService, AlertService } from '../services/index';
import '../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import { Observable} from 'rxjs/Observable';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
// import {ModalModule} from "ng2-modal";

export class Model {
    _id: string;
    todoMessage : string;
    createdAt : string
}
@Component({
  // moduleId: module.id,
  selector: 'newsletter',
  templateUrl: 'app/templates/test.html',
  styleUrls: [ 'app/templates/styles/newsletter.css' ],
})

export class TestComponent implements OnInit{

	model: any = {};
    models: Model[];
	events: any[];
	event: MyEvent;
	dialogVisible: boolean = false;
	idGen: number = 100;
    filesToUpload: Array<File>;
    files: any[] = [];
    src: string = "";
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 250,
        resizeMaxWidth: 250
    };
	public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});


    // multiple1: boolean = true;
    myOptions: Array<any>;
    options1: Array<any> = [];
    mySelectValue: Array<string>;
     selection: Array<string>;
     // Array of strings for multi select, string for single select.


	constructor(private cd: ChangeDetectorRef, private http: Http, private testService:TestService) {
        let numOptions = 100;
        let opts = new Array(numOptions);

        for (let i = 0; i < numOptions; i++) {
            opts[i] = {
                value: i.toString(),
                label: i.toString()
            };
        }

        this.options1 = opts.slice(0);
         this.filesToUpload = [];
    }



    selected(imageResult: ImageResult) {
        this.src = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    }



	ngOnInit() {
        this.loadAllUsers()
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
            {value: 'a', label: 'Alpha'},
            {value: 'b', label: 'Beta'},
            {value: 'c', label: 'Gamma'},
        ];
        this.mySelectValue = ['b', 'c'];
    }



    private loadAllUsers() {
        this.testService.getAll().subscribe(models => { this.models = models; console.log(models) });
    }

    handleDayClick(event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;

        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }

    handleEventClick(e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }

        if(end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        //update
        if(this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            if(index >= 0) {
                this.events[index] = this.event;
            }
        }
        //new
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if(index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for(let i = 0; i < this.events.length; i++) {
            if(id == this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }

	Save() {
		// let a = this.filesToUpload.length;
		// for (let i = 0; i < a; i++) {
  //           this.model.attachment = this.filesToUpload[i]
		// }
        this.model.attachment = this.filesToUpload;
        console.log(this.makeFileRequest);
        console.log(this.filesToUpload);
        console.log(this.model);

    }

    onChange(event: any, input: any, a:any) {
        let files = [].slice.call(event.target.files);
        this.model.attachment = this.src;
        console.log(this.model);
    }

    upload() {
        console.log(this.model);
        this.makeFileRequest("http://localhost:3000/upload", [], this.model).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.attachment = this.filesToUpload;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}
