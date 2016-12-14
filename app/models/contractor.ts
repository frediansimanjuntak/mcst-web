import { User, Company } from './index';

export class Contractor {
  _id : string;
  username : string;
  password : string;
  phone : string;
  email : string;
  address : {
    street_name : string,
    block_no : string,
    postal_code : string,
    country : string,
    full_address : string
  };
  profile_picture : string;
  description : string;
  company : Company;
  position : string; /*just information*/
  role : string;
  active : string;
  created_by : User;
  created_at : string
}