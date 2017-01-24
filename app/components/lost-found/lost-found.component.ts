import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { LostFoundService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
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
    lostFoundforModal: any;
    lostFounds: any[] = [];
    all: any[]= [];
    losts: any[] = [];
    founds: any[] = [];
    archieveds: any[] = [];

    archievedLosts: any[] = [];
    archievedFounds: any[] = [];

    buttonViewArchive: boolean;
    images: any[];
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
        this.buttonViewArchive = false;
        this.images = [];
        this.images.push({source:'/assets/image/1.png'});
        this.images.push({source:'/assets/image/2.png'});
        this.images.push({source:'/assets/image/3.png'});
        this.images.push({source:'/assets/image/4.png'});
        this.images.push({source:'/assets/image/5.png'});
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadLostFounds();
        }else{
            this.lostFoundService.getById(this.id)
                .subscribe(lostFound => {this.lostFound = lostFound;});
        }
    }

    convertDate(date) {
	  var yyyy = date.getFullYear().toString();
	  var mm = (date.getMonth()+1).toString();
	  var dd  = date.getDate().toString();

	  var mmChars = mm.split('');
	  var ddChars = dd.split('');

	  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
	}

    openModal(lostFound){
    	this.lostFoundforModal = lostFound;
    }

    archieve(id) {
        console.log(id);
        this.lostFoundService.archieve(id)
            .then(
                data => {
                    this.firstModal.close();
                    this.alertService.success('Archive data successful', true);
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this.firstModal.close();
                    alert(`could not be archive, server Error.`);
                }
            );
    }

    viewArchieved(){
        this.buttonViewArchive = true;
    }

    private loadLostFounds() {
        //---------------------------Call To Api-------------- //
        this.lostFoundService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.lostFounds      = data.filter(data => data.development == this.name.default_development._id);
                    this.archieveds      = this.lostFounds.filter(data => data.archieved );
                    this.archievedLosts = this.archieveds.filter(data => data.type == 'lost');
                    this.archievedFounds= this.archieveds.filter(data => data.type == 'found');

                    this.all             = this.lostFounds.filter(data => !data.archieved );
                    this.losts           = this.all.filter(data => data.type == 'lost');
                    this.founds          = this.all.filter(data => data.type == 'found');
                    console.log(this.lostFounds);
                }, 1000);
            });

  //       this.lostFoundService.getLostFounds().then(data => {
  //           this.lostFounds      = data.filter(data => data.development == this.name.default_development.name);
  //           this.archieveds      = this.lostFounds.filter(data => data.archieve );
  //           this.archievedLosts = this.archieveds.filter(data => data.type == 'lost');
  //           this.archievedFounds= this.archieveds.filter(data => data.type == 'found');

  //           this.all             = this.lostFounds.filter(data => !data.archieve );
  //           this.losts           = this.all.filter(data => data.type == 'lost');
  //           this.founds          = this.all.filter(data => data.type == 'found');
		// });
    }

    goBack(): void {
    	this.location.back();
  	}

    add(){
      this.router.navigate([this.name.default_development.name + '/lost_found/add']);  
    }

    viewLostFound(lostfound: LostFound){
        this.router.navigate([this.name.default_development.name + '/lost_found/view', lostfound._id]);
    }
}
