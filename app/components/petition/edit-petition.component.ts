import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition, Petitions } from '../../models/index';
import { UnitService, PetitionService, AlertService, UserService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-petition',
 templateUrl: 'app/templates/edit-petition.html'
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
    public developmentId;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    types = [
        { value: 'Maintenance', name: 'Maintenance' },
        { value: 'Moving In', name: 'Moving In' },
        { value: 'Renovation', name: 'Renovation' },
        { value: 'Add Tenant/Family', name: 'Add Tenant/Family' },

    ];
    selectedType = '';
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    name: any;

    constructor(private router: Router,
    	private petitionService: PetitionService,
        private unitService: UnitService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private formbuilder: FormBuilder,
        private userService: UserService,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService,) {
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadAllUnits();
                                if( this.id != null) {
                                    this.petitionService.getPetition(this.id).then(petition => {this.petition = petition;});
                                    this.appComponent.loading = false;
                                }
                            })
        this.selectedType = 'Maintenance';
        this.model.attachment = [];
        this.myForm = this.formbuilder.group({
            reference_no : [''],
            development : [''],
            property: ['', Validators.required],
            petition_type: ['', Validators.required],
            attachment: this.formbuilder.array([]),
            contract: [''],
            remark: ['', Validators.required],
            status: [''],
            created_by : [''],
            updated_at : [''],
            archieved : [''],
            created_at : ['']
        });
    }

    getLastRefNo(){
        this.petitionService.getAll().subscribe(petitions => {
            this.petitions = petitions ;
            if(petitions.length > 0) { 
                var a = this.petitions.length - 1;
                this.no = +this.petitions[a].reference_no + 1
                if(this.no > 1 && this.no < 10) {
                    this.model.reference_no = '000' + this.no.toString();
                }if(this.no > 10 && this.no < 100) {
                    this.model.reference_no = '00' + this.no.toString();
                }if(this.no > 100 && this.no < 1000) { 
                    this.model.reference_no = '0' + this.no.toString();
                }if(this.no > 1000) {
                    this.model.reference_no = this.no.toString();
                }
            } else {
                this.model.reference_no = '0001'
            }
        
        this.appComponent.loading = false;
        });
    }

    createPetition(model: any, isValid: boolean) {
        this.submitted = true;
        if(isValid && this.model.attachment.length > 0){
            this.appComponent.loading = true
            model.updated_at = new Date();

            let formData:FormData = new FormData();
            if(this.model.attachment){
                for (var i = 0; i < this.model.attachment.length; i++) {
                    formData.append("attachment[]", this.model.attachment[i]);
                }
            }
                
            formData.append("reference_no", this.model.reference_no);
            formData.append("property", model.property);
            formData.append("petition_type", model.petition_type);
            formData.append("remark", model.remark);
            formData.append("status", 'pending');
            formData.append("updated_at", model.updated_at);

            this.petitionService.create(formData)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Add request Successful',
                        )
                    this.router.navigate([this.name.default_development.name_url + '/petition']);
                },
                error => {
                    this._notificationsService.error(
                            'Error',
                            'Add request failed, server Error',
                    )
                    this.appComponent.loading = false;
                }
            );
        }
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
                    this.getLastRefNo();
                }, 1000);
            });
    }

    // public refreshValueUnit(value:any):void {
    //     this.unit = value;
    // }


    public selected(value:any):void {
    }

    public removed(value:any):void {
    }

    updatePetition(){
        this.appComponent.loading = true
		this.petitionService.update(this.petition)
		.then(
			response => {
                this.alertService.success('Update incident successful', true);
                this.router.navigate(['/incident']);
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

    goToPetition(){
      this.router.navigate([this.name.default_development.name_url + '/petition']);  
    }

}
