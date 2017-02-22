import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { LostFoundService, AlertService, UserService, UnitService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
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
    dataUnit: any[]=[];
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
                private userService: UserService,
                private unitService: UnitService,
                private appComponent: AppComponent,
                private _notificationsService: NotificationsService
                ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
		this.userService.getByToken()
                        .subscribe(name => {
                            this.name = name;
                            this.loadAllUnits();
                        })
        this.buttonViewArchive = false;
        this.images = [];
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
        this.appComponent.loading = true
    	this.lostFoundforModal = lostFound;
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    archieve(id) {      
        this.appComponent.loading = true
        this.lostFoundService.archieve(id)
            .then(
                data => {
                    this.firstModal.close();
                     this._notificationsService.success(
                            'Success',
                            'Archive data successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this.firstModal.close();
                    this._notificationsService.error(
                            'Error',
                            'Failed to archive, server error',
                    )
                    this.appComponent.loading = false
                }
            );
    }

    viewArchieved(){
        this.buttonViewArchive = true;
    }

    private loadLostFounds() {
        this.lostFoundService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.lostFounds      = data.filter(data => data.development._id == this.name.default_development._id);
                    console.log(this.lostFounds);
                    this.archieveds      = this.lostFounds.filter(data => data.archieve === true );
                    for (var i = 0; i < this.archieveds.length; i++) {
                        let unit = this.dataUnit.find(data => data._id ==  this.archieveds[i].property);
                        this.archieveds[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                    }
                    this.archievedLosts = this.archieveds.filter(data => data.type == 'lost');
                    for (var i = 0; i < this.archievedLosts.length; i++) {
                        let unit = this.dataUnit.find(data => data._id ==  this.archievedLosts[i].property);
                        this.archievedLosts[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                    }
                    this.archievedFounds= this.archieveds.filter(data => data.type == 'found');
                    for (var i = 0; i < this.archievedFounds.length; i++) {
                        let unit = this.dataUnit.find(data => data._id ==  this.archievedFounds[i].property);
                        this.archievedFounds[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                    }



                    this.all             = this.lostFounds.filter(data => data.archieve === false );
                    for (var i = 0; i < this.all.length; i++) {
                        let unit = this.dataUnit.find(data => data._id ==  this.all[i].property);
                        this.all[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                    }
                    this.losts           = this.all.filter(data => data.type == 'lost');
                    for (var i = 0; i < this.losts.length; i++) {
                        let unit = this.dataUnit.find(data => data._id ==  this.losts[i].property);
                        this.losts[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                    }
                    this.founds          = this.all.filter(data => data.type == 'found');
                    for (var i = 0; i < this.founds.length; i++) {
                        let unit = this.dataUnit.find(data => data._id ==  this.founds[i].property);
                        this.founds[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                    }
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }, 1000);
            });
    }

    add(){
      this.router.navigate([this.name.default_development.name_url + '/lost_found/add']);  
    }

    private loadAllUnits(): void {
        this.unitService.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.dataUnit      = data.properties;
                    if( this.id == null) {
                        this.loadLostFounds();
                    }else{
                        this.lostFoundService.getById(this.id)
                            .subscribe(lostFound => {
                                this.lostFound = lostFound;
                                if(this.lostFound.photo.length > 0){
                                    for (var i = 0; i < this.lostFound.photo.length; i++) {
                                        this.images.push({source: this.lostFound.photo[i].url});   
                                    }
                                }
                                setTimeout(() => this.appComponent.loading = false, 1000);
                            });
                    }
                }, 1000);
            });
    }

    viewLostFound(lostfound: LostFound){
        this.router.navigate([this.name.default_development.name_url + '/lost_found/view', lostfound._id]);
    }

    goToLostFound(){
        this.router.navigate([this.name.default_development.name_url + '/lost_found']);  
    }
}
