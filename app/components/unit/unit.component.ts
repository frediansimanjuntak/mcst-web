import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { UnitService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'unit',
  templateUrl: '/app/templates/unit.html',
  // styleUrls: [ '../../templates/styles/un.css' ]
})

export class UnitComponent implements OnInit { 
	  unit: Development;
    units: Development[] = [];
    model: any = {};
    cols: any[];
    public developmentId;
    public data; 
    public dataUnit; 
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";

    constructor(private router: Router,private unitservice: UnitService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllUnits();
         this.cols = [
            {field: 'unit_no', header: 'Unit No'},
            {field: 'unit_no_2', header: 'Unit No 2'},
            {field: 'block_no', header: 'Block No'},
            {field: 'street_name', header: 'Street Name'},
            {field: 'postal_code', header: 'Postal Code'},
            {field: 'country', header: 'Country'},
            {field: 'full_address', header: 'Full Address'},
            {field: 'status', header: 'Status'}
        ];
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    deleteUnit(unit: any) {
      console.log(unit);
        this.unitservice.delete(unit._id, this.developmentId) 
          .then(
            response => {
              if(response) { 
                console.log(response);  
                // console.log(response.error());
                alert(`The Unit could not be deleted, server Error.`);
              } else {
                this.alertService.success('Delete Unit successful', true);
                alert(`Delete Unit successful`);
                this.ngOnInit()
              }
            },
            error=> { 
              console.log(error);
                alert(`The Unit could not be deleted, server Error.`);
            }
        );
    }

    private loadAllUnits() {
        this.unitservice.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.data          =   data.find(data => data._id === this.developmentId );
                    this.dataUnit       = this.data.properties 
                    // this.dataCircular  = this.data.newsletter.filter(data => data.type === 'circular' ); 
                    console.log(this.dataUnit);
                }, 1000);
            });
    }


    editUnit(unit: any){
        this.router.navigate(['/unit/edit', unit._id]);
    }

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
