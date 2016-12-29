import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import {Options} from "fullcalendar";
import { Router } from '@angular/router';
import '../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'newsletter',
  templateUrl: '/app/templates/test.html',
  styleUrls: [ '/app/templates/styles/newsletter.css' ]
})

export class TestComponent implements OnInit{ 

	model: any = {};
	events: any[];
	event: MyEvent;
	dialogVisible: boolean = false;
	idGen: number = 100;
	public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});

	constructor(private cd: ChangeDetectorRef) { }

	
	ngOnInit() {
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
		this.model.attachment = [];
		let a = this.uploader.queue.length;
		for (let i = 0; i < a; i++) {
	        this.model.attachment = [{
	        	"name": this.uploader.queue[i].file.name,
	            "type": this.uploader.queue[i].file.type,
	        }]
	        console.log(this.uploader.queue[i].file.name)
	        console.log(this.model);
        // this.model.pinned.rank = 0;
		}	
        
    }
}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: boolean = true;
}