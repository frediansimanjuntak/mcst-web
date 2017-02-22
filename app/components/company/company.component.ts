import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Company, Companies } from '../../models/index';
import { CompanyService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'company',
  templateUrl: 'app/templates/company.html',
})

export class CompanyComponent implements OnInit {
	@ViewChild('deactiveModal') deactiveModal;
	@ViewChild('activeModal') activeModal;
	company: Company;
    companies: Company[] = [];
    validTillDateOptions: any = {};
    model: any = {};
    cols: any[];
    public developmentId;
    public data;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    valid_tillStatus: string;
    stickyStatus: string;
    constructor(
                private router: Router,
                private companyService: CompanyService,
                private alertService: AlertService,
                private appComponent: AppComponent,
                ) {

    }

    ngOnInit(): void {
		this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllCompanies();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteCompany(company) {
        this.companyService.delete(company._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                alert(`The Company could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete company successful', true);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Company could not be deleted, server Error.`);
            }
        );
    }

    openModal(company: Company){
        this.company = company;
    }

    activate(){
        this.companyService.activation(this.company._id)
          .then(
            response => {
              if(response) {
                alert(`The Company could not be activated, server Error.`);
              } else {
                this.alertService.success('Activate company successful', true);
                alert(`Activated Company successful`);
                this.activeModal.close();
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
              this.activeModal.close();
                alert(`The Company could not be Activated, server Error.`);
            }
        );
    }

    deactivate(){
    	this.company.active = false;
    	this.deactiveModal.close();
    }

    private loadAllCompanies() {
        this.companyService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.companies          = data;
                }, 1000);
            });
    }

    editCompany(company: Company){
        this.router.navigate(['/company/edit', company._id]);
    }

    add(){
       this.router.navigate(['/company/add']);   
    }
}
