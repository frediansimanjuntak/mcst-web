import { User, Development } from './index';

export class Poll {
   _id : string;
  title : string;
  description : string;
  poll_type : string;
  development : Development;
  votes : [
    {
      property : string,
      answer : string,
      voted_by : User,
      voted_at : string,
    }
  ];
  choices : string[];
  outcome : string;
  start_time : string;
  end_time : string;
  status : string;
  created_by : User;
  created_at : string;
}