import { Development, Facility, Payment, User } from './index'

export class Booking {
  _id : string;
  reference_no : string; 
  development : Development;
  property : string;
  facility : string;
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
  facility:{
    _id : '1',
    name : 'BBQ',
    development : '1',
    description : 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
    facility_type : 'a',
    payment_type : 'cash',
    booking_type : 'hourly',
    maintenance_start : '',
    maintenance_end : '',
    schedule : [{
      day: 'monday',
      start_time: '08:00',
      end_time: '18:00',
    },{
      day: 'saturday',
      start_time: '10:00',
      end_time: '17:00',
    },{
      day: 'sunday',
      start_time: '10:00',
      end_time: '16:00',
    }],
    status : 'available',
    created_by : '',
    created_at : '',
  },
  booking_type:'hourly',
  booking_date: '2017-01-10',
  start_time: '09:00',
  end_time : '10:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'paid',
  created_by: 'akh',
  created_at: '2017-01-10T03:00:00',
},{ 
  _id: '2',
  reference_no:'A2',
  development: '1',
  property:'mungkin itu ga',
  facility:'1',
  booking_type:'daily',
  booking_date: '2017-01-10',
  start_time: '19:00',
  end_time : '20:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'unpaid',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '3',
  reference_no:'A3',
  development: '1',
  property:'mungkin itu yah',
  facility:'1',
  booking_type:'daily',
  booking_date: '2017-01-10',
  start_time: '19:00',
  end_time : '20:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'unpaid',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '4',
  reference_no:'A2',
  development: '2',
  property:'mungkin itu ga',
  facility:'1',
  booking_type:'daily',
  booking_date: '2017-01-10',
  start_time: '18:00',
  end_time : '21:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'unpaid',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '5',
  reference_no:'A3',
  development: '1',
  property:'mungkin itu yah',
  facility:'2',
  booking_type:'daily',
  booking_date: '2017-01-10',
  start_time: '19:00',
  end_time : '21:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'unpaid',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '6',
  reference_no:'A2',
  development: '2',
  property:'mungkin itu ga',
  facility:'1',
  booking_type:'daily',
  booking_date: '2017-01-10',
  start_time: '18:00',
  end_time : '21:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'paid',
  created_by: 'akh',
  created_at: 'mungkin aja',
},{ 
  _id: '7',
  reference_no:'A3',
  development: '1',
  property:'mungkin itu yah',
  facility:'2',
  booking_type:'daily',
  booking_date: '2017-01-10',
  start_time: '19:00',
  end_time : '21:00',
  payment : '1',
  remark: 'tolong di perbaiki dong',
  status: 'paid',
  created_by: 'akh',
  created_at: 'mungkin aja',
}]