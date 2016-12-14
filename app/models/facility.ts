import { Development, User } from './index'

export class Facility {
  _id : string;
  name : string;
  development : Development;
  description : string;
  facility_type : string;
  payment_type : string;
  booking_type : string;
  schedule : {
    /*wow*/
  };
  created_by : User;
  created_at : string 
}