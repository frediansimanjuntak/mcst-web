import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Company, Companies, Contractor, Contractors } from '../../models/index';
import { CompanyService, ContractorService, AlertService, UserService } from '../../services/index';


import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-contractor',
  templateUrl: '../../templates/edit-contractor.html',
  styleUrls: []
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
    name: any;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    constructor(private router: Router,
    	private companyService: CompanyService,
    	private contractorService: ContractorService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        ) {
    }

    ngOnInit(): void {
        this.userService.getByToken()
          .subscribe(name => {
            this.name = name.user;
             this.getCompanies();
          })
      
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

            // this.contractorService.getById(this.id)
            //     .subscribe((data)=> {
            //         setTimeout(()=> {
            //             this.contractor = data;
                        
            //             this.company.text = this.companyList.find(myObj => myObj._id ===  this.contractor.company ).name;
            //             this.company.id = this.contractor.company;
            //             this.companyField = true;
            //             this.model.profile_picture = this.contractor.profile_picture;
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
        
    }

    public removed(value:any):void {
        
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

        // this.companyService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.companyList          = data;
        //             let numOptions =  this.companyList.length;
        //             let opts = new Array(numOptions);

        //             for (let i = 0; i < numOptions; i++) {
        //                 opts[i] = {
        //                     id: this.companyList[i]._id,
        //                     text: this.companyList[i].name
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

    }

    removeUser(i: number) {
        const control = <FormArray>this.myForm.controls['users'];
        control.removeAt(i);
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       for (let z = 0; z < files.length; ++z) {
		   	if (!files[z].type.includes("image")) {
			  	this.model.attachment = [];
			  	break;
		   	}else{
				this.model.attachment = files;
		   	}
	   	}
    }

    remove(i: any){
        this.model.profile_picture.splice(i, 1)
    }

    createContractor(model: Contractor, isValid: boolean) {
    	this.submitted = true;
    	if(isValid || this.companyField){
            let formData:FormData = new FormData();
        
            for (var i = 0; i < this.model.profile_picture.length; i++) {
                formData.append("profile_picture[]", this.model.profile_picture[i]);
            }

            formData.append("username", model.username);
            formData.append("password", model.password);
            formData.append("phone", model.phone);
            formData.append("email", model.email);
            formData.append("address.street_name", model.address.street_name);
            formData.append("address.block_no", model.address.block_no);
            formData.append("address.postal_code", model.address.postal_code);
            formData.append("address.country", model.address.country);
            formData.append("address.full_address", model.address.full_address);
            formData.append("description", model.description);
            formData.append("company", this.company.id);
            formData.append("position", model.position);
            formData.append("role", model.role);
            formData.append("active", this.model.active);

			this.contractorService.create(formData)
            .then(
                data => {
                    this.alertService.success('Create contractor successful', true);
                    this.router.navigate(['/contractor']);
                },
                error => {
                    if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                    alert(`The contractor could not be save, server Error.`);
                }
            );

	        this.router.navigate(['/contractor']);
	        
    	}
	}

    updateContractor(){
        if(this.companyField){
            this.contractor.profile_picture = this.model.profile_picture;
            this.contractor.company = this.company.id;
            
            // this.contractorService.update(this.contractor)
            // .subscribe(
            //     data => {
            //         this.alertService.success('Update contractor successful', true);
            //         this.router.navigate(['/contractor']);
            //     },
            //     error => {
            //         if (error.json().code) {
                    //     this.userService.checkError(error.json().code, error.json().message)
                    // }else{
                    //     this.userService.checkError(error.status, '')
                    // }
            //         alert(`The contractor could not be Update, server Error.`);
            //     }
            // );

            this.router.navigate(['/contractor']);
        }
    }
}
