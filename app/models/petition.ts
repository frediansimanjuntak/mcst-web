import { User, Development, Attachment, Contract } from './index';

export class Petition {
  _id : string;
  reference_no : string;
  development : string;
  property : string;
  petition_type : string;
  attachment : Attachment[];
  contract : Contract;
  remark : string;
  status : string;
  created_by : User;
  updated_at : string;
  archieved  : boolean;
  created_at : string
}


export var Petitions: any[] = [
  {
    _id : '1',
    reference_no: '3498',
    development: '585b36585d3cc41224fe518a',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'pending',
    created_by : '1',
    updated_at : '2016-12-08T03:31:07',
    archieved : false,
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '2',
    reference_no: '124',
    development: '585b36585d3cc41224fe518a',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'repair',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'pending',
    created_by : '4',
    archieved : false,
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '3',
    reference_no: '12321',
    development: '585b36585d3cc41224fe518a',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'repair',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'approved',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '4',
    reference_no: '64213',
    development: '585b36585d3cc41224fe518a',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'approved',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '5',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'pending',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '6',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'repair',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'pending',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '7',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'repair',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'progress',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '8',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'pending',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '9',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'approved',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '10',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'progress',
    archieved : false,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
  {
    _id : '11',
    reference_no: '7898',
    development: 'NaX5P5gG4aefadXN34fde3',
    property: 'NMe3DAea343c34fde3',
    petition_type: 'maintenance',
    attachment: ['NaX5P48b32d34fde3', 'NaX5P48b32d34fde3331'],
    contract: 'NP5gGdzh8bgyXN34fde3',
    remark: 'Wohohooooo',
    status: 'progress',
    archieved : true,
    created_by : 'w0974u0a4443feaakfef24t',
    updated_at : '2016-12-08T03:31:07',
    created_at : '2016-12-08T03:31:07'
  },
]
