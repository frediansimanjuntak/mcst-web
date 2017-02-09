import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';

@Component({
  // moduleId: module.id,
  selector: 'contract',
  templateUrl: 'app/templates/contract.html',
})

export class ContractComponent implements OnInit  {
	contract: Contract;
    contracts: Contract[] = [];
    model: any = {};
    images: any[];
    id: string;
    public open;
    public close;
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
        });
        if( this.id == null) {
            this.loadAllContract();
        }else{
        	this.contractService.getById(this.id)
            .subscribe(contract => {
                this.contract = contract;
                this.images = [];
                for (var i = 0; i < this.contract.attachment.length; ++i) {
                    this.images.push({source:this.contract.attachment[i].url});
                };
            });
        }
    }

    deleteContract(contract: Contract) {
        this.contractService.delete(contract._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Contract could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create contract successful', true);
                alert(`Delete Contarct successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Newsletter could not be deleted, server Error.`);
            }
        );
    }

	private loadAllContract() {
		this.contractService.getAll().subscribe(contracts => {
			this.contracts = contracts ;
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' );
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' );
		});
    }

    view(contract: Contract){
        this.router.navigate([this.name.default_development.name + '/contract/view', contract._id]);
    }

    edit(id: any){
        this.router.navigate([this.name.default_development.name + '/contract/edit', id]);
    }

    add_note(id: any){
        this.router.navigate([this.name.default_development.name + '/contract/add/note', id]);
    }

    add_notice(id: any){
        this.router.navigate([this.name.default_development.name + '/contract/add/notice', id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/contract/add']);
    }

    back(){
        this.router.navigate([this.name.default_development.name + '/contract']);
    }
}
