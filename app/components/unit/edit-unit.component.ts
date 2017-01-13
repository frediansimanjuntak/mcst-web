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
        this.developmentId = '585b36585d3cc41224fe518a';
        this.getUsers();
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
                landlord: [''],
                tenant: this.formbuilder.array([]),
                registered_vehicle: this.formbuilder.array([]),
                status: ['', <any>Validators.required],
                created_by: ['583e4e9dd97c97149884fef5']
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.unitservice
                .getDevelopments()
                   .then(development => {
                       this.units = development[0].properties
                       this.unit = this.units.find(unit => unit._id === this.id);
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
        
        if(isValid && this.selectedLanlord){
            model.landlord = this.selectedLanlord.id;
            Developments[0].properties.push(model);
            this.router.navigate(['/unit']);    
            console.log(model);
            this.unitservice.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Create Unit successful', true);
                    this.router.navigate(['/unit']);
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
         console.log(this.unit);
        // this.unitservice.update(model)
        // .then(
        //     response => {
        //         this.alertService.success('Update development successful', true);
        //         this.router.navigate(['/development']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
    }

    goBack(): void {
        this.location.back();
    }
}
