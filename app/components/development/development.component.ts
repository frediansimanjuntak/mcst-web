import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Development } from '../../models/index';
import { DevelopmentService, AlertService } from '../../services/index';
import { HeaderComponent } from '../header.component';
import '../../rxjs-operators';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'development',
  templateUrl: '/app/templates/development.html',
})

export class DevelopmentComponent implements OnInit { 
	development: Development;
    developments: Development[] = [];
    model: any = {};
     cols: any[];

    constructor(private developmentService: DevelopmentService,private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllDevelopments();
        // this.onChangeTable(this.config);
        this.cols = [
            {field: 'name', header: 'Vin'},
            {field: 'owner', header: 'Year'},
            {field: 'description', header: 'Brand'},
        ];
    }
 
    deleteDevelopment(car: Development) {
        this.developmentService.delete(car._id) 
        // .subscribe(() => { this.loadAllUsers() });
        .subscribe(
			response => {
				if(response.error) { 
	                alert(`The development could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete development successful', true);
	                this.loadAllDevelopments()
	            }
            },
            error=> { 
                alert(`The Development could not be deleted, server Error.`);
            }
        );
    }

   
    private loadAllDevelopments() {
        this.developmentService.getAll().subscribe(developments => { this.developments = developments; console.log(developments) });
    }
     

    //Table----------------------
  //   public rows:Array<any> = [];
  //   public columns:Array<any> = [
  //   {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
  //   {
  //     title: 'Owner',
  //     name: 'owner',
  //     sort: false,
  //     filtering: {filterString: '', placeholder: 'Filter by owner'}
  //   },    
  //   {title: 'Description', name: 'description', sort: false}
  // ];
  // public page:number = 1;
  // public itemsPerPage:number = 10;
  // public maxSize:number = 5;
  // public numPages:number = 1;
  // public length:number = 0;

  // // public config:any = {
  // //   paging: true,
  // //   sorting: {columns: this.columns},
  // //   filtering: {filterString: ''},
  // //   className: ['table-striped', 'table-bordered']
  // // };
  // public config:any = {
  //   paging: true,
  //   sorting: {columns: this.columns},
  //   filtering: {filterString: '', columnName: 'name'}
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

  // // public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
  // //   if (config.filtering) {
  // //     Object.assign(this.config.filtering, config.filtering);
  // //   }
  // //   if (config.sorting) {
  // //     Object.assign(this.config.sorting, config.sorting);
  // //   }

  // //      this.developmentService.getAll()
  // //        .subscribe(developments => {
  // //           this.data =developments;
  // //           this.length = this.data.length;
  // //           let filteredData = this.changeFilter(this.data, this.config);
  // //           let sortedData = this.changeSort(filteredData, this.config);
  // //           this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  // //           this.length = sortedData.length;
  // //       })
  // // }

  // public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
  //   if (config.filtering) {
  //     Object.assign(this.config.filtering, config.filtering);
  //   }
  //   if (config.sorting) {
  //     Object.assign(this.config.sorting, config.sorting);
  //   }
  //   this.developmentService.getAll()
  //        .subscribe(developments => {
  //           this.data = developments;
  //           this.length = this.data.length;
  //           let filteredData = this.changeFilter(this.data, this.config);
  //           let sortedData = this.changeSort(filteredData, this.config);
  //           this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
  //           this.length = sortedData.length;
  //           console.log(this.data);
  //       })

  
  // }

  // public onCellClick(data: any): any {
  //   console.log(data);
  // }

}
