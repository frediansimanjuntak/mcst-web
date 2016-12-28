import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserGroup, User } from '../../models/index';
import { UserGroupService, UserService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import {NG_TABLE_DIRECTIVES}    from 'ng2-table/ng2-table'
import { Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'user-group',
  templateUrl: '/app/templates/user-group.html',
})

export class UserGroupComponent implements OnInit { 
	usergroup: any;
    usergroups: UserGroup[] = [];
    users: User[] = [];
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

    constructor(
                private router: Router,
                private userGroupService: UserGroupService,
    			private userService: UserService, 
    			private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.developmentId = '585b36585d3cc41224fe518a';
        this.loadAllUserGroup();
        this.getUsers();
        	
        // for (var i = 0; i < this.usergroups.length ; i++) {
        // 	Things[i]
        // }
    }

    getUsers(): void {
    	this.userService.getUsers().then(users => this.users = users);
  	}

	loadAllUserGroup(): void {
    	this.userGroupService.getUserGroups().then(usergroups => this.usergroups = usergroups);

  	}

    deleteUserGroup(usergroup: UserGroup) {
        console.log(usergroup);
        this.userGroupService.delete(usergroup._id) 
        // .subscribe(() => { this.loadAllUsers() });
        .then(
            response => {
                if(response) { 
                    alert(`The Usergroup could not be deleted, server Error.`);
                } else {
                    this.alertService.success('Delete usergroup successful', true);
                    this.loadAllUserGroup()
                }
            },
            error=> { 
                alert(`The USergroup could not be deleted, server Error.`);
            }
        );
    }

    add(){
        this.router.navigate(['/user_group/add']);
    }

    edit(usergroup: UserGroup){
        this.router.navigate(['/user_group/edit', usergroup._id]);
    }
}
