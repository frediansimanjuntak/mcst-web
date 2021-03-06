import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition, Petitions } from '../../models/index';
import { UnitService, PetitionService, AlertService, UserService, CompanyService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';


import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-petition',
 templateUrl: '../../templates/edit-petition.html'
})

export class EditPetitionComponent implements OnInit {
    public items:Array<any> = [];
	petition: Petition;
    petitions: Petition[] = [];
    units: any = [];
    unit: any = {};
    model: any = {};
    id: string;
    myForm: FormGroup;
    myOptions: Array<any>;
    no: number;
    today: Date;
    public developmentId;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    loading: boolean = true;
    selectedType = '';
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    name: any;
    companies: any[] = [];
    dateOptions: any = {};
    company: any = {
        address: {
            full_address : ''
        }
    };
    emailError: boolean
    emailErrorMessage: string;


    constructor(private router: Router,
    	private petitionService: PetitionService,
        private unitService: UnitService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private formbuilder: FormBuilder,
        private userService: UserService,
        private companyService:CompanyService,
        private _notificationsService: NotificationsService,) {
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.loadAllUnits();
            if( this.id != null) {
                this.petitionService.getPetition(this.id).then(petition => {this.petition = petition;});
                this.loading = false;
            }
        })
        this.selectedType = 'Maintenance';
        this.model.attachment = [];
        this.model.tenant = {
            name: '',
            salulation: undefined,
            phone: ''
        };
        this.today = new Date();
        this.model.start_time = this.today
        this.model.end_time = null;
        this.model.company = '';
        this.myForm = this.formbuilder.group({
            reference_no : [''],
            development : [''],
            property: ['', Validators.compose([Validators.required])],
            petition_type: ['', Validators.compose([Validators.required])],
            attachment: this.formbuilder.array([]),
            contract: [''],
            remark: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            status: [''],
            created_by : [''],
            updated_at : [''],
            archieved : [''],
            created_at : ['']
        });

        this.dateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            editableDateField: false,
            height: '34px',
            width: '260px',
            inline: false,
            showClearDateBtn: false,
            // disableUntil: {year: 2017, month: 1, day: 10},
            customPlaceholderTxt: 'Today (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };
    }

    number(event: any) {
        const pattern = /[0-9\+\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    checkValid(event: any){
        if (event.target.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            this.emailError = false;
        } else {
            this.emailError = true;
            this.emailErrorMessage = 'invalid email address';
        }
    }    

    createPetition(model: any, isValid: boolean) {
        this.submitted = true;
        if(isValid && this.model.attachment.length > 0){
            this.loading = true
            model.updated_at = new Date();

            let formData:FormData = new FormData();
            if(this.model.attachment){
                for (var i = 0; i < this.model.attachment.length; i++) {
                    formData.append("attachment[]", this.model.attachment[i]);
                }
            }
                
            // formData.append("reference_no", this.model.reference_no);
            formData.append("property", model.property);
            formData.append("petition_type", model.petition_type);
            formData.append("remark", model.remark);
            formData.append("status", 'pending');
            formData.append("updated_at", model.updated_at);
            if(model.petition_type == 'new tenant'){
                if(this.model.tenant.name && this.model.tenant.salulation && this.model.tenant.phone){
                    formData.append("tenant.name", this.model.tenant.name);
                    formData.append("tenant.salulation", this.model.tenant.salulation);
                    formData.append("tenant.phone", this.model.tenant.phone);
                    this.savePetition(formData);
                }else{
                    this.loading = false;
                }
            }else{
                if(this.model.start_time && this.model.end_time){
                    formData.append("start_time", this.model.start_time);
                    formData.append("end_time", this.model.end_time);
                    if(this.model.company != 'others' && this.model.company != ''){
                        formData.append("company", this.model.company);
                        this.savePetition(formData);
                    }else{
                        if(this.company.name && this.company.business_registration 
                            && this.company.address.full_address && this.company.phone && this.company.email){
                            formData.append("new_company.name", this.company.name);
                            formData.append("new_company.business_registration", this.company.business_registration);
                            formData.append("new_company.address.full_address", this.company.address.full_address);
                            formData.append("new_company.phone", this.company.phone);
                            formData.append("new_company.email", this.company.email);
                            this.savePetition(formData);
                        }else{
                            this.loading = false;
                        }
                    }   
                }else{
                    this.loading = false;
                }                
            }
        }
    }

    savePetition(formdata:any){
        this.petitionService.create(formdata)
            .then(
                data => {
                    this._notificationsService.success('Success', 'Add request Successful')
                    this.router.navigate([this.name.default_development.name_url + '/petition']);
                },
                error => {
                    if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                    this.loading = false;
                }
         ); 
    }

    private loadAllUnits(): void {
        this.unitService.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.units = data.properties;

                    let numOptions =  this.units.length;
                    let opts = new Array(numOptions);

                    for (let i = 0; i < numOptions; i++) {
                        opts[i] = {
                            id: this.units[i]._id,
                            text: '#' + this.units[i].address.unit_no + '-' + this.units[i].address.unit_no_2
                        };
                    }
                    this.myOptions = opts.slice(0);
                    this.items = this.myOptions;
                    this.getCompanies();
                }, 1000);
            });
    }

    // public refreshValueUnit(value:any):void {
    //     this.unit = value;
    // }

    getCompanies(){
        this.companyService.getAll()
            .subscribe((data) => {
                this.companies = data;
                this.loading = false;
            })
    }

    public selected(value:any):void {
    }

    public removed(value:any):void {
    }

    updatePetition(){
        this.loading = true
		this.petitionService.update(this.petition)
		.then(
			response => {
                this._notificationsService.success("Success", 'Update petition successful');
                this.router.navigate(['/incident']);
            },
            error => {
            	if (error.json().message) {
                    if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this._notificationsService.error("Error", error.json().message)    
                    }
                    
                }else{
                    this.userService.checkError(error.status, '')
                } 
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

    goToPetition(){
      this.router.navigate([this.name.default_development.name_url + '/petition']);  
    }

    getDate(event: any, type: string){
        if(type == 'start'){
            this.model.start_time = event.jsdate;
        }else{
            this.model.end_time = event.jsdate;
        }
    }

    companyChange(event: any){
        if(this.model.company != 'others'){
            this.company = this.companies.find((data) => data._id == this.model.company);
        }else{
            this.company = {
                address: {
                    full_address : ''
                }
            };
        }        
    }
}
