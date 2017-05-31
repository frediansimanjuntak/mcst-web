import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LostFoundService, AlertService, UserService, UnitService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';
import { FileUploader } from 'ng2-file-upload';
import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-lost-found',
  templateUrl: '../../templates/edit-lost-found.html'
})

export class EditLostFoundComponent  {
  
    @Input('group')
	lostFound: LostFound;
    lostFounds: LostFound[] = [];
    model: any = {};
    myForm: FormGroup;
    attachment: any = [];
    id: string;
    autoPostOnDateOptions: any = {};
    validTillDateOptions: any = {};
    name: any;
    dataUnit: any[]=[];
    photos: any;
    no: number;
    loading: boolean = true;

    constructor(private router: Router,
    	private lostFoundService: LostFoundService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private unitService: UnitService,
        private http: Http, 
        
        private _notificationsService: NotificationsService,
         ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken()
        .subscribe(name => {
            this.name = name.user;
            this.loadAllUnits();
        })
        this.model.photo = [];                            
        
    }

    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.photo = files;
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        this.model.photo = fileList;
    }

    createReport(event: any) {
        this.loading = true
        this.model.archieve = false;
        if(this.model.photo.length > 0 && this.model.property && this.model.type){
            let formData:FormData = new FormData();
            for (var i = 0; i < this.model.photo.length; i++) {
                formData.append("photo[]", this.model.photo[i]);
            }
            // formData.append("serial_number", this.model.serial_number);
            formData.append("archieve", this.model.archieve);
            formData.append("property", this.model.property);
            formData.append("type", this.model.type);
            formData.append("description", this.model.description);
            formData.append("preferred_method_of_contact", this.model.preferred_method_of_contact);
            
            this.lostFoundService.create(formData)
            .then(data => {
                    this._notificationsService.success('Success', 'Create Report successful')
                    this.router.navigate([this.name.default_development.name_url + '/lost_found']);
                },
                error => {
                    if (error.json().code) {
                        this.userService.checkError(error.json().code, error.json().message)
                    }else{
                        this.userService.checkError(error.status, '')
                    }
                    
                    this.loading = true
                }
            );
        }
    }

    toLostFound(){
         this.router.navigate([this.name.default_development.name_url + '/lost_found']);
    }

    private loadAllUnits(): void {
      
        this.unitService.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.dataUnit      = data.properties;
                    setTimeout(() => this.loading = false, 1000);
                    // this.getLastSerialNo();
                }, 1000);
            });
    }

    // getLastSerialNo(){
    //     this.lostFoundService.getAll().subscribe(lostfounds => {
    //         this.lostFounds = lostfounds ;
    //         if(lostfounds.length > 0) { 
    //             var a = this.lostFounds.length - 1;
    //             this.no = +this.lostFounds[a].serial_number + 1
    //             if(this.no > 1 && this.no < 10) {
    //                 this.model.serial_number = '000' + this.no.toString();
    //             }if(this.no > 9 && this.no < 100) {
    //                 this.model.serial_number = '00' + this.no.toString();
    //             }if(this.no > 99 && this.no < 1000) { 
    //                 this.model.serial_number = '0' + this.no.toString();
    //             }if(this.no > 999) {
    //                 this.model.serial_number = this.no.toString();
    //             }
    //         } else {
    //             this.model.serial_number = '0001'
    //         }
    //         setTimeout(() => this.appComponent.loading = false, 1000);
    //     });
    // }

    remove(i: any){
        this.model.photo.splice(i, 1)
    }

    goToLostFound(){
      this.router.navigate([this.name.default_development.name_url + '/lost_found']);  
    }

}
