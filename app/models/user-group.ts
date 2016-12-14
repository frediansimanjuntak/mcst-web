import { User } from './index'

export class UserGroup {
  _id : string;
  description : string;
  chief : User;
  users : User[];
  created_at : string;
}