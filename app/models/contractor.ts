import { User, Company } from './index';

export class Contractor {
  _id : string;
  username : string;
  password : string;
  phone : string;
  email : string;
  address : {
    street_name : string,
    block_no : string,
    postal_code : string,
    country : string,
    full_address : string
  };
  profile_picture : string;
  description : string;
  company : Company;
  position : string; /*just information*/
  role : string;
  active : boolean;
  created_by : User;
  created_at : string
}

export var Contractors: any[] = [
  {
    _id : "1",
    username: "Toh poh",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Jalan jalan street way road 29120",
      block_no: "232123",
      postal_code: "12312",
      country: "Singapore",
      full_address: "Lorem ipsum dolor sit atmet"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "1",
    position: "security",
    role: "admin",
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "2",
    username: "Abcdefg",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Lorem i[sum dolr sit amet",
      block_no: "232134",
      postal_code: "200012",
      country: "Singapore",
      full_address: "Lorem ipsum dolor sit atmet"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "1",
    position: "security",
    role: "employee",
    active: false,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "3",
    username: "Iopadkas",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Orchard road 0092",
      block_no: "312234",
      postal_code: "865464",
      country: "Singapore",
      full_address: "Nksalsadk l lkk alkad"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "4",
    position: "security",
    role: "admin",
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "4",
    username: "Hooq",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Angular 2",
      block_no: "232123",
      postal_code: "12312",
      country: "Singapore",
      full_address: "Lorem ipsum dolor sit atmet"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "4",
    position: "security",
    role: "employee",
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "5",
    username: "Deeeweqw",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Angular 2",
      block_no: "232123",
      postal_code: "12312",
      country: "Singapore",
      full_address: "Lorem ipsum dolor sit atmet"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "",
    position: "security",
    role: "",
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "6",
    username: "sfsdfds",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Angular 2",
      block_no: "232123",
      postal_code: "12312",
      country: "Singapore",
      full_address: "Lorem ipsum dolor sit atmet"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "4",
    position: "security",
    role: "admin",
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "7",
    username: "jfj",
    password: "NMe3DAea343c34fde3",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "Angular 2",
      block_no: "232123",
      postal_code: "12312",
      country: "Singapore",
      full_address: "Lorem ipsum dolor sit atmet"
    },
    profile_picture: "NaX5P48b32d34fde3",
    description: "Wohohooooo iam the contractor",
    company: "4",
    position: "security",
    role: "employee",
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  }

]