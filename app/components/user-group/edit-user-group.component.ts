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

    constructor(private router: Router,
    	private userGroupService: UserGroupService,
    	private userService: UserService,
    	private alertService: AlertService,
    	private formbuilder: FormBuilder,
        private route: ActivatedRoute,) {}


}
