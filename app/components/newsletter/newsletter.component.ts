import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { NewsletterService, AlertService, UserService} from '../../services/index';
import '../../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'newsletter',
  templateUrl: 'app/templates/newsletter.html',
  styleUrls: [ 'app/templates/styles/newsletter.css' ]
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

    constructor(private newsletterservice: NewsletterService, 
                private alertService: AlertService,
                 private userService: UserService) {
    }

          
    ngOnInit(): void {
        this.userService.getByToken().subscribe(name => {this.name = name;})
        this.getUsers();
        this.loadAllNewsletters();
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

    releaseNewsletter(newsletter: any){

      this.newsletter.released = true;
      this.firstModal.close();
      this.ngOnInit();
      this.newsletterservice.release(newsletter._id, this.name.default_development.name)
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
        this.newsletterservice.getDevelopments().then(development => {

          this.data = development[0].newsletter;
          this.dataAgm       = this.data.filter(data => data.type === 'agm' );
          this.dataEgm       = this.data.filter(data => data.type === 'egm' );
          this.dataCircular  = this.data.filter(data => data.type === 'circular' );

            for (var i = 0; i < this.dataAgm.length; i++) {
                this.dataAgm[i].created_by = this.users.find(myObj => myObj._id ===  this.dataAgm[i].created_by ).username;
            }
            for (var i = 0; i < this.dataEgm.length; i++) {
                this.dataEgm[i].created_by = this.users.find(myObj => myObj._id ===  this.dataEgm[i].created_by ).username;
            }
            for (var i = 0; i < this.dataCircular.length; i++) {
                this.dataCircular[i].created_by = this.users.find(myObj => myObj._id ===  this.dataCircular[i].created_by ).username;
            }

          });

        // this.newsletterservice.getAll(this.name.default_development.name)
        //     .subscribe((data)=> {
        //         setTimeout(()=> {
        //           this.data = data.newsletter;
        //           this.dataAgm       = this.data.filter(data => data.type === 'agm' );
        //           this.dataEgm       = this.data.filter(data => data.type === 'egm' );
        //           this.dataCircular  = this.data.filter(data => data.type === 'circular' );

        //             for (var i = 0; i < this.dataAgm.length; i++) {
        //                 this.dataAgm[i].created_by = this.users.find(myObj => myObj._id ===  this.dataAgm[i].created_by ).username;
        //             }
        //             for (var i = 0; i < this.dataEgm.length; i++) {
        //                 this.dataEgm[i].created_by = this.users.find(myObj => myObj._id ===  this.dataEgm[i].created_by ).username;
        //             }
        //             for (var i = 0; i < this.dataCircular.length; i++) {
        //                 this.dataCircular[i].created_by = this.users.find(myObj => myObj._id ===  this.dataCircular[i].created_by ).username;
        //             }

        //         }, 1000);
        //     });
    }

    openModal(newsletter){
      this.newsletter = newsletter;
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

}
