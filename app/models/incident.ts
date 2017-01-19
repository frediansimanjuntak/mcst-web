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
  starred_by : User[];
  archive : boolean;
  created_by : User;
  updated_at : string;
  created_at : string; 
}

export var Incidents: any[] = [{ 
  _id: '1',
  reference_no:'1',
  title:'rumah rusak',
  development: '',
  property : {
      _id: "1", 
      address : {
          unit_no : '01',
          unit_no_2 : '10',
      }
    },
  incident_type:'general',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  archive: true,
  starred_by: '1',
  created_by: 'akh siaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaal',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '2',
  reference_no:'12',
  title:'tangga rusak',
  development: '',
  property : {
      _id: "2", 
      address : {
          unit_no : '01',
          unit_no_2 : '11',
      }
    },
  incident_type:'general',
  contract: 'asd',
  remark: 'tolong di perbaiki dong',
  status: 'reviewing',
  archive: true,
  starred_by: '2',
  created_by: 'akh sial',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '3',
  reference_no:'123',
  title:'lift rusak',
  development: '',
  property : {
      _id: "3", 
      address : {
          unit_no : '01',
          unit_no_2 : '12',
      }
    },
  incident_type:'general',
  contract: '',
  remark: 'tolong di perbaiki dong',
  status: 'inprogress',
  archive: false,
  starred_by: '1',
  created_by: 'akh sial',
  updated_at: 'tidak mungkin',
  created_at: 'mungkin aja',
},{ 
  _id: '4',
  reference_no:'1234',
  title:'jendela pecah',
  development: '',
  property : {
      _id: "4", 
      address : {
          unit_no : '01',
          unit_no_2 : '13',
      }
    },
  incident_type:'general',
  contract: '',
  archive: false,
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
  property : {
      _id: "5", 
      address : {
          unit_no : '01',
          unit_no_2 : '14',
      }
    },
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