import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition, Petitions } from '../../models/index';
import { UnitService, PetitionService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

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
    filesToUpload: Array<File>;

    constructor(private router: Router,
    	private petitionService: PetitionService,
        private unitService: UnitService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private formbuilder: FormBuilder,
        private userService: UserService) {
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
                                this.getLastRefNo();
                                if( this.id != null) {
                                    this.petitionService.getPetition(this.id).then(petition => {this.petition = petition;});
                                }
                            })
        this.selectedType = 'Maintenance';
        
        this.myForm = this.formbuilder.group({
            reference_no : [''],
            development : [''],
            property: [''],
            petition_type: [''],
            attachment: this.formbuilder.array([]),
            contract: [''],
            remark: [''],
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
                    console.log(this.model.reference_no)
                }if(this.no > 10 && this.no < 100) {
                    this.model.reference_no = '00' + this.no.toString();
                    console.log(this.model.reference_no)
                }if(this.no > 100 && this.no < 1000) { 
                    this.model.reference_no = '0' + this.no.toString();
                    console.log(this.model.reference_no)
                }if(this.no > 1000) {
                    this.model.reference_no = this.no.toString();
                    console.log(this.model.reference_no)
                }
            } else {
                this.model.reference_no = '0001'
            }
            
        });
    }

    createPetition(model: any, isValid: boolean) {
        this.submitted = true;
        if(isValid || this.unit){
            model.updated_at = new Date();

            let formData:FormData = new FormData();
        
            for (var i = 0; i < this.model.attachment.length; i++) {
                formData.append("attachment[]", this.model.attachment[i]);
            }

             
            formData.append("reference_no", this.model.reference_no);
            formData.append("property", this.unit.id);
            formData.append("petition_type", model.petition_type);
            formData.append("remark", model.remark);
            formData.append("status", 'pending');
            formData.append("updated_at", model.updated_at);

            this.petitionService.create(formData)
            .then(
                data => {
                    this.alertService.success('Create petition successful', true);
                    this.router.navigate([this.name.default_development.name + '/petition']);
                },
                error => {
                    this.alertService.error(error);
                }
            );
        }
    }

    private loadAllUnits(): void {
        this.unitService.getAll(this.name.default_development.name)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.units = data.properties;

                    console.log(this.units);
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
                }, 1000);
            });
    }

    public refreshValueUnit(value:any):void {
        this.unit = value;
        console.log(value);
    }


    public selected(value:any):void {
        // console.log('Selected value is: ', value);
    }

    public removed(value:any):void {
        // console.log('Removed value is: ', value);
    }

    updatePetition(){
    	console.log(this.petition);
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

    onChange(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.attachment = this.filesToUpload;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    goToPetition(){
      this.router.navigate([this.name.default_development.name + '/petition']);  
    }

}
