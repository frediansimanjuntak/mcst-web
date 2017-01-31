export const MENUS: any[] = [
  { 
  	name: 'Dashboard',
  	link: '/dashboard' 
  },
  { 
  	name: 'Operations',
  	sub : [
  		{ name: 'Guest, Visitor & Contractors', link: '/visit'  },
  		{ name: 'Incident Reports', link: '/incident' },
  		{ name: 'Manage Project', link: '/contract' },
  	]
  },
  { 
  	name: 'Manage Request', 
    description: 'Track request for permits such as renovation, move-in, move-out and bulk delivery',
  	sub : [
  		{ name : 'Browse Request', link: '/petition'},
  		{ name : 'Add Request', link: '/petition/add'},
  		{ name : 'Search Reference.no', link: ''}
  	]
  },
  { 
  	name: 'Facilities Booking', 
  	link: '/booking',
    description: 'Manage booking of facilities', 
  },
  { 
  	name: 'Payment System', 
  	link: '/payment_system',
    description: 'Manage monthly MCST, deposits and other payments', 
  },
  { 
  	name: 'Resident Database',
    description: 'Track issuance of access cards, car decal, transponder',
  	sub : [
  		{ name : 'Browse Database', link :'/unit' },
  		{ name : 'Add Resident', link: '/unit/add' },
  		{ name : 'Manage Access control', link: '/access_control' }
  	]
  },
  { 
  	name: 'Manage Community',
    description: 'Manage event and announcement, E-voting and feedback',
  	sub : [
  		{ name : 'Manage Announcement', link: '/announcement' },
  		{ name : 'E-voting', link: '/poll' },
  		{ name : 'Manage Feedbacks', link: '/feedback' },
  		{ name : 'Lost & Found', link: '/lost_found' },
  	]
  },
  { 
  	name: 'Useful Information', 
  	sub : [
  		{ name : 'AGM & Circular', link: '/newsletter' },
  		{ name : 'Contact Directory', link: '' },
      { name : 'User', link: '/user' },
      { name : 'User Group', link: '/user_group' },
      { name : 'Development', link: '/development' },
      { name : 'Facility', link: '/facility' },
      { name : 'Company', link: '/company' },
      { name : 'Contractor', link: '/contractor' },
      { name : 'Payment', link: '/payment' },
      { name : 'Test', link: '/test' },
    ]
  },
];