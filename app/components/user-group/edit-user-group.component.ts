import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router'; 
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserGroup, User } from '../../models/index';
import { UserGroupService, UserService, AlertService } from '../../services/index';
import '../../rxjs-operators';

@Component({
  moduleId: module.id,
  selector: 'edit-user-group',
  template: '/app/templates/edit-user-group.html',
})

export class EditUserGroupComponent implements OnInit { 
	userGroup: UserGroup;
    model: any = {};
    id: string;
    myForm: FormGroup;
    users: User;

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
        this.userService.getAll()
            .subscribe(user => {
                self.users = user;
                console.log(user);
            });

        
        
        if( this.id != null) {
            this.userService.getById(this.id).subscribe(user => {this.users = user;console.log(user);});
        };
        
        this.addUser();
        
        // this.developmentService.getAll().subscribe(developments => { this.developments = developments; });
    }

    initUser() {
        return this.formbuilder.group({});
    }

    addUser() {
        const control = <FormArray>this.myForm.controls['users'];
        const addrCtrl = this.initUser();
        
        control.push(addrCtrl);
        
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeUser(i: number) {
        const control = <FormArray>this.myForm.controls['users'];
        control.removeAt(i);
    }

    save(model: any) {
        // call API to save
        // ...
        console.log(model);
    }
}
