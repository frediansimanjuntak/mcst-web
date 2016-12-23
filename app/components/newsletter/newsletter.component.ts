import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { NewsletterService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'newsletter',
  templateUrl: '/app/templates/newsletter.html',
  styleUrls: [ '/app/templates/styles/newsletter.css' ]
})

export class NewsletterComponent implements OnInit { 
	  newsletter: Development;
    newsletters: Development[] = [];
    model: any = {};
    cols: any[];
    public developmentId;
    public data;
    public dataAgm;
    public dataCircular;    
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

    constructor(private newsletterservice: NewsletterService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllNewsletters();
         this.cols = [
            {field: 'date', header: 'Date'},
            {field: 'title', header: 'Title'},
            {field: 'uploaded_on', header: 'Uploaded on'},
            {field: 'uploaded_by', header: 'Uploaded by'},
            {field: 'attachment', header: 'Attachment'},
        ];
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteNewsletter(newsletter: any) {
        this.newsletterservice.delete(newsletter._id, this.developmentId) 
          .then(
            response => {
              if(response) { 
                console.log(response);
                // console.log(response.error());
                alert(`The Newsletter could not be deleted, server Error.`);
              } else {
                this.alertService.success('Create user successful', true);
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
      this.newsletterservice.release(newsletter._id, this.developmentId) 
          .then(
            response => {
              if(response) { 
                console.log(response);
                // console.log(response.error());
                alert(`The Newsletter could not be release, server Error.`);
              } else {
                this.alertService.success('Release Newsletter successful', true);
                alert(`Release Newsletter successful`);
                this.ngOnInit()
              }
            },
            error=> { 
              console.log(error);
                alert(`The Newsletter could not be release, server Error.`);
            }
        );
    }

    private loadAllNewsletters() {
        this.newsletterservice.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {

                    this.data          = data.find(data => data._id === this.developmentId );
                    this.dataAgm       = this.data.newsletter.filter(data => data.type === 'agm' ); 
                    this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
                    console.log(this.dataAgm);
                }, 1000);
            });
    }

    public tabs:Array<any> = [
        {title: 'Dynamic Title 1', content: ''},
        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true},
        {title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true},
        {title: 'Dynamic Title 4', content: 'Dynamic content 4', customClass: 'customClass'}
    ];
     
    public setActiveTab(index:number):void {
        this.tabs[index].active = true;
    };

  //   //Table----------------------
  //   public rows:Array<any> = [];
  //   public columns:Array<any> = [
  //   {title: 'Date', name: 'date', filtering: {filterString: '', placeholder: 'Filter by date'}},
  //   {
  //     title: 'Title',
  //     name: 'title',
  //     sort: false,
  //     filtering: {filterString: '', placeholder: 'Filter by Email'}
  //   },
  //   {title: 'Uploaded on', className: ['phone-header', 'text-success'], name: 'sticky', sort: false},
  //   {title: 'Uploaded by', name: 'auto_post_on', sort: '', filtering: {filterString: '', placeholder: 'Filter by role.'}},
  //   {title: 'Attachments', className: 'text-warning', name: 'valid till'},
  //   {title: 'Actions', className: 'text-warning', name: 'created n'}
  // ];
  // public page:number = 1;
  // public itemsPerPage:number = 10;
  // public maxSize:number = 5;
  // public numPages:number = 1;
  // public length:number = 0;

  // public config:any = {
  //   paging: true,
  //   sorting: {columns: this.columns},
  //   filtering: {filterString: ''},
  //   className: ['table-striped', 'table-bordered']
  // };

  // private data:Array<any> = [];

  // public changePage(page:any, data:Array<any> = this.data):Array<any> {
  //   let start = (page.page - 1) * page.itemsPerPage;
  //   let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
  //   return data.slice(start, end);
  // }

  // public changeSort(data:any, config:any):any {
  //   if (!config.sorting) {
  //     return data;
  //   }

  //   let columns = this.config.sorting.columns || [];
  //   let columnName:string = void 0;
  //   let sort:string = void 0;

  //   for (let i = 0; i < columns.length; i++) {
  //     if (columns[i].sort !== '' && columns[i].sort !== false) {
  //       columnName = columns[i].name;
  //       sort = columns[i].sort;
  //     }
  //   }

  //   if (!columnName) {
  //     return data;
  //   }

  //   // simple sorting
  //   return data.sort((previous:any, current:any) => {
  //     if (previous[columnName] > current[columnName]) {
  //       return sort === 'desc' ? -1 : 1;
  //     } else if (previous[columnName] < current[columnName]) {
  //       return sort === 'asc' ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // }

  // public changeFilter(data:any, config:any):any {
  //   let filteredData:Array<any> = data;
  //   this.columns.forEach((column:any) => {
  //     if (column.filtering) {
  //       filteredData = filteredData.filter((item:any) => {
  //         return item[column.name].match(column.filtering.filterString);
  //       });
  //     }
  //   });

  //   if (!config.filtering) {
  //     return filteredData;
  //   }

  //   if (config.filtering.columnName) {
  //     return filteredData.filter((item:any) =>
  //       item[config.filtering.columnName].match(this.config.filtering.filterString));
  //   }

  //   let tempArray:Array<any> = [];
  //   filteredData.forEach((item:any) => {
  //     let flag = false;
  //     this.columns.forEach((column:any) => {
  //       if (item[column.name].toString().match(this.config.filtering.filterString)) {
  //         flag = true;
  //       }
  //     });
  //     if (flag) {
  //       tempArray.push(item);
  //     }
  //   });
  //   filteredData = tempArray;

  //   return filteredData;
  // }

  // public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
  //   if (config.filtering) {
  //     Object.assign(this.config.filtering, config.filtering);
  //   }

  //   if (config.sorting) {
  //     Object.assign(this.config.sorting, config.sorting);
  //   }
  //   this.newsletterservice.getAll()
  //        .subscribe(Response => {
  //           this.data = Response;
  //           this.length = this.data.length;
  //           let filteredData = this.changeFilter(this.data, this.config);
  //           let sortedData = this.changeSort(filteredData, this.config);
  //           this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  //           this.length = sortedData.length;
  //       })

  
  // }

  // public onCellClick(data: any): any {
  //   console.log(data);
  // }

}
