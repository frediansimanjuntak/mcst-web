export const MENUS: any[] = [
  {
  	name: 'Dashboard',
  	link: '/dashboard'
  },
  {
  	name: 'Operations',
  	sub : [
  		{ 
        name: 'Guest, Visitor & Contractors', 
        link: '/visit', 
        description: 'View List of expecting guest, visitors and contractors in the compound',
        img: '../../assets/image/menu_guestvisitor.png'  
      },
  		{  
        name: 'Incident Reports', 
        link: '/incident', 
        description: 'Manage Incident Reports',
        img: '../../assets/image/menu_incidentreport.png' 
      }, 
  		{ 
        name: 'Manage Project', 
        link: '/contract', 
        img: '../../assets/image/menu_manageproject.png',
        description: 'Create & Update project status',
      },
  	]
  },
  {
  	name: 'Manage Request',
    description: 'Track request for permits such as renovation, move-in, move-out and bulk delivery',
    img: '../../assets/image/menu_request.png', 
  	sub : [
  		{ name : 'Browse Request', link: '/petition'},
  		{ name : 'Add Request', link: '/petition/add', img: '../../assets/image/icon_add.png' },
  		// { name : 'Search Reference.no', link: '', img: '../../assets/image/icon_search.png'}
  	]
  },
  { 
  	name: 'Facilities Booking', 
  	link: '/booking',
    description: 'Manage booking of facilities',
    img: '../../assets/image/menu_booking.png' 
  },
  { 
  	name: 'Payment',
    description: 'Manage monthly MCST, deposits and other payments', 
    img: '../../assets/image/menu_payment.png',
    sub : [
      { name : 'Payment Reminder', link: '/payment_reminder'}, 
      { name : 'Payment System', link: '/payment_system'}, 
    ]
  },
  {
  	name: 'Resident Database',
    description: 'Track issuance of access cards, car decal, transponder',
    img: '../../assets/image/menu_residentdatabase.png' ,
  	sub : [
  		{ name : 'Browse Database', link :'/unit' },
  		{ name : 'Add Unit', link: '/unit/add' },
  		// { name : 'Manage Access control', link: '/access_control' }
  	]
  },
  {
  	name: 'Manage Community',
    description: 'Manage event and announcement, E-voting and feedback',
    img: '../../assets/image/menu_community.png' ,
  	sub : [
  		{ name : 'Manage Announcement', link: '/announcement' , img: '../../assets/image/icon_announcement.png'},
  		{ name : 'E-voting', link: '/poll' },
  		{ name : 'Manage Feedback', link: '/feedback', img: '../../assets/image/icon_feedbacks.png' },
  		{ name : 'Lost & Found', link: '/lost_found', img: '../../assets/image/icon_lost&found.png' },
  	]
  },
  {
  	name: 'Useful Information',
  	sub : [
  		{ 
        name : 'AGM & Circular', 
        link: '/newsletter' , 
        img: '../../assets/image/menu_agmegm.png',
        description: 'Current and previous AGM/EGM and circular',
      },
  		{ 
        name : 'Contact Directory', 
        link: '/contact', 
        img: '../../assets/image/menu_contact.png',
        description: 'Useful and often used contact numbers',
      },
      { name : 'User', link: '/user' },
      { name : 'User Group', link: '/user_group' },
      { name : 'Development', link: '/development' },
      { name : 'Facility', link: '/facility' },
      // { name : 'Company', link: '/company' },
      // { name : 'Contractor', link: '/contractor' },
      // { name : 'Test', link: '/test' },
    ]
  },
];
