import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserGroup, User, Users } from '../../models/index';
import { UserGroupService, UserService, AlertService } from '../../services/index';
// import { EqualValidator } from './equal-validator.directive';
import '../../rxjs-operators';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'edit-user-group',
  templateUrl: '/app/templates/edit-user-group.html',
})

export class EditUserGroupComponent implements OnInit { 
    @Input('group')
	usergroup: UserGroup;
    model: any = {};
    id: string;
    myForm: FormGroup;
    users: User[] = [];

    constructor(private router: Router,
    	private userGroupService: UserGroupService,
    	private userService: UserService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private route: ActivatedRoute,) {}

    ngOnInit(): void {
        this.myForm = this.formbuilder.group({
            description : ['', Validators.required],
            chief : ['', Validators.required],
            users: this.formbuilder.array([]),
        });
        let self = this; 
        this.userService.getUsers()
            .then(users => {
                self.users = users;
                console.log(users);
            });

        
        
        // if( this.id != null) {
        //     this.userService.getById(this.id).subscribe(user => {this.users = user;console.log(user);});
        // };
        // this.unitService.getAll("585b36585d3cc41224fe518a")
        //     .subscribe(unit => {
        //         self.unit = unit;
        //         console.log(unit);
        //     });
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        // this.getUsers();
        // this.userService.getUsers().then(users => this.users = users);
        // console.log(this.users);
        // this.addUser();
        
        if( this.id != null) {
            this.userGroupService.getUserGroup(this.id).then(usergroup => {this.usergroup = usergroup;console.log(usergroup);});
        };
        
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    // getUsers(): void {
    //    this.userService.getUsers().then(users => this.users = users);
    // }

    initUser() {
        return this.formbuilder.group({
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

    createUserGroup(model: any) {
        // call API to save
        // ...
        console.log(model);
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
         console.log(this.usergroup);
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
