import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development, Developments } from '../../models/index';
import { UnitService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location }               from '@angular/common';
import { Observable} from 'rxjs/Observable';
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
    status = [
        { value: 'tenanted', name: 'Tenanted' },
        { value: 'own_stay', name: 'Own Stay' }
    ];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    	private unitservice: UnitService,
        private userService: UserService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private location: Location ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.getUsers();
        this.submitted = false;
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
                status: ['', <any>Validators.required],
        });

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

    createUnit(model: any, isValid: boolean) {
        this.submitted = true;
        
        if(isValid){
            this.unitservice.create(model, this.name.default_development.name_url)
            .then(
                data => {
                    this.alertService.success('Create Unit successful', true);
                    this.router.navigate([this.name.default_development.name_url + '/unit']);
                },
                error => {
                    console.log(error);
                    alert(`The Unit could not be save, server Error.`);
                }
            );
        }
    }

    public refreshValueLanlord(value:any):void {
        this.selectedLanlord = value;
    }

    public selected(value:any):void {
        // console.log('Selected value is: ', value);
    }

    updateUnit(){
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
