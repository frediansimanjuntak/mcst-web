import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoteService } from '../../services/index';

import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Observable';


@Component({
  // moduleId: module.id,
  selector: 'contract-note',
  templateUrl: '../../templates/contract-note.html',
})

export class ContractNoteComponent implements OnInit  {
	contract: Contract;
    loading: boolean = true;
    contracts: Contract[] = [];
    contractnote: any;
    model: any = {};
    images: any[];
    id: string;
    _id: string;
    public open;
    public close;
    name: any;

    constructor(private router: Router,
        private contractService: ContractService,
        private contractnoteService: ContractNoteService,
        private alertService: AlertService,
        private userService: UserService,
        
        private _notificationsService: NotificationsService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.model.attachment = [];
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        // this.contractnoteService.getById(this.id,this._id).subscribe(contract => {this.contract = contract;});
        if( this.id != null && this._id == null ) {
            this.contractService.getById(this.id)
            .subscribe(contract => {
                this.contract = contract;
                this.model.status = this.contract.status;
                setTimeout(() => this.loading = false, 1000);
            });
        }
        if( this.id != null && this._id != null) {
            this.contractService.getById(this.id).subscribe(contract => {this.contract = contract;});
            this.contractnoteService.getById(this.id,this._id)
            .subscribe(contractnote => {
                this.contractnote = contractnote.contract_note[0];
                this.images = [];
                for (var i = 0; i < this.contractnote.attachment.length; ++i) {
                    this.images.push({source:this.contractnote.attachment[i].url});
                };
                setTimeout(() => this.loading = false, 1000);
            });
        }
    }

	private loadContractNote() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
		this.contractnoteService.getAll(this.id).subscribe(contracts => {
			this.contracts = contracts ;
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' );
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' );
		});
    }

    view(contract: Contract){
        this.router.navigate(['/contract/view', contract._id]);
    }

    createContractNote(id:any) {
        if(this.model.attachment.length != 0) {
            this.loading = true
            let formData:FormData = new FormData();
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment", this.model.attachment[i]);
            }
            formData.append("status", this.model.status);
            formData.append("note_remark", this.model.note_remark);
            formData.append("reference_id", this.contract.reference_id);
            this.route.params.subscribe(params => {
                this.id = params['id'];
                this._id = params['_id'];
            });
            this.contractnoteService.create(formData, this.id)
            .then(
                data => {
                    this._notificationsService.success('Success', 'Create contract note successful')
                    this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
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
                    
                    setTimeout(() => this.loading = false, 1000);
                }
            );
        }
    }

    deleteContractNote(contract: Contract) {
        this.loading = true
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoteService.delete(contract._id,this.id)
          .then(
                data => {
                    this._notificationsService.success('Success', 'Delete contract note successful')
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
                    
                    setTimeout(() => this.loading = false, 1000);
                 }
        );
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       for (let z = 0; z < files.length; ++z) {
		   	if (!files[z].type.includes("image")) {
                this._notificationsService.error('Error', 'Please upload image only!.')
			  	this.model.attachment = [];
			  	break;
		   	}else{
				this.model.attachment = files;
		   	}
	   	}
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    cancel(id:any){
        this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
    }
}
