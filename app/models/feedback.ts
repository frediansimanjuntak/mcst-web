import { User, Development } from './index'

export class Feedback {
  _id  : string;
  developement : Development;
  property : string;
  title : string;
  feedback_type : string;
  feedback_reply : string;
  feedback_privacy : string;
  archive : boolean;
  remark : string;
  status : string;
  reply_at : string;
  created_at : string;
  created_by : User;
}

export var Feedbacks: any[] = [
  {
    _id : '1',
    title : 'Title of feedback',
    developement : '1',
    property : {
      _id: "1", 
      address : {
          unit_no : '02',
          unit_no_2 : '11',
      }
    },
    feedback_type : 'General',
    feedback_privacy : 'Public',
    archive : false,
    remark : 'oh yeah',
    status : 'published',
    created_by : {
      _id: "1", 
      username: 'Mr. Good', 
      email: 'lol@lol.com',
    },
    created_at : '2017/01/02'
  },{
    _id : '2',
    title : 'Title of feedback 2',
    developement : '1',
    property : {
      _id: "2", 
      address : {
          unit_no : '02',
          unit_no_2 : '12',
      }
    },
    feedback_type : 'Complain',
    feedback_privacy : 'Private',
    archive : false,
    remark : 'oh yeah oh yeah',
    status : 'publish',
    created_by : {
      _id: "2", 
      username: 'Mr. Bad', 
      email: 'lol@lol.com',
    },
    created_at : '2017/01/02'
  },{
    _id : '3',
    title : 'Title of feedback 3',
    developement : '1',
    property : {
      _id: "3", 
      address : {
          unit_no : '02',
          unit_no_2 : '13',
      }
    },
    feedback_type : 'Lost & Found',
    feedback_privacy : 'General',
    archive : false,
    remark : 'oh yeah oh yeah',
    status : 'unpublish',
    created_by : {
      _id: "3", 
      username: 'Mr. Soso', 
      email: 'lol@lol.com',
    },
    created_at : '2017/01/02'
}]