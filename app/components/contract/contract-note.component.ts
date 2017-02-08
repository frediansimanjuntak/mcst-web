import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoteService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'contract-note',
  templateUrl: 'app/templates/contract-note.html',
})

export class ContractNoteComponent implements OnInit  {
	contract: Contract;
    contracts: Contract[] = [];
    contractnote: any;
    model: any = {};
    images: any[];
    id: string;
    _id: string;
    public open;
    public close;
    loading = false;
    name: any;
    filesToUpload: Array<File>;

    constructor(private router: Router,
        private contractService: ContractService,
        private contractnoteService: ContractNoteService,
        private alertService: AlertService,
        private userService: UserService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
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
            });
        }
        if( this.id != null && this._id != null) {
            this.contractService.getById(this.id).subscribe(contract => {this.contract = contract;});
            this.contractnoteService.getById(this.id,this._id)
            .subscribe(contractnotice => {
                this.contractnote = contractnotice.contract_notice[0];
                this.images = [];
                for (var i = 0; i < this.contractnote.attachment.length; ++i) {
                    this.images.push({source:this.contractnote.attachment[i].url});
                };
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
        let formData:FormData = new FormData();
        for (var i = 0; i < this.model.attachment.length; i++) {
            formData.append("attachment", this.model.attachment[i]);
        }
        formData.append("status", this.model.status);
        formData.append("note_remark", this.model.note_remark);
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoteService.create(formData, this.id)
        .then(
            response => {
                this.alertService.success('Create contract notice successful', true);
                this.router.navigate([this.name.default_development.name + '/contract/view', id ]);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    deleteContractNote(contract: Contract) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoteService.delete(contract._id,this.id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Contract could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete contract successful', true);
                alert(`Delete Contarct successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Newsletter could not be deleted, server Error.`);
            }
        );
    }

    onChange(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.attachment = this.filesToUpload;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    cancel(id:any){
        this.router.navigate([this.name.default_development.name + '/contract/view', id ]);
    }
}
