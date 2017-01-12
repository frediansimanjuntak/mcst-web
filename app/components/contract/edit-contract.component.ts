import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-contract',
  templateUrl: 'app/templates/edit-contract.html',
})

export class EditContractComponent  implements OnInit {
	contract: Contract;
    model: any = {};
    id: string;
    loading = false;

    constructor(private router: Router,
    	private contractService: ContractService,
    	private alertService: AlertService,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.contractService.getById(this.id).subscribe(contract => this.contract = contract);
        }
    }

    createContract() {
    	console.log(this.model)
        this.contractService.create(this.model)
        .then(
            response => {
                this.alertService.success('Update development successful', true);
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

 //    updateDevelopment(){
	// 	this.contractService.update(this.contract)
	// 	.then(
	// 		response => {
 //                this.alertService.success('Update development successful', true);
 //                this.router.navigate(['/development']);
 //            },
 //            error => {
 //            	this.alertService.error(error);
 //            }
 //        );
	// }
}