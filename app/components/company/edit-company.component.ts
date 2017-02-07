import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Company, Companies, Contractor, Contractors } from '../../models/index';
import { CompanyService, UserService, ContractorService, AlertService } from '../../services/index';
import { Observable} from 'rxjs/Observable';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-company',
  templateUrl: 'app/templates/edit-company.html',
  styleUrls: [ 'app/templates/styles/ng2-select.css' ]
})

export class EditCompanyComponent implements OnInit {
    public items:Array<any> = [];

    private contractor:any = [];
    private chief :any = {};
    public chiefField: boolean;
    private _disabledV:string = '0';
    private disabled:boolean = false;

    @Input('group')
	company : Company;
    model: any = {};
    id: string;
    myForm: FormGroup;
    contractors: any;
    myOptions: Array<any>;
    options1: Array<any> = [];
    mySelectUsers: Array<string>;
    selection: Array<string>;

    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    constructor(private router: Router,
    	private companyService: CompanyService,
    	private contractorService: ContractorService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private route: ActivatedRoute,) {
    }

    ngOnInit(): void {
        this.getContractors();
        this.myForm = this.formbuilder.group({
        	name : ['', Validators.required],
        	category : ['', Validators.required],
        	phone : ['', Validators.required],
        	email : ['', Validators.required],
        	address: this.formbuilder.group({
                    street_name : ['',  <any>Validators.required],
                    block_no : ['', <any>Validators.required],
                    postal_code : ['', <any>Validators.required],
                    country : ['', <any>Validators.required],
                    coordinates : this.formbuilder.array([]),
                    type : ['', <any>Validators.required],
                    full_address : ['', <any>Validators.required]
             }),
            description : ['', Validators.required],
            company_logo: this.formbuilder.array([]),
            chief : [''],
            employee: this.formbuilder.array([]),
            active : ['', Validators.required],
        });
        this.model.active = true;
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.companyService
                    .getCompany(this.id)
                    .then(company => {
                        this.company = company;
                        
						this.chief.text = this.contractors.find(myObj => myObj._id ===  this.company.chief ).username;
                        this.chief.id = this.company.chief;
                        this.chiefField = true;

                        let numOptions =  this.company.employee.length;
                        let opts = new Array(numOptions);

                        for (let i = 0; i < numOptions; i++) {
                            opts[i] = {
                                id: this.company.employee[i], 
                                text: this.contractors.find(myObj => myObj._id ===  this.company.employee[i] ).username,
                            };
                        }

                        this.contractor = opts.slice(0);
                       
                    });

            // this.companyService.getById(this.id)
            //     .subscribe((data)=> {
            //         setTimeout(()=> {
            //             this.company = data;
                    
            //             this.chief.text = this.contractors.find(myObj => myObj._id ===  this.company.chief ).username;
            //             this.chief.id = this.company.chief;
            //             this.chiefField = true;

            //             let numOptions =  this.company.employee.length;
            //             let opts = new Array(numOptions);

            //             for (let i = 0; i < numOptions; i++) {
            //                 opts[i] = {
            //                     id: this.company.employee[i], 
            //                     text: this.contractors.find(myObj => myObj._id ===  this.company.employee[i] ).username,
            //                 };
            //              }

            //             this.contractor = opts.slice(0);
            //         }, 1000);
            //     });
        };

    }


    private get disabledV():string {
        return this._disabledV;
    }

    private set disabledV(value:string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selected(value:any):void {
        // console.log('Selected value is: ', value);
    }

    public removed(value:any):void {
        // console.log('Removed value is: ', value);
    }

    public refreshValueEmployee(value:any):void {
        this.contractor = value;
    }

    public refreshValueChief(value:any):void {
        this.chief = value;
        if (this.chief.length == 0){
            this.chiefField = false;
        }else{
            this.chiefField = true;
        }
    }

    public itemsToString(value:Array<any> = []):string {
        return value
          .map((item:any) => {
            return item.text;
           }).join(',');
    }

    initUser() {
        return this.formbuilder.group({
        });
    }

    getContractors(): void {
        this.contractorService.getContractors().then(contractors => {
            this.contractors = contractors;
            let numOptions =  this.contractors.length;
            let opts = new Array(numOptions);

            for (let i = 0; i < numOptions; i++) {
                opts[i] = {
                    id: this.contractors[i]._id, 
                    text: this.contractors[i].username
                };
            }

            this.myOptions = opts.slice(0);
            this.items = this.myOptions;
        });

        // this.contractorService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.contractors          = data;
        //             let numOptions =  this.contractors.length;
        //             let opts = new Array(numOptions);

        //             for (let i = 0; i < numOptions; i++) {
        //                 opts[i] = {
        //                     id: this.contractors[i]._id, 
        //                     text: this.contractors[i].username
        //                 };
        //             }

        //             this.myOptions = opts.slice(0);
        //             this.items = this.myOptions;
        //         }, 1000);
        //     });
    }


    addUser() {
        const control = <FormArray>this.myForm.controls['users'];
        const userCtrl = this.initUser();

        control.push(userCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeUser(i: number) {
        const control = <FormArray>this.myForm.controls['users'];
        control.removeAt(i);
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.company_logo = files;
    }

    onEditChange(event: any) {
       let files = [].slice.call(event.target.files); 
       this.company.company_logo = files;
    }

    remove(i: any){ 
        this.model.company_logo.splice(i, 1)
    }

    removeEdit(i: any){
        this.company.company_logo.splice(i, 1)
    }

    createCompany(model: Company, isValid: boolean) {
    	this.submitted = true;
    	if(isValid || this.chiefField){
    		for (let i = 0; i < this.contractor.length; i++) {
            model.employee[i] = this.contractor[i].id ;
	        }
			model.chief = this.chief.id;
			model.company_logo = this.model.company_logo;
			model.address.coordinates[0] = this.model.latitude;
			model.address.coordinates[1] = this.model.longitude;
			model.active = this.model.active;
			Companies.push(model);

            // this.companyService.create(model)
            // .subscribe(
            //     data => {
            //         this.alertService.success('Create company successful', true);
            //         this.router.navigate(['/company']);
            //     },
            //     error => {
            //         console.log(error);
            //         alert(`The COmpany could not be save, server Error.`);
            //     }
            // );

	        this.router.navigate(['/company']);
	    }
	}

    updateCompany(){
        if(this.chiefField){
            this.company.employee = [];
            for (let i = 0; i < this.contractor.length; i++) {
                this.company.employee[i] =this.contractor[i].id ;
            }
            this.company.chief = this.chief.id;

            this.companyService.update(this.company)
            .then(
                data => {
                    this.alertService.success('Update company successful', true);
                    this.router.navigate(['/company']);
                },
                error => {
                    console.log(error);
                    alert(`The company could not be update, server Error.`);
                }
            );

            this.router.navigate(['/company']);
        }
    }
}
