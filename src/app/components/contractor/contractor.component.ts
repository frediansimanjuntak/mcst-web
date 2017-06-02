import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contractor, Contractors } from '../../models/index';
import { ContractorService, AlertService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';
import * as $ from "jquery";
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';
// import { PublishAnnouncementModalComponent, PublishAnnouncementModalData } from './publish-announcement-modal.component';


@Component({
  // moduleId: module.id,
  selector: 'contractor',
  templateUrl: '../../templates/contractor.html',
})

export class ContractorComponent implements OnInit {
	@ViewChild('deactiveModal') deactiveModal;
	@ViewChild('activeModal') activeModal;
	contractor: Contractor;
    contractors: Contractor[] = [];
    model: any = {};
    public developmentId;
    public data;
    loading: boolean = true;
    name: any;

    constructor(
                private router: Router,
                private contractorService: ContractorService,
                private alertService: AlertService,
                private userService: UserService,
                private _notificationsService: NotificationsService
                ) {

    }

    ngOnInit(): void {
		  this.userService.getByToken()
          .subscribe(name => {
            this.name = name.user;
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
        this.loading = true;
        this.contractorService.delete(contractor._id)
          .then(
              data => {
                    this._notificationsService.success('Success', 'Delete contractor successful')
                    this.ngOnInit()
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
                    this.loading = false;
              }
        );
    }

    openModal(contractor: Contractor){
        this.contractor = contractor;
    }

    activate(){
        this.loading = true;
        this.contractorService.activation(this.contractor._id)
          .then(
             data => {
                    this._notificationsService.success('Success', 'Activate Contractor successful')
                    this.activeModal.close();
                    this.ngOnInit()
                },
                error => {
                    this.activeModal.close();
                    if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                    this.loading = false;
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
                    setTimeout(() => this.loading = false, 1000);
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
