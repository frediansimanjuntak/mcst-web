import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contractor, Contractors } from '../../models/index';
import { ContractorService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'contractor',
  templateUrl: 'app/templates/contractor.html',
})

export class ContractorComponent implements OnInit {
	@ViewChild('deactiveModal') deactiveModal;
	@ViewChild('activeModal') activeModal;
	contractor: Contractor;
    contractors: Contractor[] = [];
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
                private contractorService: ContractorService,
                private alertService: AlertService,
                ) {

    }

    ngOnInit(): void {
		this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllContractors();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteContractor(contractor) {
        console.log(contractor);
        // this.contractorService.delete(contractor._id)
        //   .then(
        //     response => {
        //       if(response) {
        //         console.log(response);
        //         // console.log(response.error());
        //         alert(`The contractor could not be deleted, server Error.`);
        //       } else {
        //         this.alertService.success('Delete contractor successful', true);
        //         alert(`Delete Contractor successful`);
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> {
        //       console.log(error);
        //         alert(`The Contractor could not be deleted, server Error.`);
        //     }
        // );
    }

    openModal(contractor: Contractor){
        this.contractor = contractor;
    }

    activate(){
        this.contractor.active = true;
        this.activeModal.close();
        // this.contractorService.activation(this.contractor._id)
        //   .then(
        //     response => {
        //       if(response) {
        //         alert(`The Contractor could not be activated, server Error.`);
        //       } else {
        //         this.alertService.success('Activate Contractor successful', true);
        //         alert(`Activated Contractor successful`);
        //         this.activeModal.close();
        //         this.ngOnInit()
        //       }
        //     },
        //     error=> {
        //       console.log(error);
        //       this.activeModal.close();
        //         alert(`The Contractor could not be Activated, server Error.`);
        //     }
        // );
    }

    deactivate(){
    	this.contractor.active = false;
    	this.deactiveModal.close();
    }

    private loadAllContractors() {
        //---------------------------Call To Api-------------- //
        // this.contractorService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.contractors = data;
        //         }, 1000);
        //     });

        this.contractorService.getContractors().then(data => {
            this.contractors = data;
        });
    }

    editContractor(contractor: Contractor){
        this.router.navigate(['/contractor/edit', contractor._id]);
    }

}
