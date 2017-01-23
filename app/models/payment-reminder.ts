 import { Development, User } from './index'

export class PaymentReminder {
  _id : string;
  development : Development;
  property : string;
  title : string;
  auto_issue_on : string;/*link to attachment*/
  due_on : string;
  message_to_receiver : string;
  notification_list : [{ 
      charge : string,
      remarks : string,
      applies_to : string,
      amount : string
  }];
  publish : string;
  created_by : User;
  created_at : string
}