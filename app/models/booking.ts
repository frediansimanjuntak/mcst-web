import { Development, Facility, Payment, User } from './index'

export class Booking {
  _id : string;
  reference_no : string; 
  development : Development;
  property : string;
  facility : Facility;
  booking_type :string;
  booking_date : string;
  start_time : string;
  end_time : string;
  payment : Payment;
  remark : string;
  status : string;
  created_by : User;
  created_at : string;
}

export var Bookings: any[] = [{ 
  _id: '1',
  reference_no:'A1',
  development: '1',
  property:'mungkin itu',
  facility:'1',
  booking_type:'hourly',
  booking_date: '2017-01-10',
  start_time: '09:00',
  end_time : '10:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh',
  created_at: '2017-01-10T03:00:00',
},{ 
  _id: '2',
  reference_no:'A2',
  development: '1',
  property:'mungkin itu ga',
  facility:'1',
  booking_type:'daily',
  booking_date: '2017-01-11',
  start_time: '19:00',
  end_time : '20:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '3',
  reference_no:'A3',
  development: '1',
  property:'mungkin itu yah',
  facility:'1',
  booking_type:'daily',
  booking_date: '2017-01-13',
  start_time: '19:00',
  end_time : '20:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'new',
  created_by: 'akh',
  created_at: 'mungkin aja',
}]