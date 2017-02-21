import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';
import { AppComponent } from '../index';


@Component({
  // moduleId: module.id,
  selector: 'development',
  templateUrl: 'app/templates/development.html',
})

export class DevelopmentComponent implements OnInit {
	development: Development;
    developments: Development[] = [];
    model: any = {};

    constructor(private router: Router,private developmentService: DevelopmentService,private appComponent: AppComponent,private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllDevelopments();
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    deleteDevelopment(development: Development) {
        this.appComponent.loading = true
        this.developmentService.delete(development._id)
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
