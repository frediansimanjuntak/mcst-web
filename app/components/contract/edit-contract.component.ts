import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService } from '../../services/index';
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
    name: any;

    constructor(private router: Router,
    	private contractService: ContractService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        console.log(this.route.url);
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.model.reference_no = this.id;
        if( this.id != null) {
            this.contractService.getById(this.id).subscribe(contract => this.contract = contract);
        }
    }

    createContract() {
    	console.log(this.model)
        this.contractService.create(this.model)
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

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    updateContract(id:any){
        this.contract.attachment = this.model.attachment
        console.log(this.contract)
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
}