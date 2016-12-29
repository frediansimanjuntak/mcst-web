import { User, Development } from './index'

export class Attachment {
  _id  : string;
  card_no : string;
  issued_to : User;
  developement : Development;
  properties : string;
  access_type : string;
  access_level : string;
  issued_by : User;
  issued_on : string;
  status : string;
  created_at : string;
}