import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserGroup, UserGroups, User, Users } from '../../models/index';
import { UserGroupService, UserService, AlertService } from '../../services/index';
import { NotificationsService } from 'angular2-notifications';
import { AppComponent } from '../index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-user-group',
  templateUrl: 'app/templates/edit-user-group.html',
  
})

export class EditUserGroupComponent implements OnInit {
    public items:Array<any> = [];
    public items2:Array<any> = [];

    private user:any = [];
    private chief :any = {};
    public chiefField: boolean;
    private _disabledV:string = '0';
    private disabled:boolean = false;

    @Input('group')
	usergroup : UserGroup;
    model: any = {};
    id: string;
    myForm: FormGroup;
    users: any;
    usersForMember: any;
    myOptions: Array<any>;
    myOptions2: Array<any>;
    options1: Array<any> = [];
    mySelectUsers: Array<string>;
    selection: Array<string>;
    name: any;

    constructor(private router: Router,
    	private userGroupService: UserGroupService,
    	private userService: UserService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private appComponent: AppComponent,
        private _notificationsService: NotificationsService) {
    }
    
    ngOnInit(): void {
        this.userService.getByToken()
                        .subscribe(name => {
                            this.name = name;
                            this.getUsers();
                        })
        
        this.myForm = this.formbuilder.group({
            description : ['', Validators.required],
            chief : [''],
            users: this.formbuilder.array([]),
        });

        this.model.chief = "";
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.userGroupService
                    .getById(this.id)
                    .subscribe(usergroup => {
                        this.usergroup = usergroup;
                        this.model.chief = this.usergroup.chief._id;

                        let numOptions =  this.usergroup.users.length;
                        let opts = new Array(numOptions);

                        for (let i = 0; i < numOptions; i++) {
                            opts[i] = {
                                id: this.usergroup.users[i],
                                text: this.users.find(myObj => myObj._id ===  this.usergroup.users[i] ).username,
                            };
                        }

                        this.user = opts.slice(0);
                        setTimeout(() => this.appComponent.loading = false, 1000);

                    });
        };

    }


    private get disabledV():string {
        return this._disabledV;
    }

    private set disabledV(value:string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selected(value:any):void {
    }

    public removed(value:any):void {
    }

    public refreshValueUser(value:any):void {
        this.user = value;
    }

    // public refreshValueChief(value:any):void {
    //     this.chief = value;
    //     if (this.chief.length == 0){
    //         this.chiefField = false;
    //     }else{
    //         this.chiefField = true;
    //     }
    // }

    public itemsToString(value:Array<any> = []):string {
        return value
          .map((item:any) => {
            return item.text;
           }).join(',');
    }

    initUser() {
        return this.formbuilder.group({
        });
    }

    getUsers(): void {
        this.userService.getAll().subscribe(users => {
            this.users = users.filter(data => data.default_development == this.name.default_development._id);
            this.usersForMember = this.users.filter(data => data.user_group == undefined || data.user_group == null || data.user_group == '');
            let numOptions =  this.users.length;
            let opts = new Array(numOptions);

            for (let i = 0; i < numOptions; i++) {
                opts[i] = {
                    id: this.users[i]._id,
                    text: this.users[i].username
                };
            }

            this.myOptions = opts.slice(0);
            this.items = this.myOptions;

            let numOptions2 =  this.usersForMember.length;
            let opts2 = new Array(numOptions2);

            for (let i = 0; i < numOptions2; i++) {
                opts2[i] = {
                    id: this.usersForMember[i]._id,
                    text: this.usersForMember[i].username
                };
            }

            this.myOptions2 = opts2.slice(0);
            this.items2 = this.myOptions2;
            setTimeout(() => this.appComponent.loading = false, 1000);
        });
    }


    addUser() {
        const control = <FormArray>this.myForm.controls['users'];
        const userCtrl = this.initUser();

        control.push(userCtrl);

    }

    removeUser(i: number) {
        const control = <FormArray>this.myForm.controls['users'];
        control.removeAt(i);
    }

    createUserGroup() {
        this.model.users = [];
        for (let i = 0; i < this.user.length; i++) {
            this.model.users[i] = this.user[i].id ;
        }
        if(this.model.chief){
            this.appComponent.loading = true;
            this.userGroupService.create(this.model)
            .then(
                data => {
                    this._notificationsService.success(
                            'Success',
                            'Create usergroup successful',
                    )
                    this.router.navigate([this.name.default_development.name_url + '/user_group']);
                },
                error => {
                    this._notificationsService.error(
                            'Error',
                            'Failed to create usergroup, server Error',
                    )
                    this.appComponent.loading = false;
                }
            );    
        }
        
    }

    goToUserGroup(){
        this.router.navigate([this.name.default_development.name_url + '/user_group']);  
    }

    updateUserGroup(){
        if(this.model.chief && this.usergroup.description != ''){
            this.usergroup.users = [];
            this.usergroup.chief = this.model.chief;
            for (let i = 0; i < this.user.length; i++) {
                this.usergroup.users[i] =this.user[i].id ;
            }
            this.userGroupService.update(this.usergroup)
                .then(
                    data => {
                        this._notificationsService.success(
                                'Success',
                                'Update usergroup successful',
                        )
                        this.router.navigate([this.name.default_development.name_url + '/user_group']);
                    },
                    error => {
                        this._notificationsService.error(
                                'Error',
                                'Failed to update usergroup, server Error',
                        )
                        this.appComponent.loading = false;
                    }
                );
        }
        
    }
}
