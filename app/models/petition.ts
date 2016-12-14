import { User, Development, Property, Attachment, Contract } from './index';

export class Petition {
  _id : string;
  reference_no : string;
  development : Development;
  property : Property;
  petition_type : string;
  attachment : Attachment[];
  contract : Contract;
  remark : string;
  status : string;
  created_by : User;
  updated_at : string;
  created_at : string
}