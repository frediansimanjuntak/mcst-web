import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Company, Companies } from '../../models/index';
import { CompanyService, AlertService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';

import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'company',
  templateUrl: '../../templates/company.html',
})

export class CompanyComponent implements OnInit {
	@ViewChild('deactiveModal') deactiveModal;
	@ViewChild('activeModal') activeModal;
	company: Company;
    companies: Company[] = [];
    validTillDateOptions: any = {};
    model: any = {};
    cols: any[];
    loading: boolean = true;
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
                private _notificationsService: NotificationsService,
                private companyService: CompanyService,
                private alertService: AlertService,
                private userService: UserService
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
                      if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } ;
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
              if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
              this.activeModal.close();
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
                    this.companies = data;
                }, 1000);
                setTimeout(() => this.loading = false, 1000);
            });
    }

    editCompany(company: Company){
        this.router.navigate(['/company/edit', company._id]);
    }

    add(){
       this.router.navigate(['/company/add']);   
    }
}
