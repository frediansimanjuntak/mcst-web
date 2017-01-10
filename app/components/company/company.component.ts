import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { Company, Companies } from '../../models/index';
import { CompanyService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { NG_TABLE_DIRECTIVES }    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  moduleId: module.id,
  selector: 'company',
  templateUrl: '/app/templates/company.html',
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
      console.log(company);
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

    

    openModal(company: Company){
        this.company = company;
    }

    activate(){
    	this.company.active = true;
    	this.activeModal.close();
    }

    deactivate(){
    	this.company.active = false;
    	this.deactiveModal.close();
    }

    private loadAllCompanies() {
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

        this.companyService.getCompanies().then(data => {
            this.companies = data;
        });
    }

    editCompany(company: Company){
        this.router.navigate(['/company/edit', company._id]);
    }

}
