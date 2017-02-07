 import { Development, User } from './index'

export class PaymentReminder {
  _id : string;
  development : Development;
  title : string;
  auto_issue_on : string;
  due_on : string;
  message_to_receiver : string;
  notification_list : [{ 
      charge : string,
      remarks : string,
      applies_to : string,
      amount : string
  }];
  publish : boolean;
  created_by : User;
  created_at : string
}

export var PaymentReminders: any[] = [
  {
    _id : "1",
    development : '1',
    title : 'bayar',
    auto_issue_on : '2017-01-20T03:00:00',
    due_on : '2017-01-30T03:00:00',
    message_to_receiver : 'bayar oi',
    notification_list : [{ 
      charge : 'hutang',
      remarks : 'bayar',
      applies_to : 'all',
      amount : '50'
    }],
    publish : true,
    created_by : 'aasss',
    created_at: '2017-01-10T03:00:00',
  },{
    _id : "2",
    development : '2',
    title : 'pay',
    auto_issue_on : '2017-01-15T03:00:00',
    due_on : '2017-01-25T03:00:00',
    message_to_receiver : 'bayar oii',
    notification_list : [{ 
      charge : 'hutang',
      remarks : 'bayar',
      applies_to : 'tenant with vehicle',
      amount : '500'
    }],
    publish : false,
    created_by : 'aasss',
    created_at: '2017-01-5T03:00:00',
  }]