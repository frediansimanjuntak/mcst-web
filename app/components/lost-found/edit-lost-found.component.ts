import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { LostFoundService, AlertService, UserService, UnitService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
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
    model: any = {};
    myForm: FormGroup;
    id: string;
    autoPostOnDateOptions: any = {};
    validTillDateOptions: any = {};
    name: any;
    dataUnit: any[]=[];

    constructor(private router: Router,
    	private lostFoundService: LostFoundService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private unitService: UnitService
         ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.loadAllUnits();
    }

    createReport(event: any) {
        this.model.serial_number = 142141;
        this.model.made_by       = this.name.username;
        this.model.development         = this.name.default_development.name;
        console.log(this.model);
        this.lostFoundService.create(this.model)
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
                    this.dataUnit       = data;
                    console.log(this.dataUnit);
                }, 1000);
            });
    }


    onChange(event: any) {
       let files = [].slice.call(event.target.files);
       this.model.attachment = files;
    }

    remove(i: any){
        this.model.attachment.splice(i, 1)
    }

    goToLostFound(){
      this.router.navigate([this.name.default_development.name + '/lost_found']);  
    }

}
