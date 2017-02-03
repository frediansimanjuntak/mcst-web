import { User } from './index';

export class Notification {
  _id : string;
  user : string;
  type : string;
  message : string;
  ref : string;
  ref_id: string;
  created_by : User;
  read_at : string;
  created_at : string;
}

export var Notifications: any[] = [
  {
    _id : '1',
    user : '1',
    type : '1',
    message : 'Project from Mr B',
    ref: 'aasdsadafasf',
    created_by: '2',
    read_at : '',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '2',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '2',
    read_at : '',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '3',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '2',
    read_at : '2017-01-04T03:31:07',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '4',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '2',
    read_at : '2017-01-04T03:31:07',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '5',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '2',
    read_at : '2017-01-04T03:31:07',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '6',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '2',
    read_at : '2017-01-04T03:31:07',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '7',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '2',
    read_at : '',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '8',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '',
    read_at : '',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '9',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '',
    read_at : '',
    created_at : '2017-01-04T03:31:07'
  },
  {
    _id : '10',
    user : '1',
    type : '1',
    message : 'Request from MR A',
    ref: '',
    created_by: '',
    read_at : '',
    created_at : '2017-01-04T03:31:07'
  },
]