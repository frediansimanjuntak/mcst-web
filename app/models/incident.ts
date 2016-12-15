import { Development, Attachment, Contract, User } from './index'

export class Incident {
  _id : string;
  reference_no : string;
  title : string;
  development : Development;
  property : string;
  incident_type : string;
  landlord_acceptance : string;
  attachment : Attachment[];
  contract : Contract;
  remark : string;
  status : string;
  created_by : User;
  updated_at : string;
  created_at : string; 
}