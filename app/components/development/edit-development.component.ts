import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-development',
  templateUrl: 'app/templates/edit-development.html',
})

export class EditDevelopmentComponent implements OnInit {
	development: Development;
    model: any = {};
    id: string;

    constructor(private router: Router,
    	private developmentService: DevelopmentService,
    	private alertService: AlertService,
        private route: ActivatedRoute,) {}


    // ngOnInit(): void {
    //     this.route.params
    //   .switchMap((params: Params) => this.developmentService.getById(params['name']))
    //   .subscribe(development => this.development = development);
    //   console.log(this.route.params);
    //    // this.developmentService.getById(name).then(development => { this.development = development; console.log(development) });
    //     // this.onChangeTable(this.config);
    // }

    // ngOnInit() {
        // this.route.params.subscribe((params: Params) => {
            // this.developmentService.getById(params['id'])
            // .subscribe(development => {this.development = development; console.log(development);});
        // });
    // }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        if( this.id != null) {
            this.developmentService.getById(this.id).subscribe(development => this.development = development);
        }
    }

    createDevelopment() {
        this.developmentService.create(this.model)
        .then(
            response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate(['/development']);
            },
            error => {
                this.alertService.error(error);
            }
        );
    }

    updateDevelopment(){
		this.developmentService.update(this.development)
		.then(
			response => {
                this.alertService.success('Update development successful', true);
                this.router.navigate(['/development']);
            },
            error => {
            	this.alertService.error(error);
            }
        );
	}
}
