import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Announcement } from '../../models/index';
import { AnnouncementService, AlertService } from '../../services/index';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-announcement',
  templateUrl: '/app/templates/edit-announcement.html'
})

export class EditAnnouncementComponent  { 
    @Input('group')
	announcement: Announcement;
    model: any = {};
    myForm: FormGroup;
    id: string;

    selectedType = 'agm';
    constructor(private router: Router,
    	private anouncementService: AnnouncementService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute ) {
        
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.anouncementService
                    .getAnnouncement(this.id)
                    .then(announcement => {
                        this.announcement = announcement;
                        console.log(announcement);
                    });
        };
    }

    createAnnouncement(event: any) {

        console.log(this.announcement);
        // this.anouncementService.create(this.model)
        // .subscribe(
        //     data => {
        //         this.alertService.success('Create newsletter successful', true);
        //         this.router.navigate(['/newsletter']);
        //     },
        //     error => {
        //         console.log(error);
        //         alert(`The Newsletter could not be save, server Error.`);
        //     }
        // );
    }

    updateNewsletter(){
        console.log(this.announcement);

		// this.anouncementService.update(this.model)
		// .subscribe(
		// 	response => {
		// 		if(response.error) { 
	 //                this.alertService.error(response.error);
	 //            } else {
	 //                // EmitterService.get(this.userList).emit(response.users);
  //                    this.alertService.success('Update newsletter successful', true);
  //                    this.router.navigate(['/newsletter']);
	 //            }
  //           },
  //           error=> { 
  //           	this.alertService.error(error);
  //           }
  //       );
	}

}
