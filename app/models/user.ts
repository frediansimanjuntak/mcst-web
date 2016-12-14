import { Development, Property, UserGroup } from './index';

export class User {
  _id : string;
  username : string;
  email : string;
  password : string;
  phone : string;
  role : string;
  default_property : {
    development : Development,
    property : Property,
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
      property : Property,
    }
  ];
  owned_property : [
    {
      development : Development,
      property : Property
    }
  ];
  authorized_property : [
    {
      development : Development,
      property : Property
    }
  ];
  active : true;
  default_development : Development;
  authorized_development : Development[];
  user_group : UserGroup; /*one or many?*/
  created_at : string;
}
    