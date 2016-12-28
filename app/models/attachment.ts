import { User } from './index'

export class Attachment {
  _id  : string;
  name : string;
  type : string;
  url  : string;
  information : string;
  created_by  : User;
  created_at  : string
}