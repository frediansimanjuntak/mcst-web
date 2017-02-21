import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { NewsletterService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import { AppComponent } from '../index';
import { Observable} from 'rxjs/Observable';

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
                private appComponent: AppComponent,) {
    }

          
    ngOnInit(): void {
        this.userService.getByToken()
          .subscribe(name => {
            this.name = name;
            this.loadAllNewsletters();
          })
        setTimeout(() => this.appComponent.loading = false, 1000);
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
            response => {
              if(response) {
                console.log(response);
                alert(`The Newsletter could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete newsletter successful', true);
                alert(`Delete Newsletter successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
                alert(`The Newsletter could not be deleted, server Error.`);
            }
        );
    }

    releaseNewsletter(){
        this.appComponent.loading = true
      
      this.newsletterservice.release(this.newsletter._id, this.name.default_development.name_url)
          .then(
            response => {
              if(response) {
                console.log(response);
                alert(`The Newsletter could not be release, server Error.`);
              } else {
                this.alertService.success('Release Newsletter successful', true);
                this.firstModal.close();
                alert(`Release Newsletter successful`);
                this.ngOnInit()
              }
            },
            error=> {
              console.log(error);
              this.firstModal.close();
              alert(`The Newsletter could not be release, server Error.`);
            }
        );
    }

    private loadAllNewsletters() {
        this.newsletterservice.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                  this.data = data.newsletter;
                  console.log(this.data);
                  this.dataAgm       = this.data.filter(data => data.type === 'agm' );
                  this.dataEgm       = this.data.filter(data => data.type === 'egm' );
                  this.dataCircular  = this.data.filter(data => data.type === 'circular' );

                }, 1000);
            });
    }

    openModal(newsletter:any){
        this.appComponent.loading = true
      this.newsletter = newsletter;
        setTimeout(() => this.appComponent.loading = false, 1000);
    }

    add(){
      this.router.navigate([this.name.default_development.name_url + '/newsletter/add']);  
    }

}
