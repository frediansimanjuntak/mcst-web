import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Contract } from '../../models/index';
import { ContractService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

@Component({
  moduleId: module.id,
  selector: 'contract',
  templateUrl: '/app/templates/contract.html',
})

export class ContractComponent implements OnInit  { 
	contract: Contract;
    contracts: Contract[] = [];
    model: any = {};
    id: string;
    public open;
    public close;  

    constructor(private router: Router, private contractService: ContractService, private alertService: AlertService,private route: ActivatedRoute) {}  

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id == null) {
            this.loadAllIncident();
        }else{
        	this.contractService.getContract(this.id).then(contract => {this.contract = contract;});
        }
    } 

    deleteContract(contract: Contract) {
    	console.log(contract)
        this.contractService.delete(contract._id) 
          .then(
            response => {
              if(response) { 
                console.log(response);
                // console.log(response.error());
                alert(`The Newsletter could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create user successful', true);
                alert(`Delete Newsletter successful`);
                this.ngOnInit()
              }
            },
            error=> { 
              console.log(error);
                alert(`The Newsletter could not be deleted, server Error.`);
            }
        );
    }
	
	private loadAllIncident() {
		this.contractService.getContracts().then(contracts => { 
			this.contracts = contracts ;
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' ); 
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' ); 
		});
    }

    view(contract: Contract){
        this.router.navigate(['/contract/view', contract._id]);
    }

    add(){
        this.router.navigate(['/contract/add']);
    }
}
