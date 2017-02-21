import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoticeService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';

@Component({
  // moduleId: module.id,
  selector: 'contract-notice',
  templateUrl: 'app/templates/contract-notice.html',
})

export class ContractNoticeComponent implements OnInit  {
	contract: Contract;
    contracts: Contract[] = [];
    contractnotice:any;
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
        private appComponent: AppComponent,
        private userService: UserService) {}

    ngOnInit(): void {
        this.model.attachment = [];
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        // this.contractnoticeService.getById(this.id,this._id).subscribe(contract => {this.contract = contract;});
        if( this.id != null && this._id == null ) {
            this.contractService.getById(this.id).subscribe(contract => {this.contract = contract;});
        }
        if( this.id != null && this._id != null) {
            this.contractService.getById(this.id).subscribe(contract => {this.contract = contract;});
            this.contractnoticeService.getById(this.id,this._id)
            .subscribe(contractnotice => {
                this.contractnotice = contractnotice.contract_notice[0];
                this.images = [];
                for (var i = 0; i < this.contractnotice.attachment.length; ++i) {
                    this.images.push({source:this.contractnotice.attachment[i].url});
                };
            });
        }
        setTimeout(() => this.appComponent.loading = false, 1000);
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
        this.router.navigate(['/contract/view', contract._id]);
    }

    createContractNotice(id:any) {
        this.appComponent.loading = true
        if(this.model.attachment.length != 0) {
            this.model.publish = false;
            let formData:FormData = new FormData();
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment", this.model.attachment[i]);
            }   
            formData.append("start_time", this.model.start_time);
            formData.append("end_time", this.model.end_time);
            formData.append("title", this.model.title);
            formData.append("description", this.model.description);
            formData.append("status", this.model.status);
            formData.append("publish", this.model.publish);
            this.route.params.subscribe(params => {
                this.id = params['id'];
                this._id = params['_id'];
            });
            this.contractnoticeService.create(formData, this.id)
            .then(
                response => {
                    this.alertService.success('Create contract notice successful', true);
                    this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
                },
                error => {
                    this.alertService.error(error);
                }
            );
        }
    }

    publishContractNotice(id:any) {
        this.appComponent.loading = true
        if(this.model.attachment.length > 0) {
            this.route.params.subscribe(params => {
                this.id = params['id'];
                this._id = params['_id'];
            });
            this.model.publish = true;
            let formData:FormData = new FormData();
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment", this.model.attachment[i]);
            }
            formData.append("start_time", this.model.start_time);
            formData.append("end_time", this.model.end_time);
            formData.append("title", this.model.title);
            formData.append("description", this.model.description);
            formData.append("status", this.model.status);
            formData.append("publish", this.model.publish);
            this.contractnoticeService.create(formData, this.id)
            .then(
                response => {
                    this.alertService.success('Create contract notice successful', true);
                    this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
                },
                error => {
                    this.alertService.error(error);
                }
            );
        }
    }

    publish(contract: Contract){
        this.appComponent.loading = true
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
        this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
    }
}
