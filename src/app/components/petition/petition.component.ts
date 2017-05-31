import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition } from '../../models/index';
import { PetitionService, AlertService, UnitService, UserService, AttachmentService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';

import { Observable} from 'rxjs/Observable';
import { Location }               from '@angular/common';
import * as $ from "jquery";

import { ConfirmationService } from 'primeng/primeng';

// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'petition',
  templateUrl: '../../templates/petition.html',
})

export class PetitionComponent implements OnInit {
	petition: any;
    petitions: Petition[] = [];
    archivedPetitions: Petition[] = [];
    public ticketNumberFilter: string = '';
    public typeFilter: string = '';
    validTillDateOptions: any = {};
    model: any = {};
    id: string;
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
    public pdfSrc: string;
    public page: number;
    public options = {
        position: ["bottom", "right"],
        timeOut: 3000,
        lastOnBottom: true,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
    }
    name: any;
    loading: boolean = true;
    pdfUrl = 'https://mcst-app.s3-ap-southeast-1.amazonaws.com/attachment/letter_of_authorization_and_indemnity.pdf';
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
                private attachmentService: AttachmentService,
                
                ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.loadAllUnits();
        })
    }

    private logCheckbox(element: HTMLInputElement): void {
    }

    deletePetition(petition) {
        this.loading = true
        this.petitionService.delete(petition._id)
          .then(
            response => {
              if(response) {
                alert(`The Petition could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete Petition successful', true);
                alert(`Delete Petition successful`);
                this.ngOnInit()
              }
            },
            error=> {
              if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                alert(`The Petition could not be deleted, server Error.`);
            }
        );
    }

    openModal(petition){
        
    }

    filter(){
        this.loading=true;
        if(this.typeFilter != ''){
            this.petitions = this.all.filter(data => 
                                                            ('#'+data.reference_no.toLowerCase()).indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1 &&
                                                            data.petition_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1
                                                            );
        }else{
            this.petitions = this.all.filter(data => ('#'+data.reference_no.toLowerCase()).indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1);    
        }
        setTimeout(() => this.loading = false, 500);
    }

    filterArchieved(){
        this.loading=true;
        if(this.typeFilter != ''){
            this.archivedPetitions = this.allArchieved.filter(data => 
                                                            ('#'+ data.reference_no.toLowerCase()).indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1 &&
                                                            data.petition_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1
                                                                            );
        }else{
            this.archivedPetitions = this.allArchieved.filter(data => ('#'+data.reference_no.toLowerCase()).indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1);            
        }
        
        setTimeout(() => this.loading = false, 500);   
    }


    filterType(event:any){
        this.loading = true
        if(this.ticketNumberFilter != ''){
            this.petitions = this.all.filter(data => 
                                                data.petition_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1 &&
                                                ('#'+data.reference_no.toLowerCase()).indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1
                                            );    
        }else{
            this.petitions = this.all.filter(data => data.petition_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1);
        }
        setTimeout(() => this.loading = false, 500);
    }

    filterTypeArchieved(event:any){
        this.loading = true
        if(this.ticketNumberFilter != ''){
           this.archivedPetitions = this.archivedPetitions.filter(data => 
                                                data.petition_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1 &&
                                                ('#'+data.reference_no.toLowerCase()).indexOf(this.ticketNumberFilter.toLowerCase()) !==  -1
                                                );
        }else{
           this.archivedPetitions = this.allArchieved.filter(data => data.petition_type.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1); 
        }
        setTimeout(() => this.loading = false, 500);
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
                                            this.petition = petition.petitions;
                                            if(this.petition.property){
                                                let property = this.dataUnit.find(data => data._id ==  this.petition.property);
                                                this.petition.unit_no = '#' + property.address.unit_no + '-' + property.address.unit_no_2;
                                            }
                                            setTimeout(() => this.loading = false, 1000);
                                            this.pdfSrc =  'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
                                            this.page = 1;
                                        });
                                }
                }, 1000);
            });
    }

    viewPdf(petitions:any){
        window.open(petitions.attachment[0].url, '_blank');
    }

	private loadAllPetitions() {
        this.petitionService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.all               = data.filter(data => data.archieve === false && data.development._id == this.name.default_development._id );
                    this.allArchieved      = data.filter(data => data.archieve === true && data.development._id == this.name.default_development._id );
                    this.petitions         = data.filter(data => data.archieve === false && data.development._id == this.name.default_development._id );
                    this.archivedPetitions = data.filter(data => data.archieve === true && data.development._id == this.name.default_development._id );
                    setTimeout(() => this.loading = false, 1000);
                }, 1000);
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
        this.loading = true
        this.model.ids = this.selectedValues;
        this.petitionService.archive(this.model) .then(
                    data => {
                        this.ngOnInit();
                        this._notificationsService.success('Success', 'Archive requests successful')
                    },
                    error => {
                        if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                        
                        this.loading = false;
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
    
    preview(file:any){
        if(file.type=="application/pdf"){
            this.attachmentService.downloadPDF(file.url).subscribe(
                (res) => {
                var fileURL = URL.createObjectURL(res);
                window.open(fileURL, '_blank');
                }
            );  
        }
        else if(file.type.indexOf("image")!==  -1){
            var myWindow = window.open("", file.name, "_blank");
            myWindow.document.write("<head><title>" + file.name + "</title></head>");
            myWindow.document.write("<img src=" + file.url + ">");
            return myWindow;
        }
    }

    viewContract(id: string){ 
        this.router.navigate([this.name.default_development.name_url + '/contract/view', id]); 
    } 
}
    