import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import { HeaderComponent } from '../header.component';
import '../../rxjs-operators';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'development',
  templateUrl: '/app/templates/development.html',
})

export class DevelopmentComponent implements OnInit { 
	development: Development;
    developments: Development[] = [];
    model: any = {};
     cols: any[];

    constructor(private router: Router,private developmentService: DevelopmentService,private alertService: AlertService) {}

    ngOnInit() {
        // this.loadAllDevelopments();
        // this.onChangeTable(this.config);
        console.log(this.loadAllDevelopments());
    }
 
    deleteDevelopment(development: Development) {
        this.developmentService.delete(development._id) 
        // .subscribe(() => { this.loadAllUsers() });
        .then(
			response => {
				if(response) { 
	                alert(`The development could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete development successful', true);
	                this.loadAllDevelopments()
	            }
            },
            error=> { 
                alert(`The Development could not be deleted, server Error.`);
            }
        );
    }
   
    private loadAllDevelopments() {
        this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    add(){
        this.router.navigate(['/development/add']);
    }

    edit(development: Development){
        this.router.navigate(['/development/edit', development._id]);
    }
}
