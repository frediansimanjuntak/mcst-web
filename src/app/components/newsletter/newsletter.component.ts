import { Component, OnInit, ViewContainerRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Development } from '../../models/index';
import { NewsletterService, AlertService, UserService, AttachmentService} from '../../services/index';
import { NotificationsService } from 'angular2-notifications';

import { FileUploader } from 'ng2-file-upload';

import { Observable} from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';
import { DatePipe } from '@angular/common';

@Component({
  // moduleId: module.id,
  selector: 'newsletter',
  templateUrl: '../../templates/newsletter.html',
  // styleUrls: [ '../../styles/newsletter.css' ]
})

export class NewsletterComponent implements OnInit {
    @ViewChild('firstModal') firstModal;
	  newsletter: any;
    newsletters: any[] = [];
    model: any = {};
    cols: any[];
    users: any;
    public filterField: string = '';
    public developmentId;
    public data;
    public dataAgm;
    public dataEgm;
    public dataCircular;
    allAgm: any[] = [];
    allEgm: any[] = [];
    allCircular: any[] = [];
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";
    name: any;
    loading: boolean = true;

    constructor(
                private datePipe: DatePipe,
                private router: Router,
                private newsletterservice: NewsletterService, 
                private alertService: AlertService,
                private userService: UserService,
                
                private confirmationService: ConfirmationService,
                private _notificationsService: NotificationsService,
                private attachmentService: AttachmentService) {
    }

          
    ngOnInit(): void {
        this.userService.getByToken()
          .subscribe(name => {
            this.name = name.user;
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
        this.loading = true
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
                    this.loading = false
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
      this.loading = true
      
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
                    this.loading = false
            }
        );
    }

    private loadAllNewsletters() {
        this.newsletterservice.getAll(this.name.default_development.name_url)
            .subscribe((data)=> {
                setTimeout(()=> {
                  this.data = data;
                  this.allAgm       = this.data.filter(data => data.type === 'agm' );
                  this.allEgm       = this.data.filter(data => data.type === 'egm' );
                  this.allCircular  = this.data.filter(data => data.type === 'circular' );
                  this.dataAgm       = this.data.filter(data => data.type === 'agm' );
                  this.dataEgm       = this.data.filter(data => data.type === 'egm' );
                  this.dataCircular  = this.data.filter(data => data.type === 'circular' );
                  setTimeout(() => this.loading = false, 1000);
                }, 1000);
            });
    }

    filter(){
        this.loading=true;
        this.dataAgm   = this.allAgm.filter(data => 
                            data.title.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.created_by.username.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            this.datePipe.transform(data.created_at, 'd/M/y').toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1
                            );
        this.dataEgm   = this.allEgm.filter(data => 
                            data.title.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.created_by.username.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            this.datePipe.transform(data.created_at, 'd/M/y').toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1
                            );
        this.dataCircular   = this.allCircular.filter(data => 
                            data.title.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            data.created_by.username.toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1 ||
                            this.datePipe.transform(data.created_at, 'd/M/y').toLowerCase().indexOf(this.filterField.toLowerCase()) !==  -1
                            );
        setTimeout(() => this.loading = false, 500);
    }

    openModal(newsletter:any){
      this.newsletter = newsletter;
    }

    add(){
      this.router.navigate([this.name.default_development.name_url + '/newsletter/add']);  
    }
    public openDoc(file:any){
        if(file.type=="application/pdf"){
            this.attachmentService.downloadPDF(file.url).subscribe(
                (res) => {
                var fileURL = URL.createObjectURL(res);
                window.open(fileURL, '_blank');
                }
            );  
        }
        else if(file.type.indexOf("image")!==  -1){
            var myWindow = window.open("", file.name, "_blank");
            myWindow.document.write("<head><title>" + file.name + "</title></head>");
            myWindow.document.write("<img src=" + file.url + ">");
            return myWindow;
        }
    }

}
