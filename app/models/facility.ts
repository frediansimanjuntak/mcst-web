import { Development, User } from './index'

export class Facility {
  _id : string;
  name : string;
  development : Development;
  description : string;
  facility_type : string;
  payment_type : string;
  booking_type : string;
  maintaince_start : string;
  maintaince_end : string;
  schedule : [{
    day : string[],
    start_time : string,
    end_time : string
  }];
  status : string;
  created_by : User;
  created_at : string 
}