 import { Development, Attachment, User } from './index'

export class Payment {
  _id : string;
  serial_no : string;
  development : Development;
  property : string;
  payment_type : string;
  payment_method : string;
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

export var Payments: any[] = [
  {
    _id : "1",
    serial_no: "123213",
    development: "1",
    property: {
      _id : '1',
       address : {
        unit_no : '01',
        unit_no_2 : '10',
        block_no : '432434',
        street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
        postal_code : '213123',
        country : 'Indonesia',
        full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
       },
      status: "active",
      created_by: "1",
      created_at : "2016-12-08T03:31:07"
    },
    payment_type: "cash",
    sender: {
      _id: "2", 
      username: 'Mr. Juli', 
      email: 'lol@lol.com',
    },
    receiver: {
      _id: "100", 
      username: 'Admin', 
      email: 'admin@admin.com',
    },
    fees: [{
      deposit_fee: "80",
      booking_fee: "50",
      admin_fee: "20",
    }],
    total_amount: "150",
    remark: "yummy",
    status: "paid",
    created_by : "elic",
    created_at : "2016-12-08T03:31:07"
  },  {
    _id : "2",
    serial_no: "1221",
    development: "1",
    property: {
      _id : '2',
       address : {
        unit_no : '01',
        unit_no_2 : '11',
        block_no : '432434',
        street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
        postal_code : '213123',
        country : 'Indonesia',
        full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
       },
      status: "active",
      created_by: "1",
      created_at : "2016-12-08T03:31:07"
    },
    payment_type: "transfer",
    sender: {
      _id: "2", 
      username: 'Mr. Juli', 
      email: 'lol@lol.com',
    },
    receiver: {
      _id: "100", 
      username: 'Admin', 
      email: 'admin@admin.com',
    },
    fees: [{
      deposit_fee: "80",
      booking_fee: "50",
      admin_fee: "20",
    }],
    total_amount: "150",
    remark: "yummy",
    status: "paid",
    created_by : "elic",
    created_at : "2016-12-08T03:31:07"
  },  {
    _id : "3",
    serial_no: "2321",
    development: "1",
    property: {
      _id : '3',
       address : {
        unit_no : '01',
        unit_no_2 : '12',
        block_no : '432434',
        street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
        postal_code : '213123',
        country : 'Indonesia',
        full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
       },
      status: "active",
      created_by: "1",
      created_at : "2016-12-08T03:31:07"
    },
    payment_type: "cash",
    sender: {
      _id: "2", 
      username: 'Mr. Gunama', 
      email: 'lol@lol.com',
    },
    receiver: {
      _id: "100", 
      username: 'Admin', 
      email: 'admin@admin.com',
    },
    fees: [{
      deposit_fee: "50",
      booking_fee: "50",
      admin_fee: "20",
    }],
    total_amount: "120",
    remark: "yummy",
    status: "paid",
    created_by : "elic",
    created_at : "2016-12-08T03:31:07"
  },]