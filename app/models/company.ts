import { User, Attachment } from './index';

export class Company {
  _id : string;
  name : string;
  registration_no : string;
  category : string;
  phone : string;
  email : string;
  address : {
    street_name : string,
    block_no : string,
    postal_code : string,
    country : string,
    coordinates : string[], /*optional, if want let company track their position*/
    type : string,
    full_address : string
  };
  description : string;
  company_logo : Attachment[]; /*choosen first index*/
  chief : User;
  employee : User[];
  active : true;
  created_by : User;
  created_at : string
}