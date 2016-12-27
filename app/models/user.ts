import { Development, UserGroup } from './index';

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
      front : string,
      back : string
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
  active : string;
  default_development : string;
  authorized_development : string[];
  user_group : UserGroup; /*one or many?*/
  created_at : string;
}

export var Users: any[] = [
  {_id: "1", username: 'Mr. Nice', email: 'lol@lol.com' , password:'uvuvwevwevwe' , phone:'080808' , role:'user' , 
  default_property:{development:'',property:'',role:''},details:{first_name:'asd' , last_name:'asd',identification_type:'passport',identification_no:'asd',
  identification_proof:{front:'', back:''}},rented_property:{development:'',property:''},owned_property:{development:'',property:''},
  authorized_property:{development:'',property:''},active:'',default_development:'',authorized_development:'',user_group:'',created_at:''},
  {_id: "2", username: 'Mr. Juli', },
  {_id: "3", username: 'Mr. jola', },
  {_id: "4", username: 'Mrs. jolaa', },
  {_id: "5", username: 'Mr. dasd', }, 
  {_id: "6", username: 'Mr. Nhtrhr', },
  {_id: "7", username: 'Mr. dasdas', },
  {_id: "8", username: 'Mr. dadg', },
  {_id: "9", username: 'Mr. Nice', },
  {_id: "10", username: 'Mr. tryr', },
  {_id: "11", username: 'Mr. hjmjh', },
  {_id: "12", username: 'Mr. ryrt', },
  {_id: "13", username: 'Mr. wtw', },
  {_id: "14", username: 'Mr. rwerw', },
  {_id: "15", username: 'Mr. nvvbnn', }
];
    
