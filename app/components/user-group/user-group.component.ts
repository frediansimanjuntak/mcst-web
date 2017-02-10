import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroup, User } from '../../models/index';
import { UserGroupService, UserService, AlertService} from '../../services/index';
import '../../rxjs-operators';
import { FileUploader } from 'ng2-file-upload';
import { Observable} from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'user-group',
  templateUrl: 'app/templates/user-group.html',
})

export class UserGroupComponent implements OnInit {
	usergroup: any;
    usergroups: any = [];
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
    name: any;

    constructor(
                private router: Router,
                private userGroupService: UserGroupService,
    			private userService: UserService,
    			private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.userService.getByToken()
                        .subscribe(name => {
                            this.name = name;
                            this.getUsers();
                        })
    }

    getUsers(): void {
        this.userService.getAll().subscribe(users => {
            this.users = users.filter(data => data.default_development == this.name.default_development._id);
            this.loadAllUserGroup();
        });
    }

    loadAllUserGroup(): void {
        this.userGroupService.getAll()
            .subscribe((data)=> {
                setTimeout(()=> {
                    this.usergroups          = data.filter(data => data.development._id == this.name.default_development._id);
                    let totalUsers = this.usergroups.users.length;
                    console.log(data);
                    for (var i = 0; i < totalUsers; i++) {
                        let user = this.users.find(data => data._id ==  this.usergroups.users[i]);
                        this.usergroups.user[i] = user.username;
                    }
                }, 3000);
            });
    }

    deleteUserGroup(usergroup: UserGroup) {
        this.userGroupService.delete(usergroup._id)
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
                alert(`The Usergroup could not be deleted, server Error.`);
            }
        );
    }

    add(){
        this.router.navigate([this.name.default_development.name + '/user_group/add']);
    }

    editUserGroup(usergroup: UserGroup){
        this.router.navigate([this.name.default_development.name + '/user_group/edit', usergroup._id]);
    }
}
