import { Component, OnInit } from '@angular/core';
import { MENUS } from './mock-menu';
  
@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: '../templates/dashboard.html',
  // styleUrls: [ 'dashboard.css' ]
})
export class DashboardComponent implements OnInit {
  menus = MENUS;
  menus1: any;
 
  ngOnInit(): void {
    this.menus1[0] = this.menus[2];
    this.menus1[1] = this.menus[3];
    this.menus1[2] = this.menus[4];
    this.menus1[3] = this.menus[5];
    this.menus1[4] = this.menus[6];
  }
}


