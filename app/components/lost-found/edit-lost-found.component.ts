import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LostFound, LostFounds } from '../../models/index';
import { LostFoundService, AlertService, UserService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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

    constructor(private router: Router,
    	private lostFoundService: LostFoundService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService ) {

        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.userService.getByToken().subscribe(name => {this.name = name;})
    }

    createReport(event: any) {
        if(this.model.auto_post_on == ""){
            this.model.auto_post_on = "no"
        }
        if(this.model.valid_till == ""){
            this.model.valid_till = "forever"
        }
        console.log(this.model);
        Announcements.push(this.model);
        this.router.navigate([this.name.default_development.name + '/announcement']);
        // this.lostFoundService.create(this.model)
        // .then(
        //     data => {
        //         this.alertService.success('Create announcement successful', true);
        //         this.router.navigate([this.name.default_development.name + '/newsletter']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The announcement could not be save, server Error.`);
        //     }
        // );
    }

    toLostFound(){
         this.router.navigate([this.name.default_development.name + '/lost_found']);
    }


}
