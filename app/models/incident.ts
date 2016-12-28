import { Development, Attachment, Contract, User } from './index'

export class Incident {
  _id : string;
  reference_no : string;
  title : string;
  development : Development;
  property : string;
  incident_type : string;
  // landlord_acceptance : string;
  attachment : Attachment[];
  contract : Contract;
  remark : string;
  status : string;
  created_by : User;
  updated_at : string;
  created_at : string; 
}

export var Incidents: any[] = [{ 
  _id: '1',
  reference_no:'1',
  title:'rumah rusak',
  development: '',
  property:'mungkin itu',
  incident_type:'general',
  attachment: '',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh siaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaal',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '2',
  reference_no:'12',
  title:'tangga rusak',
  development: '',
  property:'mungkin itu',
  incident_type:'general',
  attachment: '',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'reviewing',
  created_by: 'akh sial',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '3',
  reference_no:'123',
  title:'lift rusak',
  development: '',
  property:'mungkin itu',
  incident_type:'general',
  attachment: '',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'inprogress',
  created_by: 'akh sial',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '4',
  reference_no:'1234',
  title:'jendela pecah',
  development: '',
  property:'mungkin itu',
  incident_type:'general',
  attachment: '',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'resolved',
  created_by: 'akh sial',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '5',
  reference_no:'12345',
  title:'toilet rusak',
  development: '',
  property:'mungkin itu',
  incident_type:'general',
  attachment: '',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'urgent',
  created_by: 'akh sial',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},
];