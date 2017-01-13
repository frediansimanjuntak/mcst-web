import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Petition, Petitions } from '../../models/index';
import { UnitService, PetitionService, AlertService } from '../../services/index';
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
	petition: Petition;
    petitions: Petition[] = [];
    public units;
    model: any = {};
    id: string;
    myForm: FormGroup;
    public developmentId;
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});
    types = [
        { value: 'Maintenance', name: 'Maintenance' },
        { value: 'Moving In', name: 'Moving In' },
        { value: 'Renovation', name: 'Renovation' },
        { value: 'Add Tenant/ family', name: 'Add Tenant/ family' },

    ];
    selectedType = '';
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes


    constructor(private router: Router,
    	private petitionService: PetitionService,
        private unitService: UnitService,
    	private alertService: AlertService,
        private route: ActivatedRoute,
        private formbuilder: FormBuilder,) {
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit(): void {
        this.developmentId = '1';
    	this.selectedType = 'Maintenance';
        this.loadAllPetitions();
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

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.petitionService.getPetition(this.id).then(petition => {this.petition = petition;});
        }
    }

    createPetition() {
    	this.model.petition_type = this.selectedType;
        Petitions.push(this.model);
        console.log(this.model)
        this.router.navigate(['/petition']);

        // this.petitionService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create Petition successful', true);
        //         this.router.navigate(['/incident']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The petition could not be save, server Error.`);
        //     }
        // );
    }

    //   createContractor(model: Petition, isValid: boolean) {
    //     this.submitted = true;
    //     if(isValid || this.companyField){
    //         model.company = this.company.id;
    //         model.profile_picture = this.model.profile_picture;
    //         model.active = this.model.active;
    //         Contractors.push(model);
    //         console.log(model);

    //         this.router.navigate(['/contractor']);
    //         //   this.userGroupService.create(model)
    //         // .then(
    //         //     data => {
    //         //         this.alertService.success('Create usergroup successful', true);
    //         //         this.router.navigate(['/user']);
    //         //     },
    //         //     error => {
    //         //         this.alertService.error(error);
    //         //     }
    //         // );
    //     }
    // }

    private loadAllPetitions() {
        //---------------------------Call To Api-------------- //
        // this.announcementService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          = data.find(data => data._id === this.developmentId );
        //             this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' );
        //             this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' );
        //             console.log(this.dataAgm);
        //         }, 1000);
        //     });

        this.petitionService.getPetitions().then(data => {
            this.petitions         = data;
        });
    }


    private loadAllUnits(): void {
      this.unitService.getDevelopments().then(development => {

      this.units = development[0].properties;
      });
    }

    updatePetition(){
    	console.log(this.petition);
		// this.petitionService.update(this.petition)
		// .then(
		// 	response => {
  //               this.alertService.success('Update incident successful', true);
  //               this.router.navigate(['/incident']);
  //           },
  //           error => {
  //           	this.alertService.error(error);
  //           }
  //       );
	}

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }


}
