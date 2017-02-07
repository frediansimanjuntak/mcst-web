import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, IncidentService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

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
    _id: string;
    loading = false;
    name: any;
    filesToUpload: Array<File>;

    constructor(private router: Router,
    	private contractService: ContractService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private incidentService: IncidentService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this._id = params['_id'];
        });
        this.model.reference_no = this._id;
        if( this.id != null) {
            this.contractService.getById(this.id).subscribe(contract => this.contract = contract);
        }
    }

    createContract() {
        let formData:FormData = new FormData();
        
        for (var i = 0; i < this.model.attachment.length; i++) {
            formData.append("attachment[]", this.model.attachment[i]);
        }
        formData.append("reference_no", this.model.reference_no);
        formData.append("reference_type", this.model.reference_type);
        formData.append("reference_id", this.model.reference_id);
        formData.append("contract_type", this.model.contract_type);
        formData.append("title", this.model.title);
        formData.append("remark", this.model.remark);
        console.log(formData)
        this.contractService.create(formData)
        .then(
            response => {
                this.alertService.success('Create contract successful', true);
                this.router.navigate([this.name.default_development.name + '/contract' ]);
            },
            error => {
                this.alertService.error(error);
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

    updateContract(id:any){
        this.contract.attachment = this.model.attachment
		this.contractService.update(this.contract)
		.then(
			response => {
                this.alertService.success('Update contract successful', true);
                this.router.navigate([this.name.default_development.name + '/contract/view', id ]);
            },
            error => {
            	this.alertService.error(error);
            }
        );
	}

    cancel(){
        this.router.navigate([this.name.default_development.name + '/contract' ]);
    }

    back(id:any){
        this.router.navigate([this.name.default_development.name + '/contract/view', id ]);
    }

    public getType(type:any, id:any){
        this.model.reference_type = type;
        this.model.reference_id = id;
    }
}