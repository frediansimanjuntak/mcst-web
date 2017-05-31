import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Contract } from '../../models/index';
import { ContractService, AlertService, UserService, IncidentService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment'
import { Pipe, PipeTransform } from '@angular/core'

@Component({
  // moduleId: module.id,
  selector: 'edit-contract',
  templateUrl: '../../templates/edit-contract.html',
})

export class EditContractComponent  implements OnInit {
    public reference_type: any; 
    public reference_id: any; 
	contract: any;
    incident: any[] = [];
    model: any = {};
    id: string;
    refno: string;
    name: any;
    today: Date;
    loading: boolean = true;

    constructor(private router: Router,
    	private contractService: ContractService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private userService: UserService,
        private incidentService: IncidentService,
        private _notificationsService: NotificationsService,) {}

    ngOnInit(): void {
        this.today = new Date();
        this.model.start_time = this.today
        this.model.file = "null"
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.refno = params['refno'];
            this.reference_id = params['refid'];
            this.reference_type = params['type']
        });
        this.model.reference_no = this.refno;
        if( this.id != null) {
            this.contractService.getById(this.id)
            .subscribe(contract => {
                this.contract = contract;
                if (this.contract.start_time) {
                    this.contract.start_time = moment(this.contract.start_time).format('DD/MM/YYYY');
                } else {
                    this.contract.start_time = null
                }
                if (this.contract.end_time) {
                    this.contract.end_time = moment(this.contract.end_time).format('DD/MM/YYYY')
                }else{
                    this.contract.end_time = null
                }
                
                setTimeout(() => this.loading = false, 1000);
            });
        }
        this.model.attachment = [];
        this.userService.getByToken().subscribe(
            name => {
                this.name = name.user;
                setTimeout(() => this.loading = false, 1000);
            })
        
    }

    createContract() {
        if(this.model.attachment.length > 0) {
            this.loading = true
            let formData:FormData = new FormData();
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment", this.model.attachment[i]);
            }
            formData.append("reference_no", this.model.reference_no);
            formData.append("reference_type", this.reference_type);
            formData.append("start_time", this.model.start_time);
            formData.append("end_time", this.model.end_time);
            formData.append("reference_id", this.reference_id);
            formData.append("contract_type", this.model.contract_type);
            formData.append("title", this.model.title);
            formData.append("remark", this.model.remark);
            console.log(this.model)
            // this.contractService.create(formData)
            // .then(
            //     data => {
            //         this._notificationsService.success('Success', 'Create contract successful')
            //         this.router.navigate([this.name.default_development.name_url + '/contract' ]);
            //     },
            //     error => {
            //         if (error.json().code) {
            //             this.userService.checkError(error.json().code, error.json().message)
            //         }else{
            //             this.userService.checkError(error.status, '')
            //         }
                    
            //         setTimeout(() => this.loading = false, 1000);
            //     }
            // );
        }
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

    updateOnChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.contract.attachment = files;
       this.model.file = "not null"
    }

    updateRemove(i: any){
        this.contract.attachment.splice(i, 1)
    }

    updateContract(){
        this.loading = true
        if(this.contract.attachment.length > 0) {
            let formData:FormData = new FormData();
            for (var i = 0; i < this.contract.attachment.length; i++) {
                formData.append("attachment", this.contract.attachment[i]);
            }
            formData.append("start_time", this.contract.start_time);
            formData.append("end_time", this.contract.end_time);
            formData.append("contract_type", this.contract.contract_type);
            formData.append("title", this.contract.title);
            formData.append("remark", this.contract.remark);
            formData.append("file", this.model.file);
            this.contractService.update(formData, this.contract._id)
            .then(
                response => {
                    this._notificationsService.success('Success', 'Update contract successful')
                    this.router.navigate([this.name.default_development.name_url + '/contract/view', this.contract._id ]);
                },
                error => {
                    if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                    
                    this.loading = false
                }
            );
        }
        this.loading = false
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