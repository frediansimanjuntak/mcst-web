import { Component } from '@angular/core';


const MENUS: any[] = [
  { 
  	name: 'Dashboard',
  	link: '/dashbard' 
  },
  { 
  	name: 'Operations',
  	link: '',
  	sub : [
  		{ name: 'Guest, Visitor & Contractors', link: '' },
  		{ name: 'Incident Reports', link: '' },
  		{ name: 'Manage Orders', link: '' },
  		{ name: 'Manage Project', link: '' },
  	]
  },
  { 
  	name: 'Manage Request', 
  	link: '',
  	sub : [
  		{ name : 'Browse Request', link: ''},
  		{ name : 'Add Request', link: ''},
  		{ name : 'Search Reference,no', link: ''}
  	]
  },
  { 
  	name: 'Facilities Booking', 
  	link: '' 
  },
  { 
  	name: 'Payment System', 
  	link: '' 
  },
  { 
  	name: 'Resident Database',
  	link: '',
  	sub : [
  		{ name : 'Browse Database', link: '' },
  		{ name : 'Add Resident', link: '' },
  		{ name : 'Manage Access control', link: '' }
  	]
  },
  { 
  	name: 'Manage Community',
  	link: '',
  	sub : [
  		{ name : 'Manage Announcement', link: '' },
  		{ name : 'E-voting', link: '' },
  		{ name : 'Manage Feedbacks', link: '' },
  		{ name : 'Lost & Found', link: '' },
  	]
  },
  { 
  	name: 'Useful Information', 
  	link: '',
  	sub : [
  		{ name : 'AGM & Circular', link: '' },
  		{ name : 'Contact Directory', link: '' },
  	]
  },
];

@Component({
	moduleId: module.id,
	selector: 'navbar',
	templateUrl: '../templates/navbar.html',
	styleUrls: [ '../templates/styles/navbar.css' ]
})

export class NavbarComponent {
	menus = MENUS;
}