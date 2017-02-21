import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition } from '../../models/index';
import { PetitionService, AlertService, UnitService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import * as $ from "jquery";
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
    validTillDateOptions: any = {};
    model: any = {};
    id: string;
    cols: any[];
    checked: string[] = [];
    selectedValues: string[] = [];
    btnArchive: boolean = false;
    dataUnit: any[]=[];
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
                private _notificationsService: NotificationsService
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
                                        });
                                }
                }, 1000);
            });
    }

	private loadAllPetitions() {
        this.petitionService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.petitions = data.filter(data => data.archieve === false && data.development._id == this.name.default_development._id );
                    
                }, 1000);
        });
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
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: true,
                                clickToClose: true,
                            }
                        )
                    }
                );
    }

    add(){
      this.router.navigate([this.name.default_development.name_url + '/petition/add']);  
    }

    clearSelected(){
        this.selectedValues = [];
        this.checkSelected();
    }
}
