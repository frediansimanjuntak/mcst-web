import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { LostFoundService, AlertService, UserService, UnitService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { ConfirmationService } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash'
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'lost-found',
  templateUrl: '../../templates/lost-found.html',

})

export class LostFoundComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
	lostFound: any;
    lostFoundforModal: any;
    public filterField: string = '';
    lostFounds: any[] = [];
    allArchived: any[]= [];
    allNotArchived: any[]= [];
    all: any[]= [];
    losts: any[] = [];
    founds: any[] = [];
    archieveds: any[] = [];
    dataUnit: any[]=[];
    archievedLosts: any[] = [];
    archievedFounds: any[] = [];
    loading: boolean = true;
    buttonViewArchive: boolean;
    images: any[];
    model: any = {};
    id: string;
    public data;
    name: any;

    constructor(
                private router: Router,
                private datePipe: DatePipe,
                private lostFoundService: LostFoundService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private formbuilder: FormBuilder,
                private userService: UserService,
                private unitService: UnitService,
                
                private confirmationService: ConfirmationService,
                private _notificationsService: NotificationsService
                ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
		this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
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
    	this.lostFoundforModal = lostFound;
    }

    archieve(lostfound) {      
        this.loading = true
        this.lostFoundService.archieve(lostfound._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Archive data successful')
                this.ngOnInit();
            },
            error => {
                if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                
                this.loading = false
            }
        );
    }

    archieveConfirmation(lostfound) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to archieve this lost/found?',
            header: 'Archieve Confirmation',
            accept: () => {
                this.archieve(lostfound)
            }
        });
    }

    viewArchieved(){
        this.loading = true
        this.buttonViewArchive = true;
        setTimeout(() => this.loading = false, 500);
    }

    viewUnarchieved(){
        this.loading = true
        this.buttonViewArchive = false;
        setTimeout(() => this.loading = false, 500);
    }

    smart_substr(str:string, len:number) {
        var temp = str.substr(0, len);
        if(temp.lastIndexOf('<') > temp.lastIndexOf('>')) {
            temp = str.substr(0, 1 + str.indexOf('>', temp.lastIndexOf('<')));
        }
        return temp;
    }

    private loadLostFounds() {
        this.lostFoundService.getAll()
        .subscribe((data)=> {
            setTimeout(()=> {
                for (var i = 0; i < data.length; ++i) {
                    if (data[i].description && data[i].description != '' && data[i].description.length > 100) {
                        let content = data[i].description;
                        data[i].description = this.smart_substr(content,100) + '...'
                    }
                }
                this.lostFounds      = data.filter(data => data.development._id == this.name.default_development._id);
                for (var i = 0; i < this.lostFounds.length; i++) {
                    if(this.lostFounds[i].property){
                        let unit = this.dataUnit.find(data => data._id ==  this.lostFounds[i].property);
                        this.lostFounds[i].unit_no = '#' + unit.address.unit_no + '-' + unit.address.unit_no_2;
                        this.lostFound[i].unit_no_1 =  unit.address.unit_no;
                        this.lostFound[i].unit_no_2 = unit.address.unit_no_2;
                    }else{
                        this.lostFounds[i].unit_no = '';
                        this.lostFound[i].unit_no_1 =  '';
                        this.lostFound[i].unit_no_2 = '';
                    }
                }
                this.lostFound = _.orderBy(this.lostFound, ['unit_no_1', 'unit_no_2'], ['asc', 'asc']);
                this.allArchived     = this.lostFounds.filter(data => data.archieve === true );
                this.archieveds      = this.lostFounds.filter(data => data.archieve === true );
                this.archievedLosts  = this.archieveds.filter(data => data.type == 'lost');
                this.archievedFounds = this.archieveds.filter(data => data.type == 'found');
                this.allNotArchived  = this.lostFounds.filter(data => data.archieve === false );
                this.all             = this.lostFounds.filter(data => data.archieve === false );
                this.losts           = this.all.filter(data => data.type == 'lost');
                this.founds          = this.all.filter(data => data.type == 'found');
                setTimeout(() => this.loading = false, 1000);
            }, 1000);
        });
    }

    filter(){
        this.loading=true;
        this.all   = this.allNotArchived.filter(data => 
                            ('#' + data.serial_number.toLowerCase()).indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.created_by.username.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.unit_no.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.description.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            this.datePipe.transform(data.created_at, 'd/M/y').toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1
                            );
        this.losts           = this.all.filter(data => data.type == 'lost');
        this.founds          = this.all.filter(data => data.type == 'found');

        setTimeout(() => this.loading = false, 500);
    }

    filterArchieved(){
        this.loading=true;
        this.archieveds   = this.allArchived.filter(data => 
                            ('#' + data.serial_number.toLowerCase()).indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.created_by.username.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.unit_no.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.description.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            this.datePipe.transform(data.created_at, 'd/M/y').toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1
                            );
        this.archievedLosts           = this.archieveds.filter(data => data.type == 'lost');
        this.archievedFounds          = this.archieveds.filter(data => data.type == 'found');

        setTimeout(() => this.loading = false, 500);
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
                                setTimeout(() => this.loading = false, 1000);
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
