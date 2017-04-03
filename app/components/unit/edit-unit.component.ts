import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Location }               from '@angular/common';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';
// import { User } from '../../models/index';
// import { Unit } from '../../models/unit.interface';

@Component({
  // moduleId: module.id,
  selector: 'edit-unit',
  templateUrl: 'app/templates/edit-unit.html'
})

export class EditUnitComponent implements OnInit {
	unit: any;
    units: any;
    users: any;
    selectedLanlord: any = {};
    public items:Array<any> = [];
    myOptions: Array<any>;
    model: any = {};
    id: string;
    public developmentId;
    myForm: FormGroup;
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    name: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
        private userService: UserService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private location: Location,
        private _notificationsService: NotificationsService,
        private appComponent: AppComponent, ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.myForm = this.formbuilder.group({
                address: this.formbuilder.group({
                    unit_no : ['',  <any>Validators.required],
                    unit_no_2 : ['', <any>Validators.required],
                    block_no : ['', <any>Validators.required],
                    street_name : ['', <any>Validators.required],
                    postal_code : ['', <any>Validators.required],
                    country : ['', <any>Validators.required],
                    full_address : ['', <any>Validators.required]
                }),
                // status: ['no landlord'],
                max_tenant: [],
        });
        this.userService.getByToken()
                            .subscribe(name => {
                                this.name = name;
                                this.myForm.patchValue({
                                    address: {
                                        unit_no : '',
                                        unit_no_2 : '',
                                        block_no : '',
                                        street_name : this.name.default_development.address.street_name,
                                        postal_code : this.name.default_development.address.postal_code,
                                        country : this.name.default_development.address.country,
                                        full_address : this.name.default_development.address.full_address
                                    },
                                    max_tenant: [],
                                });
                                setTimeout(() => this.appComponent.loading = false, 1000);
                            })
        this.submitted = false;

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.unitservice
                .getById(this.id, this.name.default_development.name_url)
                   .subscribe(unit => {
                       this.unit = unit.propeties;
                    });
        }
    }

    createUnit(model: any, isValid: boolean) {
        this.submitted = true;
        console.log(model);
        if(isValid){
            if(model.max_tenant <= 20){
                if(model.address.unit_no.length == 1){
                   model.address.unit_no = '0'+model.address.unit_no.toString();
                }
                if(model.address.unit_no_2.length == 1){
                          model.address.unit_no_2 = '0'+model.address.unit_no_2.toString();
                   }
                this.appComponent.loading = true
                this.unitservice.create(model, this.name.default_development.name_url)
                .then(
                    data => {
                        this._notificationsService.success(
                                'Success',
                                'Create Unit successful',
                            )
                        this.router.navigate([this.name.default_development.name_url + '/unit']);
                    },
                    error => {
                        console.log(error);
                        this._notificationsService.error(
                                'Error',
                                'The Unit could not be save, server Error.',
                        )
                        this.appComponent.loading = false;
                    }
                );  
            }            
        }
    }

    public refreshValueLanlord(value:any):void {
        this.selectedLanlord = value;
    }

    public selected(value:any):void {
        
    }

    updateUnit(){
        this.appComponent.loading = true
        this.unitservice.update(this.unit, this.name.default_development.name_url)
        .then(
            response => {
                this.alertService.success('Update unit successful', true);
                this.router.navigate([this.name.default_development.name_url + '/unit']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    goBack(): void {
        this.location.back();
    }

    goToUnit(){
        this.router.navigate([this.name.default_development.name_url + '/unit']);  
    }
}
