import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessControl } from '../../models/index';
import { AccessControlService, AlertService } from '../../services/index';
import '../../rxjs-operators';
import { Observable} from 'rxjs/Observable';


@Component({
  // moduleId: module.id,
  selector: 'development',
  templateUrl: 'app/templates/access-control.html',
})

export class AccessControlComponent implements OnInit {
	accesscontrol: AccessControl;
    accesscontrols: AccessControl[] = [];
    model: any = {};
    public card;
    public transponder;

    constructor(private router: Router,private accesscontrolService: AccessControlService,private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllAccessControls();
        // this.onChangeTable(this.config);

    }

    deleteAccessControl(accesscontrol: AccessControl) {
        console.log(accesscontrol)
        this.accesscontrolService.delete(accesscontrol._id)
        // .subscribe(() => { this.loadAllUsers() });
        .then(
			response => {
				if(response) {
	                alert(`The access control could not be deleted, server Error.`);
	            } else {
                    this.alertService.success('Delete access control successful', true);
	                this.loadAllAccessControls()
	            }
            },
            error=> {
                alert(`The access control could not be deleted, server Error.`);
            }
        );
    }

    private loadAllAccessControls() {
        this.accesscontrolService.getAccessControls()
        .then(accesscontrols => {
            this.accesscontrols = accesscontrols;
            this.card           = this.accesscontrols.filter(accesscontrols => accesscontrols.access_type === 'card' );
            this.transponder    = this.accesscontrols.filter(accesscontrols => accesscontrols.access_type === 'transponder' );
            });
    }

    add(){
        this.router.navigate(['/access_control/add']);
    }

    edit(accesscontrol: AccessControl){
        this.router.navigate(['/access_control/edit', accesscontrol._id]);
    }
}
