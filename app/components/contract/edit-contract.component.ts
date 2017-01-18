import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-contract',
  templateUrl: 'app/templates/edit-contract.html',
})

export class EditContractComponent  implements OnInit {
	contract: Contract;
    model: any = {};
    id: string;
    loading = false;
    authToken: any;

    constructor(private router: Router,
    	private contractService: ContractService,
    	private alertService: AlertService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        console.log(this.route.url);
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.model.reference_no = this.id;
        if( this.id != null) {
            this.contractService.getContract(this.id).then(contract => this.contract = contract);
        }
    }

    createContract() {
    	console.log(this.model)
        this.contractService.create(this.model)
        .then(
            response => {
                this.alertService.success('Create contract successful', true);
                this.router.navigate(['/development']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    createContractNote() {
        console.log(this.model)
        this.contractService.create(this.model)
        .then(
            response => {
                this.alertService.success('Create contract note successful', true);
                this.router.navigate(['/development']);
            },
            error => {
                this.alertService.error(error);
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

    updateContract(){
        this.contract.attachment = this.model.attachment
        console.log(this.contract)
		this.contractService.update(this.contract)
		.then(
			response => {
                this.alertService.success('Update contract successful', true);
                this.router.navigate(['/contract']);
            },
            error => {
            	this.alertService.error(error);
            }
        );
	}

    cancel(){
        this.authToken = JSON.parse(localStorage.getItem('authToken'));
        this.router.navigate([this.authToken.default_development.name + '/contract' ]);
    }

    back(id:any){
        this.authToken = JSON.parse(localStorage.getItem('authToken'));
        this.router.navigate([this.authToken.default_development.name + '/contract/view', id ]);
    }
}