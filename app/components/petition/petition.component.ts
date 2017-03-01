import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition } from '../../models/index';
import { PetitionService, AlertService, UnitService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import * as $ from "jquery";
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';

// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'petition',
  templateUrl: 'app/templates/petition.html',
})

export class PetitionComponent implements OnInit {
	petition: any;
    petitions: Petition[] = [];
    archivedPetitions: Petition[] = [];
    public ticketNumberFilter: string = '';
    validTillDateOptions: any = {};
    model: any = {};
    id: string;
    filterType: string;
    all: any[] = [];
    allArchieved: any[] = [];
    cols: any[];
    checked: string[] = [];
    selectedValues: string[] = [];
    btnArchive: boolean = false;
    dataUnit: any[]=[];
    buttonViewArchive: boolean;
    public developmentId;
    public data;
    public petitionPending;
    public petitionProgress;
    public petitionApproved;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public options = {
        position: ["bottom", "right"],
        timeOut: 3000,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
    }
    name: any;

    constructor(
                private router: Router,
                private petitionService: PetitionService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location,
                private userService: UserService,
                private unitService: UnitService,
                private _notificationsService: NotificationsService,
                private confirmationService: ConfirmationService,
                private appComponent: AppComponent,
                ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadAllUnits();
                            })
    }

    private logCheckbox(element: HTMLInputElement): void {
    }

    deletePetition(petition) {
        this.appComponent.loading = true
        this.petitionService.delete(petition._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                alert(`The Petition could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete Petition successful', true);
                alert(`Delete Petition successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Petition could not be deleted, server Error.`);
            }
        );
    }

    openModal(petition){
        
    }

    filter(){
        this.appComponent.loading=true;
        this.petitions = this.all.filter(data => data.reference_no.toLowerCase().indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1);
        setTimeout(() => this.appComponent.loading = false, 500);
    }

    filterArchieved(){
        this.appComponent.loading=true;
        this.archivedPetitions = this.allArchieved.filter(data => data.reference_no.toLowerCase().indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1);
        setTimeout(() => this.appComponent.loading = false, 500);   
    }

    private loadAllUnits(): void {
        this.unitService.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.dataUnit       = data.properties;
                    if( this.id == null) {
                                    this.loadAllPetitions();
                                }else{
                                    this.petitionService.getById(this.id)
                                        .subscribe(petition => {
                                            this.petition = petition;
                                            let property = this.dataUnit.find(data => data._id ==  this.petition.property);
                                            this.petition.unit_no = '#' + property.address.unit_no + '-' + property.address.unit_no_2;
                                            setTimeout(() => this.appComponent.loading = false, 1000);
                                        });
                                }
                }, 1000);
            });
    }

	private loadAllPetitions() {
        this.petitionService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.all               = data.filter(data => data.archieve === false && data.development._id == this.name.default_development._id );
                    this.allArchieved      = data.filter(data => data.archieve === true && data.development._id == this.name.default_development._id );
                    this.petitions         = data.filter(data => data.archieve === false && data.development._id == this.name.default_development._id );
                    this.archivedPetitions = data.filter(data => data.archieve === true && data.development._id == this.name.default_development._id );
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }, 1000);
        });
    }

    viewArchieved(){
        this.appComponent.loading = true
        this.buttonViewArchive = true;
        setTimeout(() => this.appComponent.loading = false, 500);
    }

    viewUnarchieved(){
        this.appComponent.loading = true
        this.buttonViewArchive = false;
        setTimeout(() => this.appComponent.loading = false, 500);
    }

    viewPetition(petition: Petition){
        this.router.navigate([this.name.default_development.name_url + '/petition/view', petition._id]);
    }

    editPetition(petition: Petition){
        this.router.navigate([this.name.default_development.name_url + '/petition/edit', petition._id]);
    }

    checkSelected(){
        this.btnArchive = this.selectedValues.length > 0 ? true : false;
    }
    
  	goBack(): void {
    	this.location.back();
  	}

    archieveSelected(){
        this.appComponent.loading = true
        this.model.ids = this.selectedValues;
        this.petitionService.archive(this.model) .then(
                    data => {
                        this.ngOnInit();
                        this._notificationsService.success(
                            'Success',
                            'Archive requests successful',
                        )
                    },
                    error => {
                        console.log(error);
                        this._notificationsService.error(
                            'Error',
                            'Archive failed, server Error',
                        )
                        this.appComponent.loading = false;
                    }
                );
    }

    archieveConfirmation() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to archieve these requests?',
            header: 'Archieve Confirmation',
            accept: () => {
                this.archieveSelected()
            }
        });
    }

    add(){
      this.router.navigate([this.name.default_development.name_url + '/petition/add']);  
    }

    clearSelected(){
        this.selectedValues = [];
        this.checkSelected();
    }
}
