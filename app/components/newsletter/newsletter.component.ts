import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { NewsletterService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
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
                private userService: UserService) {
    }

          
    ngOnInit(): void {
        this.userService.getByToken()
          .subscribe(name => {
            this.name = name;
            this.loadAllNewsletters();
          })
        this.getUsers();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteNewsletter(newsletter: any) {
        this.newsletterservice.delete(newsletter._id, this.name.default_development.name)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
                alert(`The Newsletter could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create newsletter successful', true);
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
      
      this.newsletterservice.release(this.newsletter._id, this.name.default_development.name)
          .then(
            response => {
              if(response) {
                console.log(response);
                // console.log(response.error());
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
        this.newsletterservice.getAll(this.name.default_development.name)
            .subscribe((data)=> {
                setTimeout(()=> {
                  console.log(data);
                  this.data = data.newsletter;
                  this.dataAgm       = this.data.filter(data => data.type === 'agm' );
                  this.dataEgm       = this.data.filter(data => data.type === 'egm' );
                  this.dataCircular  = this.data.filter(data => data.type === 'circular' );

                }, 1000);
            });
    }

    openModal(newsletter:any){
      this.newsletter = newsletter;
      console.log(this.newsletter);
    }

    getUsers(): void {
        this.userService.getUsers().then(users => {
            this.users = users;
        });

        // this.userService.getAll()
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //            this.users = data;
        //         }, 1000);
        //     });
    }

    add(){
      this.router.navigate([this.name.default_development.name + '/newsletter/add']);  
    }

}
