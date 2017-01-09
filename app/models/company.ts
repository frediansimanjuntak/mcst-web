import { User, Attachment } from './index';

export class Company {
  _id : string;
  name : string;
  registration_no : string;
  category : string;
  phone : string;
  email : string;
  address : {
    street_name : string,
    block_no : string,
    postal_code : string,
    country : string,
    coordinates : string[], /*optional, if want let company track their position*/
    type : string,
    full_address : string
  };
  description : string;
  company_logo : Attachment[]; /*choosen first index*/
  chief : User;
  employee : User[];
  active : true;
  created_by : User;
  created_at : string
}

export var Companies: any[] = [
  {
    _id : "1",
    name: "NaX5P5gG4aefadXN34fde3",
    registration_no: "NMe3DAea343c34fde3",
    category: "pipe",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "street l  mfldskl dsm kl sm kls ",
      block_no: "23432",
      postal_code: "2342",
      country: "SIngapore",
      coordinates: [-1393.313, 0.3293933], 
      type: "Point",
      full_address: "lorem ipsum dolor sit atmet"
    },
    description: "Wohohooooo iam the company",
    company_logo: ["NaX5P48b32d34fde3"], 
    chief: "2",
    employee: ["4", "1", "3"],
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "2",
    name: "NaX5P5gG4aefadXN34fde3",
    registration_no: "NMe3DAea343c34fde3",
    category: "pipe",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "kdlsad o jaso iasj isaoj aoji ",
      block_no: "31231",
      postal_code: "12312",
      country: "Singapore",
      coordinates: [-1393.313, 0.3293933], 
      type: "Point",
      full_address: "Lorem lorem lorem ipum k lsdaasd"
    },
    description: "Wohohooooo iam the company",
    company_logo: ["NaX5P48b32d34fde3"], 
    chief: "1",
    employee: ["5", "4", "8"],
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
   _id : "3",
    name: "NaX5P5gG4aefadXN34fde3",
    registration_no: "NMe3DAea343c34fde3",
    category: "pipe",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "kadasodkan k dnsk anka a",
      block_no: "67866",
      postal_code: "413432",
      country: "Maaysia",
      coordinates: [-1393.313, 0.3293933], 
      type: "Point",
      full_address: "Lppoewq  kqwok w qopk kqpo kpokpokpqwe  po oqkw kqokpqk "
    },
    description: "Wohohooooo iam the company",
    company_logo: ["NaX5P48b32d34fde3"], 
    chief: "9",
    employee: ["1", "2", "5"],
    active: false,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
   _id : "4",
    name: "NaX5P5gG4aefadXN34fde3",
    registration_no: "NMe3DAea343c34fde3",
    category: "pipe",
    phone: "NaX5P48b32d34fde3",
    email: 4500,
    address: {
      street_name: "kadasod jkajldjsalkj alk jlkaj klj alkj akj klj",
      block_no: "67313145",
      postal_code: "1122",
      country: "Singapore",
      coordinates: [-1393.313, 0.3293933], 
      type: "Point",
      full_address: "Hudalidnakn kn saln klan lna  "
    },
    description: "Wohohooooo iam the company",
    company_logo: ["NaX5P48b32d34fde3"], 
    chief: "2",
    employee: ["6", "7", "8"],
    active: true,
    created_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  }
]