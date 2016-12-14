import { Development, Attachment, Contract, User, Property } from './index'

export class Incident {
  _id : string;
  reference_no : string;
  title : string;
  development : Development;
  property : Property;
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