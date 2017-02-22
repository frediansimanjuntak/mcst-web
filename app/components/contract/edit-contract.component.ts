import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, IncidentService } from '../../services/index';
import '../../rxjs-operators';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';
import { AppComponent } from '../index';

@Component({
  // moduleId: module.id,
  selector: 'edit-contract',
  templateUrl: 'app/templates/edit-contract.html',
})

export class EditContractComponent  implements OnInit {
    public reference_type: any; 
    public reference_id: any; 
	contract: Contract;
    incident: any[] = [];
    model: any = {};
    id: string;
    refno: string;
    loading = false;
    name: any;

    constructor(private router: Router,
    	private contractService: ContractService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private appComponent: AppComponent,
        private incidentService: IncidentService,
        private _notificationsService: NotificationsService,) {}

    ngOnInit(): void {
        this.model.attachment = [];
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.refno = params['refno'];
            this.reference_id = params['refid'];
            this.reference_type = params['type']
        });
        this.model.reference_no = this.refno;
        if( this.id != null) {
            this.contractService.getById(this.id).subscribe(contract => this.contract = contract);
        }
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    createContract() {
        this.appComponent.loading = true
        if(this.model.attachment.length > 0) {
            let formData:FormData = new FormData();
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment[]", this.model.attachment[i]);
            }
            formData.append("reference_no", this.model.reference_no);
            formData.append("reference_type", this.reference_type);
            formData.append("start_time", this.model.start_time);
            formData.append("end_time", this.model.end_time);
            formData.append("reference_id", this.reference_id);
            formData.append("contract_type", this.model.contract_type);
            formData.append("title", this.model.title);
            formData.append("remark", this.model.remark);
            this.contractService.create(formData)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Create contract successful',
                    )
                    this.router.navigate([this.name.default_development.name_url + '/contract' ]);
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'Create data failed, server Error',
                    )
                    setTimeout(() => this.appComponent.loading = false, 1000);
                }
            );
        }
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    updateContract(id:any){
        this.appComponent.loading = true
        this.contract.attachment = this.model.attachment
		this.contractService.update(this.contract)
		.then(

			response => {
                 this._notificationsService.success(
                            'Success',
                            'Update contract successful',
                    )
                this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
            },
            error => {
                this._notificationsService.error(
                            'Error',
                            'Update contract failed',
                    )
            	this.appComponent.loading = false
            }
        );
	}

    cancel(){
        this.router.navigate([this.name.default_development.name_url + '/contract' ]);
    }

    back(id:any){
        this.router.navigate([this.name.default_development.name_url + '/contract/view', id ]);
    }

    public getType(type:any, id:any){
        this.model.reference_type = type;
        this.model.reference_id = id;
    }
}