import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { UnitService, AlertService, UserService} from '../../services/index';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-progress-bar';
import { NotificationsService } from 'angular2-notifications';


import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'unit',
  templateUrl: '../../templates/unit.html',
  // styleUrls: [ '../../styles/un.css' ]
})

export class UnitComponent implements OnInit {
	unit: Development;
    development: any;
    units: Development[] = [];
    users: any;
    public unitFilter : string = '';
    public typeFilter: string = '';
    public developmentId;
    public data;
    public dataUnit;
    name: any;
    all: any[] = [];
    loading: boolean = true;

    constructor(private router: Router,
                private unitservice: UnitService, 
                private alertService: AlertService,
                private userService: UserService,
        private _notificationsService: NotificationsService,
                private slimLoadingBarService: SlimLoadingBarService, 
                ) {

    }

    ngOnInit(): void {
        this.loading = true;
        this.userService.getByToken().subscribe(name => {
                this.name = name.user;
                this.loadAllUnits();
            })
    }

    deleteUnit(unit: any) {
        this.loading = true
        this.unitservice.delete(unit._id, this.developmentId)
          .then(
            response => {
              if(response) {
                console.log(response);
                alert(`The Unit could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete Unit successful', true);
                alert(`Delete Unit successful`);
                this.ngOnInit()
              }
            },
            error=> {
              if (error.json().message) {
                        if (error.json().code) {
                            this.userService.checkError(error.json().code, error.json().message)
                        }else{
                            this._notificationsService.error("Error", error.json().message)    
                        }
                        
                    }else{
                        this.userService.checkError(error.status, '')
                    } 
                alert(`The Unit could not be deleted, server Error.`);
            }
        );
    }

    private loadAllUnits(): void {
        this.unitservice.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.all = data.properties;
                    this.dataUnit = data.properties;
                    this.loading = false;
                    setTimeout(() => this.loading = false, 1000);
                }, 1000);
            });
    }


    filter(){
        this.loading=true;
        if(this.typeFilter != ''){
            this.dataUnit = this.all.filter(data => ('#'+data.address.unit_no+'-'+data.address.unit_no_2.toLowerCase()).indexOf(this.unitFilter.toLowerCase()) !==  -1 &&
                                                    data.status.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1
                                                    );
        }else{
            this.dataUnit = this.all.filter(data => ('#'+data.address.unit_no+'-'+data.address.unit_no_2.toLowerCase()).indexOf(this.unitFilter.toLowerCase()) !==  -1);  
        }
        setTimeout(() => this.loading = false, 500);
    }

    filterType(event:any){
        this.loading = true
        if(this.unitFilter != ''){
            this.dataUnit = this.all.filter(data => data.status.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1 &&
                                                    ('#'+data.address.unit_no+'-'+data.address.unit_no_2.toLowerCase()).indexOf(this.unitFilter.toLowerCase()) !==  -1
                                            );    
        }else{
            this.dataUnit = this.all.filter(data => data.status.toLowerCase().indexOf(this.typeFilter.toLowerCase()) !==  -1);  
        }
        setTimeout(() => this.loading = false, 500);
    }

    view(unit: any){
        this.router.navigate([this.name.default_development.name_url + '/unit/view', unit._id]);
    }

    add(){
        this.router.navigate([this.name.default_development.name_url + '/unit/add']);  
    }

    start(link:any) {
        this.slimLoadingBarService.start(() => {});
        this.router.navigate([this.name.default_development.name_url + link]);  
  }
}
