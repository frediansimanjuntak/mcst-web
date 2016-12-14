 import { Development, Property, Attachment, User } from './index'

export class Payment {
  _id : string;
  serial_no : string;
  development : Development;
  property : Property;
  payment_type : string;
  payment_proof : Attachment[];/*link to attachment*/
  sender : User;
  receiver : User;
  fees : [
    { deposit_fee : string, status : string },
    { booking_fee : string, status : string },
    { admin_fee : string, status : string }
  ];
  total_amount : string;
  remark : string;
  status : string;
  created_by : User;
  created_at : string
}