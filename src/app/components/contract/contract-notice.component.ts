import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoticeService } from '../../services/index';
import * as moment from 'moment'
import 'rxjs/add/operator/switchMap';
import { NotificationsService } from 'angular2-notifications';
import { Observable} from 'rxjs/Observable';


@Component({
  // moduleId: module.id,
  selector: 'contract-notice',
  templateUrl: '../../templates/contract-notice.html',
})

export class ContractNoticeComponent implements OnInit  {
	contract: Contract;
    contracts: Contract[] = [];
    contractnotice:any;
    model: any = {};
    images: any[];
    today: Date;
    id: string;
    _id: string;
    public open;
    public close;
    name: any;
    loading: boolean = true;

    constructor(private router: Router, 
        private contractService: ContractService, 
        private contractnoticeService: ContractNoticeService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        
        private _notificationsService: NotificationsService,
        private userService: UserService) {}

    ngOnInit(): void {
        this.today = new Date();
        this.model.start_time = this.today
        this.model.attachment = [];
        this.userService.getByToken().subscribe(name => {this.name = name.user;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        // this.contractnoticeService.getById(this.id,this._id).subscribe(contract => {this.contract = contract;});
        if( this.id != null && this._id == null ) {
            this.contractService.getById(this.id)
            .subscribe(contract => {
                this.contract = contract;
                setTimeout(() => this.loading = false, 1000);
            });
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
                setTimeout(() => this.loading = false, 1000);
            });
        }
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

    back(){
        window.history.back();
    }

    createContractNotice(id:any) {
        if(this.model.attachment.length != 0) {
            this.loading = true
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
                data => {
                    this._notificationsService.success('Success', 'Create contract notice successful')
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
                    this._notificationsService.error( 'Error', error.json().message)
                    setTimeout(() => this.loading = false, 1000);
                }
            );
        }
    }

    publishContractNotice(id:any) {
        if(this.model.attachment.length > 0) {
            this.loading = true
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
                data => {
                    this._notificationsService.success('Success', 'Create & publish notice successful')
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

    publish(contract: Contract){
        this.loading = true
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.contractnoticeService.publish(this.id,contract._id)
        .then(
            data => {
                this._notificationsService.success('Success', 'Publish notice successful')
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
            });
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
