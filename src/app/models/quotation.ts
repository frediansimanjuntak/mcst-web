import { Development, User, Attachment, Company } from './index'

export class Quotation {
   _id : string;
   development : Development;
   property : string;
   assignment : number;
   offered_price : string;
   attachment : Attachment;
   Company : Company;
   choosen_schedule : {
    days : [{type : string}],
    date : {type : string},
    start_time : {type : string},
	  end_time : {type : string},
   };
   contractor : string;
   remark : string;
   created_by : User;
   created_at : string;
}