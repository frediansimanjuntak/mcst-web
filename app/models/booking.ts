import { Development, Facility, Payment, User } from './index'

export class Booking {
  _id : string;
  reference_no : string; 
  development : Development;
  property : string;
  facility : Facility;
  booking_type :string;
  start_time : string;
  end_time : string;
  payment : Payment;
  remark : string;
  status : string;
  created_by : User;
  created_at : string;
}