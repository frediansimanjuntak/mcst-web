import { Development, User } from './index'

export class Facility {
  _id : string;
  name : string;
  development : Development;
  description : string;
  payment_type : string;
  booking_type : string;
  booking_fee : string;
  maintenance:[{
    start_date : string,
    end_date :string
  }];
  schedule : [{
    day : string[],
    start_time : string,
    end_time : string
  }];
  status : string;
  created_by : User;
  created_at : string 
}

export var Facilities: any[] = [
  {
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
  {
    _id : '2',
    name : 'Tennis',
    description : 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
    facility_type : 'a',
    payment_type : 'cash',
    booking_type : 'A',
    schedule : [{
      day: 'monday',
      start_time: '08:00',
      end_time: '18:00',
    },{
      day: 'saturday',
      start_time: '10:00',
      end_time: '17:00',
    }],
    status : 'available'
  },
  {
    _id : '3',
    name : 'pool',
    description : 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
    facility_type : 'a',
    payment_type : 'cash',
    booking_type : 'A',
    schedule : [{
      day: 'thursday',
      start_time: '08:00',
      end_time: '18:00',
    },{
      day: 'friday',
      start_time: '10:00',
      end_time: '17:00',
    }],
    status : 'available'
  },
  {
    _id : '4',
    name : 'football field',
    description : 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
    facility_type : 'a',
    payment_type : 'cash',
    booking_type : 'daily',
    schedule : [{
      day: 'wednesday',
      start_time: '08:00',
      end_time: '18:00',
    },{
      day: 'sunday',
      start_time: '10:00',
      end_time: '17:00',
    }],
    status : 'available'
  },
  {
    _id : '5',
    name : 'boxing',
    description : 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
    facility_type : 'a',
    payment_type : 'cash',
    booking_type : 'daily',
    schedule : [{
      day: ['monday','tuesday','wednesday','thursday'],
      start_time: '08.00',
      end_time: '18.00',
    },{
      day: ['friday','saturday'],
      start_time: '10.00',
      end_time: '17.00',
    },{
      day: ['sunday'],
      start_time: '10.00',
      end_time: '16.00',
    }],
    status : 'available'
  },
];