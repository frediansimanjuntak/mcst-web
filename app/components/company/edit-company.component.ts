import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Company, Companies, User, Users } from '../../models/index';
import { CompanyService, UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id.replace("/dist/", "/"),
  selector: 'edit-company',
  templateUrl: '/app/templates/edit-company.html',
  styleUrls: [ '../../templates/styles/ng2-select.css' ]
})

export class EditCompanyComponent implements OnInit { 
    public items:Array<any> = [];

    private user:any = [];
    private chief :any = {};
    public chiefField: boolean; 
    private _disabledV:string = '0';
    private disabled:boolean = false;

    @Input('group')
	company : Company;
    model: any = {};
    id: string;
    myForm: FormGroup;
    users: any;
    myOptions: Array<any>;
    options1: Array<any> = [];
    mySelectUsers: Array<string>;
    selection: Array<string>;

    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    
    constructor(private router: Router,
    	private companyService: CompanyService,
    	private userService: UserService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private route: ActivatedRoute,) {
    }

    ngOnInit(): void {
        this.getUsers();
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
                        
						this.chief.text = this.users.find(myObj => myObj._id ===  this.company.chief ).username;
                        this.chief.id = this.company.chief;
                        this.chiefField = true;
                        
                        // for (let i = 0; i < this.usergroup.users.length; i++) {
                        //     this.user[i].text = this.users.find(myObj => myObj._id ===  this.usergroup.users[i] ).username;
                        //     this.user[i].id = this.usergroup.users[i];
                        // }

                        let numOptions =  this.company.employee.length;
                        let opts = new Array(numOptions);

                        for (let i = 0; i < numOptions; i++) {
                            opts[i] = {
                                id: this.company.employee[i], 
                                text: this.users.find(myObj => myObj._id ===  this.company.employee[i] ).username,
                            };
                        }

                        this.user = opts.slice(0);
                       
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

    public refreshValueUser(value:any):void {
        this.user = value;
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

    getUsers(): void {
        this.userService.getUsers().then(users => {
            this.users = users;
            let numOptions =  this.users.length;
            let opts = new Array(numOptions);

            for (let i = 0; i < numOptions; i++) {
                opts[i] = {
                    id: this.users[i]._id, 
                    text: this.users[i].username
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
       let files = [].slice.call(event.target.files); 
       this.model.company_logo = files;
    }

    remove(i: any){ 
        this.model.company_logo.splice(i, 1)
    }

    createCompany(model: Company, isValid: boolean) {
    	this.submitted = true;
        console.log(name);
    	if(isValid || this.chiefField){
    		for (let i = 0; i < this.user.length; i++) {
            model.employee[i] = this.user[i].id ;
	        }
			model.chief = this.chief.id;
			model.company_logo = this.model.company_logo;
			model.address.coordinates[0] = this.model.latitude;
			model.address.coordinates[1] = this.model.longitude;
			model.active = this.model.active;
			Companies.push(model);
    		console.log(model);

	        this.router.navigate(['/company']);
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

    updateCompany(){
        if(this.chiefField){
            this.company.employee = [];
            for (let i = 0; i < this.user.length; i++) {
                this.company.employee[i] =this.user[i].id ;
            }
            this.company.chief = this.chief.id;
            console.log(this.company);
            this.router.navigate(['/company']);
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
