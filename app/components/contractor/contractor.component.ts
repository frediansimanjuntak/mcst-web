import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contractor, Contractors } from '../../models/index';
import { ContractorService, AlertService, UserService} from '../../services/index';
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
    model: any = {};
    public developmentId;
    public data;
      name: any;
    constructor(
                private router: Router,
                private contractorService: ContractorService,
                private alertService: AlertService,
                private userService: UserService,
                ) {

    }

    ngOnInit(): void {
		  this.userService.getByToken()
          .subscribe(name => {
            this.name = name;
           this.loadAllContractors();
          })
        
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteContractor(contractor) {
        this.contractorService.delete(contractor._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                alert(`The contractor could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete contractor successful', true);
                alert(`Delete Contractor successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Contractor could not be deleted, server Error.`);
            }
        );
    }

    openModal(contractor: Contractor){
        this.contractor = contractor;
    }

    activate(){
        this.contractorService.activation(this.contractor._id)
          .then(
            response => {
              if(response) {
                alert(`The Contractor could not be activated, server Error.`);
              } else {
                this.alertService.success('Activate Contractor successful', true);
                alert(`Activated Contractor successful`);
                this.activeModal.close();
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
              this.activeModal.close();
                alert(`The Contractor could not be Activated, server Error.`);
            }
        );
    }

    deactivate(){
    	this.contractor.active = false;
    	this.deactiveModal.close();
    }

    private loadAllContractors() {
        this.contractorService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.contractors = data;
                }, 1000);
            });
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/contractor/add']);
    }

    editContractor(contractor: Contractor){
        this.router.navigate([this.name.default_development.name_url + '/contractor/edit', contractor._id]);
    }

}
