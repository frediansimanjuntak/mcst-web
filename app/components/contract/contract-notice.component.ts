import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService } from '../../services/index';
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
        this.contractService.getContract(this.id).then(contract => {this.contract = contract;});
        // if( this._id == null) {
        //     this.loadContractNotice();
        // }else{
        // 	this.contractService.getContract(this._id).then(contract => {this.contract = contract;});
        // }
    }

	private loadContractNotice() {
		this.contractService.getContracts().then(contracts => {
			this.contracts = contracts ;
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' );
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' );
		});
    }

    view(contract: Contract){
        console.log(contract)
        this.router.navigate(['/contract/view', contract._id]);
    }

    createContractNotice() {
        this.model.publish = false;
        console.log(this.model)
        // this.contractService.create(this.model)
        // .then(
        //     response => {
        //         this.alertService.success('Create contract notice successful', true);
        //         this.router.navigate(['/development']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
    }

    publishContractNotice() {
        this.model.publish = true;
        console.log(this.model)
        // this.contractService.create(this.model)
        // .then(
        //     response => {
        //         this.alertService.success('Create contract notice successful', true);
        //         this.router.navigate(['/development']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
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
