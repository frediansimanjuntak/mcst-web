import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserGroup, UserGroups, User, Users } from '../../models/index';
import { UserGroupService, UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  // moduleId: module.id,
  selector: 'edit-user-group',
  templateUrl: 'app/templates/edit-user-group.html',
  styleUrls: [ 'app/templates/styles/ng2-select.css' ]
})

export class EditUserGroupComponent implements OnInit {
    public items:Array<any> = [];

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
    myOptions: Array<any>;
    options1: Array<any> = [];
    mySelectUsers: Array<string>;
    selection: Array<string>;

    constructor(private router: Router,
    	private userGroupService: UserGroupService,
    	private userService: UserService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private route: ActivatedRoute,) {
    }

    ngOnInit(): void {
        this.getUsers();
        this.myForm = this.formbuilder.group({
            description : ['', Validators.required],
            chief : [''],
            users: this.formbuilder.array([]),
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if( this.id != null) {
            this.userGroupService
                    .getUserGroup(this.id)
                    .then(usergroup => {
                        this.usergroup = usergroup;


                        this.chief.text = this.users.find(myObj => myObj._id ===  this.usergroup.chief ).username;
                        this.chief.id = this.usergroup.chief;
                        this.chiefField = true;

                        // for (let i = 0; i < this.usergroup.users.length; i++) {
                        //     this.user[i].text = this.users.find(myObj => myObj._id ===  this.usergroup.users[i] ).username;
                        //     this.user[i].id = this.usergroup.users[i];
                        // }

                        let numOptions =  this.usergroup.users.length;
                        let opts = new Array(numOptions);

                        for (let i = 0; i < numOptions; i++) {
                            opts[i] = {
                                id: this.usergroup.users[i],
                                text: this.users.find(myObj => myObj._id ===  this.usergroup.users[i] ).username,
                            };
                        }

                        this.user = opts.slice(0);

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
        // console.log('Selected value is: ', value);
    }

    public removed(value:any):void {
        // console.log('Removed value is: ', value);
    }

    public refreshValueUser(value:any):void {
        this.user = value;
    }

    public refreshValueChief(value:any):void {
        this.chief = value;
        if (this.chief.length == 0){
            this.chiefField = false;
        }else{
            this.chiefField = true;
        }
    }

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
        this.userService.getUsers().then(users => {
            this.users = users;
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
        });
    }


    addUser() {
        const control = <FormArray>this.myForm.controls['users'];
        const userCtrl = this.initUser();

        control.push(userCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
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
        this.model.chief = this.chief.id;

        UserGroups.push(this.model);
        console.log(this.model)
        this.router.navigate(['/user_group']);
        //   this.userGroupService.create(model)
        // .then(
        //     data => {
        //         this.alertService.success('Create usergroup successful', true);
        //         this.router.navigate(['/user']);
        //     },
        //     error => {
        //         this.alertService.error(error);
        //     }
        // );
    }

    updateUserGroup(){
        if(this.chiefField && this.usergroup.description != ''){
            this.usergroup.users = [];
            for (let i = 0; i < this.user.length; i++) {
                this.usergroup.users[i] =this.user[i].id ;
            }
            this.usergroup.chief = this.chief.id;
             console.log(this.usergroup);
        }
    //     this.userGroupService.update(this.usergroup)
    //     .then(
    //         response => {
    //             this.alertService.success('Update Usergroup successful', true);
    //             this.router.navigate(['/user']);
    //         },
    //         error=> {
    //             this.alertService.error(error);
    //         }
    //     );
    }
}
