import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { LostFoundService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'lost-found',
  templateUrl: 'app/templates/lost-found.html',

})

export class LostFoundComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
	lostFound: any;
    lostFounds: any[] = [];
    all: any[]= [];
    losts: any[] = [];
    founds: any[] = [];
    archieveds: any[] = [];

    model: any = {};
    id: string;
    
    public data;
    name: any;

    constructor(
                private router: Router,
                private lostFoundService: LostFoundService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private formbuilder: FormBuilder,
                 private userService: UserService
                ) {
    }

    ngOnInit(): void {
		this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadLostFounds();
    }

    convertDate(date) {
	  var yyyy = date.getFullYear().toString();
	  var mm = (date.getMonth()+1).toString();
	  var dd  = date.getDate().toString();

	  var mmChars = mm.split('');
	  var ddChars = dd.split('');

	  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
	}

    preCheckIn(lostFound){
    	this.lostFound = lostFound;
    }

    archieve() {
        this.lostFoundService.archieve(this.lostFound._id)
            .then(
                data => {
                    this.firstModal.close();
                    this.alertService.success('Publish data successful', true);
                },
                error => {
                    console.log(error);
                    this.firstModal.close();
                    alert(`could not be Publish, server Error.`);
                }
            );
    }

   private loadLostFounds() {
        //---------------------------Call To Api-------------- //
        // this.lostFoundService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.lostFounds      = data.filter(data => data.development == this.name.default_development.name);
        //             this.archieveds      = this.lostFounds.filter(data => data.archieved );
        //             this.all             = this.lostFounds.filter(data => !data.archieved );
        //             this.losts           = this.all.filter(data => data.type == 'lost');
        //             this.founds          = this.all.filter(data => data.type == 'found');
        //         }, 1000);
        //     });

        this.lostFoundService.getLostFounds().then(data => {
            this.lostFounds      = data.filter(data => data.development == this.name.default_development.name);
            this.archieveds      = this.lostFounds.filter(data => data.archieved );
            this.all             = this.lostFounds.filter(data => !data.archieved );
            this.losts           = this.all.filter(data => data.type == 'lost');
            this.founds          = this.all.filter(data => data.type == 'found');
		});
    }

    goBack(): void {
    	this.location.back();
  	}
}
