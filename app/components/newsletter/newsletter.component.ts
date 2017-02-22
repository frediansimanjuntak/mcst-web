import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { NewsletterService, AlertService, UserService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import '../../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { Observable} from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  // moduleId: module.id,
  selector: 'newsletter',
  templateUrl: 'app/templates/newsletter.html',
  // styleUrls: [ 'app/templates/styles/newsletter.css' ]
})

export class NewsletterComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
	  newsletter: any;
    newsletters: any[] = [];
    model: any = {};
    cols: any[];
    users: any;
    public developmentId;
    public data;
    public dataAgm;
    public dataEgm;
    public dataCircular;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    name: any;

    constructor(
                private router: Router,
                private newsletterservice: NewsletterService, 
                private alertService: AlertService,
                private userService: UserService,
                private appComponent: AppComponent,
                private confirmationService: ConfirmationService,
                private _notificationsService: NotificationsService) {
    }

          
    ngOnInit(): void {
        this.userService.getByToken()
          .subscribe(name => {
            this.name = name;
            this.loadAllNewsletters();
          })
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteNewsletter(newsletter: any) {
        this.appComponent.loading = true
        this.newsletterservice.delete(newsletter._id, this.name.default_development.name_url)
          .then(
             data => {
                    this._notificationsService.success(
                            'Success',
                            'Delete Newsletter successful',
                    )
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this._notificationsService.error(
                            'Error',
                            'The Newsletter could not be deleted, server Error',
                    )
                    this.appComponent.loading = false
                }
        );
    }

    deleteConfirmation(newsletter) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this newsletter?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteNewsletter(newsletter)
            }
        });
    }

    releaseNewsletter(){
      this.appComponent.loading = true
      
      this.newsletterservice.release(this.newsletter._id, this.name.default_development.name_url)
          .then(
            data => {
                     this._notificationsService.success(
                            'Success',
                            'Release Newsletter successful',
                    )
                      this.firstModal.close();
                    this.ngOnInit();
                },
                error => {
                    console.log(error);
                    this.firstModal.close();
                    this._notificationsService.error(
                            'Error',
                            'The Newsletter could not be release, server Error',
                    )
                    this.appComponent.loading = false
            }
        );
    }

    private loadAllNewsletters() {
        this.newsletterservice.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                  this.data = data.newsletter;
                  this.dataAgm       = this.data.filter(data => data.type === 'agm' );
                  this.dataEgm       = this.data.filter(data => data.type === 'egm' );
                  this.dataCircular  = this.data.filter(data => data.type === 'circular' );
                  setTimeout(() => this.appComponent.loading = false, 1000);
                }, 1000);
            });
    }

    openModal(newsletter:any){
      this.newsletter = newsletter;
    }

    add(){
      this.router.navigate([this.name.default_development.name_url + '/newsletter/add']);  
    }

}
