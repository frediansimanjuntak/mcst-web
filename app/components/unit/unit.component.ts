import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { UnitService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'unit',
  templateUrl: 'app/templates/unit.html',
  // styleUrls: [ 'app/templates/styles/un.css' ]
})

export class UnitComponent implements OnInit {
	unit: Development;
    development: any;
    units: Development[] = [];
    users: any;
    public developmentId;
    public data;
    public dataUnit;
    
    constructor(private router: Router,
                private unitservice: UnitService, 
                private alertService: AlertService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.getUsers();
        this.loadAllUnits();
    }

    deleteUnit(unit: any) {
      console.log(unit);
        this.unitservice.delete(unit._id, this.developmentId)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Unit could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete Unit successful', true);
                alert(`Delete Unit successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Unit could not be deleted, server Error.`);
            }
        );
    }

    private loadAllUnits(): void {
      this.unitservice.getDevelopments().then(development => {

      this.dataUnit = development[0].properties
        for (var i = 0; i < this.dataUnit.length; i++) {
            this.dataUnit[i].owner = this.users.find(myObj => myObj._id ===  this.dataUnit[i].landlord ).username;
        }
      });

        // this.unitservice.getDevelopments()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //             this.data          =   data.find(data => data._id === "1" );
        //             this.dataUnit       = this.data.properties;
        //             console.log(this.dataUnit);
        //         }, 1000);
        //     });
             // .then(development => this.development.dataUnit = development.properties);
             // console.log(this.development);
    }

    getUsers(): void {
        this.userService.getUsers().then(users => {
            this.users = users;
        });
    }

    viewUnit(unit: any){
        this.router.navigate(['/unit/view', unit._id]);
    }
}
