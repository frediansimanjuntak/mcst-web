import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition } from '../../models/index';
import { PetitionService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
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
	petition: Petition;
    petitions: Petition[] = [];
    validTillDateOptions: any = {};
    model: any = {};
    id: string;
    cols: any[];
    checked: string[] = [];
    selectedValues: string[] = [];
    btnArchive: boolean = false;
    public developmentId;
    public data;
    public petitionPending;
    public petitionProgress;
    public petitionApproved;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    public tomorrow: Date;
    public afterTomorrow: Date;
    constructor(
                private router: Router,
                private petitionService: PetitionService,
                private alertService: AlertService,
                private route: ActivatedRoute,
                private location: Location
                ) {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() - 7);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);

    }

    ngOnInit(): void {
		this.developmentId = '585b36585d3cc41224fe518a';
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllPetitions();
        }else{
        	this.petitionService.getPetition(this.id).then(petition => {this.petition = petition;});
        }
    }

    private logCheckbox(element: HTMLInputElement): void {
        console.log( `Checkbox ${element.value} was ${element.checked ? '' : 'un'}checked\n`);
    }

    deletePetition(petition) {
      console.log(petition);
        // this.announcementService.delete(announcement._id)
        //   .then(
        //     response => {
        //       if(response) {
        //         console.log(response);
        //         // console.log(response.error());
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //       } else {
        //         this.alertService.success('Create user successful', true);
        //         alert(`Delete Newsletter successful`);
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> {
        //       console.log(error);
        //         alert(`The Newsletter could not be deleted, server Error.`);
        //     }
        // );
    }

    openModal(petition){

    }

	private loadAllPetitions() {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          = data.find(data => data._id === this.developmentId );
        //             this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' );
        //             this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' );
        //             console.log(this.dataAgm);
        //         }, 1000);
        //     });

        this.petitionService.getPetitions().then(data => {
            this.petitions         = data;
		});
    }

    viewPetition(petition: Petition){
        this.router.navigate(['/petition/view', petition._id]);
    }

    editPetition(petition: Petition){
        this.router.navigate(['/petition/edit', petition._id]);
    }

    checkSelected(){
        this.btnArchive = this.selectedValues.length > 0 ? true : false;
    }
    
  	goBack(): void {
    	this.location.back();
  	}

    archieveSelected(){
        console.log(this.selectedValues);
    }

    clearSelected(){
        this.selectedValues = [];
        this.checkSelected();
    }
}
