import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LostFoundService, AlertService, UserService, UnitService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Observable} from 'rxjs/Observable';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-lost-found',
  templateUrl: 'app/templates/edit-lost-found.html'
})

export class EditLostFoundComponent  {
  
    @Input('group')
	lostFound: LostFound;
    filesToUpload: Array<File>;
    model: any = {};
    myForm: FormGroup;
    attachment: any = [];
    id: string;
    autoPostOnDateOptions: any = {};
    validTillDateOptions: any = {};
    name: any;
    dataUnit: any[]=[];
    photos: any;

    constructor(private router: Router,
    	private lostFoundService: LostFoundService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private unitService: UnitService,
        private http: Http, 
         ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.loadAllUnits();
                            })
        
    }

    onChange(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
        this.model.photo = this.filesToUpload;
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        this.model.photo = fileList;
    }

    createReport(event: any) {
        // this.model.serial_number = 142141;
        this.model.archieve = false;
        let formData:FormData = new FormData();
        
        for (var i = 0; i < this.model.photo.length; i++) {
            formData.append("photo[]", this.model.photo[i]);
        }

        formData.append("archieve", this.model.archieve);
        formData.append("property", this.model.property);
        formData.append("type", this.model.type);
        formData.append("description", this.model.description);
        formData.append("preferred_method_of_contact", this.model.preferred_method_of_contact);
        
        this.lostFoundService.create(formData)
        .then(
            data => {
                this.alertService.success('Create Report successful', true);
                this.router.navigate([this.name.default_development.name + '/lost_found']);
            },
            error => {
                console.log(error);
                alert(`The Report could not be save, server Error.`);
            }
        );
    }

    toLostFound(){
         this.router.navigate([this.name.default_development.name + '/lost_found']);
    }

    private loadAllUnits(): void {
      
        this.unitService.getAll(this.name.default_development.name)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.dataUnit      = data.properties;
                }, 1000);
            });
    }

    remove(i: any){
        this.model.photo.splice(i, 1)
    }

    goToLostFound(){
      this.router.navigate([this.name.default_development.name + '/lost_found']);  
    }

}
