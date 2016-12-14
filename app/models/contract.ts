import { Development, Attachment, User, Property, Quotation } from './index'

export class Contract {
  _id : string;
  reference_no : string;
  development : Development;
  property : Property;
  title : string;
  contract_type : string;
  // reference_type : string; not sure how to make
  // reference_id : string; 
  attachment : Attachment[];
  quotations : Quotation[];
  purchase_order : string;
  start_time : string;
  end_time : string;
  schedule : [
    {
      days : string,
      start_time : string,
      end_time : string,
    }
  ];
  tracking_document : Attachment[];
  remark : string;
  status : string;
  created_by : User;
  updated_at : string;
  created_at : string;
}