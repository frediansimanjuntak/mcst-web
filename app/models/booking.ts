import { Development, Facility, Payment, User, Property } from './index'

export class Booking {
  _id : string;
  reference_no : string; 
  development : Development;
  property : Property;
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