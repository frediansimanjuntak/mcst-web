import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, ContractNoteService, ContractNoticeService } from '../../services/index';
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
    contractnotes: any[];
    contractnotices: any[];
    model: any = {};
    images: any[];
    id: string;
    _id: any;
    public open;
    public close;
    name: any;

    constructor(private router: Router, 
        private contractService: ContractService, 
        private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private contractnoteService:ContractNoteService,
        private contractnoticeService:ContractNoticeService) {}

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
            this.contractnoteService.getAll(this.id)
            .subscribe(contractnotes => {
                if(contractnotes[0].contract_note.length > 0) { 
                    this.contractnotes = contractnotes[0].contract_note;
                }
            })
            this.contractnoticeService.getAll(this.id)
            .subscribe(contractnotices => {
                if(contractnotices[0].contract_notice.length > 0) {
                    this.contractnotices = contractnotices[0].contract_notice;
                }
            })
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

    deleteContractNote(contractnote: any , id:any) {
        this.contractnoteService.delete(id,contractnote._id)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Contract could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete contract successful', true);
                alert(`Delete Contarct successful`);
                this.contractService.getById(id)
                .subscribe(contract => {
                    this.contract = contract;
                    this.images = [];
                    for (var i = 0; i < this.contract.attachment.length; ++i) {
                        this.images.push({source:this.contract.attachment[i].url});
                    };
                });
                this.contractnoteService.getAll(id)
                .subscribe(contractnotes => {
                    if(contractnotes[0].contract_note.length > 0) { 
                        this.contractnotes = contractnotes[0].contract_note;
                    }
                })
                this.contractnoticeService.getAll(id)
                .subscribe(contractnotices => {
                    if(contractnotices[0].contract_notice.length > 0) {
                        this.contractnotices = contractnotices[0].contract_notice;
                    }
                })
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eda06c2d36ad38a7eeb0c9d5e29171da1942a423
            console.log(contracts)
            for (let i = 0; i < this.contracts.length; ++i) {
                if(this.contracts[i].contract_notice.length > 1) {
                    for (let a = 0; a < this.contracts[i].contract_notice.length; ++a) {
                        // let y = this.contracts[i].contract_notice[a].end_time.toString().slice(0,4);
                        // let m = this.contracts[i].contract_notice[a].end_time.toString().slice(5,7);
                        // let d = this.contracts[i].contract_notice[a].end_time.toString().slice(8,10);
                        // let date = Date.parse(y + '/' + m + '/' + d) ;
                        // this.contracts[i].end_time = new Date(Math.max.apply(Math,date));
                    }
                }else{
                    for (let a = 0; a < this.contracts[i].contract_notice.length; ++a) {
                        this.contracts[i].start_time = this.contracts[i].contract_notice[a].start_time;
                        this.contracts[i].end_time = this.contracts[i].contract_notice[a].end_time;
                    }
                }
            }
<<<<<<< HEAD
=======
>>>>>>> ad077b63ccbda43ce0df54c8289848b8a943ed2e
=======
>>>>>>> eda06c2d36ad38a7eeb0c9d5e29171da1942a423
            this.open      = this.contracts.filter(contracts => contracts.status === 'open' );
            this.close     = this.contracts.filter(contracts => contracts.status === 'closed' );
		});
    }

    view(contract: Contract){
        this.router.navigate([this.name.default_development.name_url + '/contract/view', contract._id]);
    }

    viewNotice(id: any, contractnotice:any){
        this.router.navigate([this.name.default_development.name_url + '/contract/notice/' + id + '/view' , contractnotice._id]);
    }

    viewNote(id: any, contractnote:any){
        this.router.navigate([this.name.default_development.name_url + '/contract/note/' + id + '/view' , contractnote._id]);
    }

    viewIncident(id: any){
        this.router.navigate([this.name.default_development.name_url + '/incident/view', id]);
    }

    edit(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/edit', id]);
    }

    add_note(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/add/note', id]);
    }

    add_notice(id: any){
        this.router.navigate([this.name.default_development.name_url + '/contract/add/notice', id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/contract/add']);
    }

    back(){
        this.router.navigate([this.name.default_development.name_url + '/contract']);
    }
}
