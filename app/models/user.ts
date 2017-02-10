import { Development, UserGroup, Attachment } from './index';

export class User {
  _id : string;
  username : string;
  email : string;
  password : string;
  phone : string;
  role : string;
  default_property : {
    development : Development;
    property : string;
    role : string
  };
  details : {
    first_name : string,
    last_name : string,
    identification_type : string,
    identification_no : string,
    identification_proof : {
      front : Attachment,
      back : Attachment
    }
  };
  rented_property : [
    {
      development : Development,
      property : string,
    }
  ];
  owned_property : [
    {
      development : Development,
      property : string
    }
  ];
  authorized_property : [
    {
      development : Development,
      property : string
    }
  ];
  active : boolean;
  default_development : Development;
  authorized_development : string[];
  user_group : UserGroup; /*one or many?*/
  created_at : string;
}

export var Users: any[] = [
  {_id: "1", username: 'Mr. Nice', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , role:'user' , 
  default_property:{development:'1',property:'2',role:''},details:{first_name:'asd' , last_name:'asd',identification_type:'passport',identification_no:'asd',
  identification_proof:{front:'', back:''}},rented_property:{development:'1',property:'1'},owned_property:[{development:'1',property:'2'},{development:'1',property:'3'}],
  authorized_property:[{development:'1',property:'2'},{development:'1',property:'3'}],active:'',default_development:'1',authorized_development:'',user_group:'',created_at:''},
  {_id: "2", username: 'Mr. Juli', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "3", username: 'Mr. jola', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "4", username: 'Mrs. jolaa', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "5", username: 'Mr. dasd', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' ,}, 
  {_id: "6", username: 'Mr. Nhtrhr',email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "7", username: 'Mr. dasdas',email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "8", username: 'Mr. dadg',email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "9", username: 'Mr. Wayuik',email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "10", username: 'Mr. tryr',email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , },
  {_id: "11", username: 'Mr. hjmjh', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' ,},
  {_id: "12", username: 'Mr. ryrt', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' ,},
  {_id: "13", username: 'Mr. wtw', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' ,},
  {_id: "14", username: 'Mr. rwerw', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' ,},
  {_id: "15", username: 'Mr. nvvbnn', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' ,}
];
    
