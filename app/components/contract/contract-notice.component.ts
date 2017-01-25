import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoticeService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'contract-notice',
  templateUrl: 'app/templates/contract-notice.html',
})

export class ContractNoticeComponent implements OnInit  {
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
        private contractnoticeService: ContractNoticeService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService) {}

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
        this.contractnoticeService.getById(this.id,this._id).subscribe(contract => {this.contract = contract;});
        // if( this._id == null) {
        //     this.loadContractNotice();
        // }else{
        // 	this.contractService.getContract(this._id).then(contract => {this.contract = contract;});
        // }
    }

	private loadContractNotice() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
		this.contractnoticeService.getAll(this.id).subscribe(contracts => {
			this.contracts = contracts ;
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' );
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' );
		});
    }

    view(contract: Contract){
        console.log(contract)
        this.router.navigate(['/contract/view', contract._id]);
    }

    createContractNotice(id:any) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.model.publish = false;
        this.contractnoticeService.create(this.model, this.id)
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

    publishContractNotice(id:any) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.model.publish = true;
        this.contractnoticeService.create(this.model, this.id)
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

    publish(contract: Contract){
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoticeService.publish(this.id,contract._id);
        this.ngOnInit()
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
