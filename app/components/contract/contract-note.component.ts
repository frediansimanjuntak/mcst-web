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
    model: any = {};
    images: any[];
    id: string;
    _id: string;
    public open;
    public close;
    loading = false;
    name: any;

    constructor(private router: Router,
        private contractService: ContractService,
        private contractnoteService: ContractNoteService,
        private alertService: AlertService,
        private userService: UserService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.images = [];
        this.images.push({source:'/assets/image/1.png'});
        this.images.push({source:'/assets/image/2.png'});
        this.images.push({source:'/assets/image/3.png'});
        this.images.push({source:'/assets/image/4.png'});
        this.images.push({source:'/assets/image/5.png'});
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoteService.getById(this.id,this._id).subscribe(contract => {this.contract = contract;});
        // if( this._id == null) {
        //     this.loadContractNotice();
        // }else{
        // 	this.contractService.getContract(this._id).then(contract => {this.contract = contract;});
        // }
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
        console.log(contract)
        this.router.navigate(['/contract/view', contract._id]);
    }

    createContractNote(id:any) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoteService.create(this.model, this.id)
        .then(
            response => {
                this.alertService.success('Create contract notice successful', true);
                this.router.navigate([this.name.development.name , 'contract/view', id]);
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
                this.alertService.success('Create contract successful', true);
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

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    cancel(id:any){
        this.router.navigate([this.name.default_development.name + '/contract/view', id ]);
    }
}
