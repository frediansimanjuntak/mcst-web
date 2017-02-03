import { Development, Attachment, User, Quotation } from './index'

export class Contract {
  _id : string;
  reference_no : string;
  development : Development;
  property : string;
  title : string;
  contract_type : string;
  // reference_type : string; not sure how to make
  // reference_id : string; 
  attachment : Attachment[];
  quotations : Quotation[];
  purchase_order : string;
  start_time : string;
  end_time : string;
  schedule : [{
      days : string,
      start_time : string,
      end_time : string,
  }];
  contract_note : [{
      note_remark : string;
      attachment : Attachment[];
      posted_by : User;
      posted_on : string;
    }
  ];
  contract_notice : [{
      title : string;
      start_time : string,
      end_time : string,
      description: string;
      attachment : Attachment[];
      publish : boolean;
  }];
  tracking_document : Attachment[];
  remark : string;
  status : string;
  created_by : User;
  updated_at : string;
  created_at : string;
}
export var Contracts: any[] = [{
  _id : "1",
  reference_no : "B123",
  development : "1",
  property : "123",
  title : "Lift Upgrade",
  contract_type : "Renovation",
  reference_type: "incident",
  reference_id: "NaX5P5gGdzh8bgyXN34fde3",
  // purchase_order : "1",
  start_time: "2016-12-08T03:31:07",
  end_time: "2016-12-08T03:31:07",
  schedule: [
    {
      days: "wednesday", /*or use index*/
      start_time: "2016-12-08T03:31:07",
      end_time: "2016-12-08T03:31:07"
    }
  ],
  // tracking_document : Attachment[]
  remark: "Wohohooooo",
  status: "open",
  created_by : "w0974u0a4443feaakfef24t",
  updated_at : "2016-12-08T03:31:07",
  created_at : "2016-12-08T03:31:07"
  },{
  _id : "2",
  reference_no: "3498",
  development: "NaX5P5gG4aefadXN34fde3",
  property: "NMe3DAea343c34fde3",
  title: "Ceiling repair",
  contract_type: "repair",
  reference_type: "incident",
  reference_id: "NaX5P5gGdzh8bgyXN34fde3",
  // attachment: ["NaX5P48b32d34fde3", "NaX5P5gGdzh8bgyXN34fde3"],
  // quotations: ["NaX5P5gGdzh8bgyXN34fde3", "5P5gGdzh8bgyXN34fde3"],
  // purchase_order: "NaX5P5gGdzh8bgyXN34fde3",
  start_time: "2016-12-08T03:31:07",
  end_time: "2016-12-08T03:31:07",
  schedule: [
    {
      days: "wednesday", /*or use index*/
      start_time: "2016-12-08T03:31:07",
      end_time: "2016-12-08T03:31:07"
    }
  ],
  // tracking_document: ["NMe3DAea343c34fde3", "NMe3DAea343c34fde3"], /*there should be description in attachment*/
  remark: "Wohohooooo",
  status: "closed",
  created_by : "w0974u0a4443feaakfef24t",
  updated_at : "2016-12-08T03:31:07",
  created_at : "2016-12-08T03:31:07"
  },{
  _id : "3",
  reference_no : "B123",
  development : "1",
  property : "123",
  title : "Door Upgrade",
  contract_type : "Renovation",
  reference_type: "incident",
  reference_id: "NaX5P5gGdzh8bgyXN34fde3",
  // purchase_order : "1",
  start_time: "2016-12-08T03:31:07",
  end_time: "2016-12-08T03:31:07",
  schedule: [
    {
      days: "wednesday", /*or use index*/
      start_time: "2016-12-08T03:31:07",
      end_time: "2016-12-08T03:31:07"
    }
  ],
  // tracking_document : Attachment[]
  remark: "Wohohooooo",
  status: "open",
  created_by : "w0974u0a4443feaakfef24t",
  updated_at : "2016-12-08T03:31:07",
  created_at : "2016-12-08T03:31:07"
  },{
  _id : "4",
  reference_no: "3498",
  development: "NaX5P5gG4aefadXN34fde3",
  property: "NMe3DAea343c34fde3",
  title: "Lift repair",
  contract_type: "repair",
  reference_type: "incident",
  reference_id: "NaX5P5gGdzh8bgyXN34fde3",
  // attachment: ["NaX5P48b32d34fde3", "NaX5P5gGdzh8bgyXN34fde3"],
  // quotations: ["NaX5P5gGdzh8bgyXN34fde3", "5P5gGdzh8bgyXN34fde3"],
  // purchase_order: "NaX5P5gGdzh8bgyXN34fde3",
  start_time: "2016-12-08T03:31:07",
  end_time: "2016-12-08T03:31:07",
  schedule: [
    {
      days: "wednesday", /*or use index*/
      start_time: "2016-12-08T03:31:07",
      end_time: "2016-12-08T03:31:07"
    }
  ],
  // tracking_document: ["NMe3DAea343c34fde3", "NMe3DAea343c34fde3"], /*there should be description in attachment*/
  remark: "Wohohooooo",
  status: "closed",
  created_by : "w0974u0a4443feaakfef24t",
  updated_at : "2016-12-08T03:31:07",
  created_at : "2016-12-08T03:31:07"
  }]