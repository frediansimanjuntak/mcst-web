import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { User } from '../../models/index';
import { UserService } from '../../services/index';
import '../../rxjs-operators';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/user.html',
})
 
export class UserComponent implements OnInit {
    user: User;
    users: User[] = [];
    model: any = {};
 
    constructor(private userService: UserService) {
        this.length = this.data.length;
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
    }
 
    ngOnInit() {
        this.onChangeTable(this.config);
        this.loadAllUsers();
    }
 
    deleteUser(id: string) {
        this.userService.delete(id) 
        // .subscribe(() => { this.loadAllUsers() });
        .subscribe(
			response => {
				if(response.error) { 
	                alert(`The user could not be deleted, server Error.`);
	            } else {
	                this.loadAllUsers()
	            }
            },
            error=> { 
                alert(`The user could not be deleted, server Error.`);
            }
        );
    }

    updateUser(){
		this.userService.update(this.model)
		.subscribe(
			response => {
				if(response.error) { 
	                alert(`The user could not be updated, server Error.`);
	            } else {
	                // EmitterService.get(this.userList).emit(response.users);
	            }
            },
            error=> { 
            	alert(`The user could not be updated, server Error.`);
            }
        );
	}

 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; console.log(users) });
    }

    public rows:Array<any> = [];
    public columns:Array<any> = [
    {title: 'Name', name: 'name', filtering: {filterString: '', placeholder: 'Filter by name'}},
    {
      title: 'Email',
      name: 'email',
      sort: false,
      filtering: {filterString: '', placeholder: 'Filter by Email'}
    },
    {title: 'Phone', className: ['phone-header', 'text-success'], name: 'phone', sort: false},
    {title: 'Role.', name: 'role', sort: '', filtering: {filterString: '', placeholder: 'Filter by role.'}},
    {title: 'Active', className: 'text-warning', name: 'active'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  private data:Array<any> = this.users;

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }


}