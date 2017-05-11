import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoteService, ContractNoticeService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { ConfirmationService } from 'primeng/primeng';


@Component({
  // moduleId: module.id,
  selector: 'contract',
  templateUrl: 'app/templates/contract.html',
})

export class ContractComponent implements OnInit  {
	contract: Contract;
    contracts: Contract[] = [];
    contractnotes: any[];
    contractnotices: any[];
    model: any = {};
    images: any[];
    id: string;
    _id: any;
    public open;
    public close;
    name: any;
    dataFilter: string = '';
    all: any[] = [];
    

    constructor(private router: Router, 
        private contractService: ContractService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private contractnoteService:ContractNoteService,
        private appComponent: AppComponent,
        private confirmationService: ConfirmationService,
        private _notificationsService: NotificationsService,
        private contractnoticeService:ContractNoticeService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.images = [];
        this.images.push({source:'/assets/image/1.png'});
        this.images.push({source:'/assets/image/2.png'});
        this.images.push({source:'/assets/image/3.png'});
        this.images.push({source:'/assets/image/4.png'});
        this.images.push({source:'/assets/image/5.png'});
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if(this.id != null) {
            this.contractService.getById(this.id)
            .subscribe(contract => {
                this.contract = contract;
                this.images = [];
                for (var i = 0; i < this.contract.attachment.length; ++i) {
                    this.images.push({source:this.contract.attachment[i].url});
                };
            });
            this.contractnoteService.getAll(this.id)
            .subscribe(contractnotes => {
                if(contractnotes.length > 0) { 
                    this.contractnotes = contractnotes;
                }
            })
            this.contractnoticeService.getAll(this.id)
            .subscribe(contractnotices => {
                if(contractnotices.length > 0) {
                    this.contractnotices = contractnotices;
                }
                setTimeout(() => this.appComponent.loading = false, 1000);
            })
        }
        if(this.id == null) {
            this.loadAllContract();
        }
    }

    deleteContract(contract: Contract) {
        this.appComponent.loading = true
        this.contractService.delete(contract._id)
        .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete Contract successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The Contract could not be deleted, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
        );
    }

    deleteContractConfirmation(contract) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this project?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteContract(contract)
            }
        });
    }

    deleteContractNote(contractnoteid: any , id:any) {
        this.appComponent.loading = true
        this.contractnoteService.delete(id,contractnoteid)
        .then(
            data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete Contract successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The Contract could not be deleted, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
            //     }
            // response => {
            //     if(response) {
            //         console.log(response);
            //         this._notificationsService.error(
            //                 'Error',
            //                 'The Contract could not be deleted, server Error',
            //         )
            //         this.appComponent.loading = false;
            //     } else {
            //         this._notificationsService.success(
            //                 'Success',
            //                 'Delete Contarct successful',
            //         )
            //         this.ngOnInit();
            //     }
            // },
            // error=> {
            //     console.log(error);
            //     this._notificationsService.error(
            //                 'Success',
            //                 'The Contract could not be deleted, server Error',
            //     )
            }
        );
    }

    deleteContractNoteConfirmation(contractnote: any , id:any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this project note?',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteContractNote(id,contractnote._id)
            }
        });
    }

	private loadAllContract() {
		this.contractService.getAll().subscribe(contracts => {
			this.contracts = contracts ;
            this.all       = contracts;
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' );
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' );
            setTimeout(() => this.appComponent.loading = false, 1000);
		});
    }

    filter(){
        this.appComponent.loading = true;
        this.contracts  = this.all.filter(data => 
                data.title.toLowerCase().indexOf(this.dataFilter.toLowerCase()) !==  -1
            );
        this.open       = this.contracts.filter(data => data.status === 'open');
        this.close      = this.contracts.filter(data => data.status === 'closed');
        setTimeout(() => this.appComponent.loading = false, 500);
    }

    view(contract: Contract){
        this.router.navigate([this.name.default_development.name_url + '/contract/view', contract._id]);
    }

    viewNotice(id: any, contractnotice:any){
        this.router.navigate([this.name.default_development.name_url + '/contract/notice/' + id + '/view' , contractnotice._id]);
    }

    viewNote(id: any, contractnote:any){
        this.router.navigate([this.name.default_development.name_url + '/contract/note/' + id + '/view' , contractnote._id]);
    }

    viewIncident(id: any){
        this.router.navigate([this.name.default_development.name_url + '/incident/view', id]);
    }

    edit(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/edit', id]);
    }

    add_note(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/add/note', id]);
    }

    add_notice(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/add/notice', id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/contract/add']);
    }

    back(){
        this.router.navigate([this.name.default_development.name_url + '/contract']);
    }

    publish(contract: Contract){
        this.appComponent.loading = true
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoticeService.publish(this.id,contract._id)
        .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Publish notice successful',
                    )
                    this.ngOnInit()
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Publish failed, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
    }
}
