import { User, Development } from './index';

export class Visit {
  _id : string;
  development : Development;
  property : string;
  visitor : {
    prefix : string,
    full_name : string,
    vehicle : string,
    pass : string,
  };
  purpose : string;
  remarks : string;
  visit_date : string;
  created_by : User;
  check_in : string;
  check_out : string;
  checked_by : User;
  created_at : string; 
}