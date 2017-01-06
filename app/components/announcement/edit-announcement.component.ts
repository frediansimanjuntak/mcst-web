import { Component, OnInit, Input }from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { Announcement, Announcements } from '../../models/index';
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
    autoPostOnDateOptions: any = {};
    validTillDateOptions: any = {};
    

   
    constructor(private router: Router,
    	private anouncementService: AnnouncementService,
    	private alertService: AlertService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute ) {
        
        // this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
        this.autoPostOnDateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'No auto post (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };

        this.validTillDateOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: false,
            customPlaceholderTxt: 'Forever (default)',
            // disableUntil: {year: 2016, month: 8, day: 10},
            selectionTxtFontSize: '16px'
        };

        this.model.auto_post_on = "no"
        this.model.valid_till = "forever"
        this.model.publish = false;
        this.model.sticky = 'no';
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.anouncementService
                    .getAnnouncement(this.id)
                    .then(announcement => {
                        this.announcement = announcement;
                        if(this.announcement.auto_post_on != "no"){
                           this.model.auto_post_on = this.announcement.auto_post_on;
                        }else{
                            this.model.auto_post_on = "";
                        }
                        if(this.announcement.valid_till != "forever"){
                           this.model.valid_till = this.announcement.valid_till;
                        }else{
                            this.model.valid_till = "";
                        }
                        
                    });
        };
    }

    createAnnouncement(event: any) {
        if(this.model.auto_post_on == ""){
            this.model.auto_post_on = "no"
        }
        if(this.model.valid_till == ""){
            this.model.valid_till = "forever"
        }
        console.log(this.model);
        Announcements.push(this.model);
        this.router.navigate(['/announcement']);
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

    autoPostOnDateChanged(event:any) {
      // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
      this.model.auto_post_on = event.formatted.replace(/-/g, "/");;
    }

    validTillDateChanged(event:any) {
      // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
      this.model.valid_till = event.formatted.replace(/-/g, "/");;
    }

    updateAnnouncement(){
        if(this.model.auto_post_on == ""){
             this.announcement.auto_post_on  = "no";
        }else{
             this.announcement.auto_post_on  = this.model.auto_post_on;
        }

        if(this.model.valid_till == ""){
            this.announcement.valid_till = "forever";
        }else{
            this.announcement.valid_till = this.model.valid_till;
        }
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

    toAnnouncement(){
         this.router.navigate(['/announcement']);
    }


}
