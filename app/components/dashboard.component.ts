import { Component, OnInit } from '@angular/core';
import { MENUS } from '../models/menu';

@Component({
  // moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'app//templates/dashboard.html',
  // styleUrls: [ 'dashboard.css' ]
})
export class DashboardComponent {
  menus = MENUS;
  menus1: any = [];
  menus2: any = [];
  menus3: any = [];
  today: number = Date.now();

  ngOnInit(): void {
    this.menus1[0] = this.menus[2];
    this.menus1[1] = this.menus[3];
    this.menus1[2] = this.menus[4];
    this.menus1[3] = this.menus[5];
    this.menus1[4] = this.menus[6];

    this.menus2 = this.menus[1].sub;
    this.menus3 = this.menus[7].sub;
  }
}
