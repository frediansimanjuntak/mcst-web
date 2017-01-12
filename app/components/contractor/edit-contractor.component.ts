import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Company, Companies, Contractor, Contractors } from '../../models/index';
import { CompanyService, ContractorService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-contractor',
  templateUrl: 'app/templates/edit-contractor.html',
  styleUrls: [ 'app/templates/styles/ng2-select.css' ]
})

export class EditContractorComponent implements OnInit {
    public items:Array<any> = [];

    private companyList:any = [];
    private company :any = {};
    public companyField: boolean;
    private _disabledV:string = '0';
    private disabled:boolean = false;

    @Input('group')
	contractor : Contractor;
    model: any = {};
    id: string;
    myForm: FormGroup;
    companies: any;
    myOptions: Array<any>;
    options1: Array<any> = [];
    mySelectCompanies: Array<string>;
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
        this.getCompanies();
        this.myForm = this.formbuilder.group({
        	username : ['', Validators.required],
        	password : ['', Validators.required],
        	phone : ['', Validators.required],
        	email : ['', Validators.required],
        	address: this.formbuilder.group({
                    street_name : ['',  <any>Validators.required],
                    block_no : ['', <any>Validators.required],
                    postal_code : ['', <any>Validators.required],
                    country : ['', <any>Validators.required],
                    full_address : ['', <any>Validators.required]
             }),
        	profile_picture: [''],
            description : ['', Validators.required],
            company : [''],
            position : [''],
            role : [''],
            active : ['', Validators.required],
        });
        this.model.active = false;
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.contractorService
                    .getContractor(this.id)
                    .then(contractor => {
                        this.contractor = contractor;

						this.company.text = this.companyList.find(myObj => myObj._id ===  this.contractor.company ).name;
                        this.company.id = this.contractor.company;
                        this.companyField = true;
                        this.model.profile_picture = this.contractor.profile_picture;

                    });
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

    public refreshValueCompany(value:any):void {
        this.company = value;
        if (this.company.length == 0){
            this.companyField = false;
        }else{
            this.companyField = true;
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

    getCompanies(): void {
        this.companyService.getCompanies().then(companies => {
            this.companyList = companies;
            let numOptions =  this.companyList.length;
            let opts = new Array(numOptions);

            for (let i = 0; i < numOptions; i++) {
                opts[i] = {
                    id: this.companyList[i]._id,
                    text: this.companyList[i].name
                };
            }

            this.myOptions = opts.slice(0);
            this.items = this.myOptions;
        });
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
       this.model.profile_picture = event.target.files[0];
    }

    remove(i: any){
        this.model.profile_picture = "";
    }

    createContractor(model: Contractor, isValid: boolean) {
    	this.submitted = true;
    	if(isValid || this.companyField){
			model.company = this.company.id;
			model.profile_picture = this.model.profile_picture;
			model.active = this.model.active;
			Contractors.push(model);
    		console.log(model);

	        this.router.navigate(['/contractor']);
	        //   this.userGroupService.create(model)
	        // .then(
	        //     data => {
	        //         this.alertService.success('Create usergroup successful', true);
	        //         this.router.navigate(['/user']);
	        //     },
	        //     error => {
	        //         this.alertService.error(error);
	        //     }
	        // );
    	}
	}

    updateContractor(){
        if(this.companyField){
            this.contractor.profile_picture = this.model.profile_picture;
            this.contractor.company = this.company.id;
            console.log(this.company);
            this.router.navigate(['/contractor']);
        }
    //     this.companyService.update(this.usergroup)
    //     .then(
    //         response => {
    //             this.alertService.success('Update Usergroup successful', true);
    //             this.router.navigate(['/user']);
    //         },
    //         error=> {
    //             this.alertService.error(error);
    //         }
    //     );
    }
}
