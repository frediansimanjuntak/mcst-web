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

export var Incidents: any[] = [{ 
  _id: '1',
  reference_no:'A1',
  development: '1',
  property:'mungkin itu',
  facility:'1',
  booking_type:'hourly',
  start_time: '09:00',
  end_time : '10:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh',
  created_at: '2017-10-01T03:00:00',
},{ 
  _id: '2',
  reference_no:'A2',
  development: '1',
  property:'mungkin itu',
  facility:'1',
  booking_type:'daily',
  start_time: '19:00',
  end_time : '20:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '2',
  reference_no:'A2',
  development: '1',
  property:'mungkin itu',
  facility:'1',
  booking_type:'daily',
  start_time: '19:00',
  end_time : '20:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh',
  created_at: 'mungkin aja',
}]