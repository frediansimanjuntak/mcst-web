import { User, Development } from './index'

export class AccessControl {
  _id  : string;
  card_no : string;
  issued_to : User;
  developement : Development;
  property : string;
  access_type : string;
  access_level : string;
  issued_by : User;
  issued_on : string;
  status : string;
  created_at : string;
}

export var AccessControls: any[] = [
	{_id: "1", card_no: 'A001', issued_to : '1', development:'asd', property:'asd', access_type:'card', access_level:'L2,L50', issued_by:'5', issued_on:'monday', status:'issued'},
    {_id: "2", card_no: 'A002', issued_to : '2', development:'asd', property:'asd', access_type:'card', access_level:'L2,L50', issued_by:'4', issued_on:'monday', status:'issued'},
    {_id: "3", card_no: 'A003', issued_to : '3', development:'asd', property:'asd', access_type:'card', access_level:'L2,L50', issued_by:'3', issued_on:'monday', status:'issued'},
    {_id: "4", card_no: 'A004', issued_to : '4', development:'asd', property:'asd', access_type:'transponder', access_level:'L2,L50', issued_by:'2', issued_on:'monday', status:'issued'},
    {_id: "5", card_no: 'A005', issued_to : '5', development:'asd', property:'asd', access_type:'transponder', access_level:'L2,L50', issued_by:'1', issued_on:'monday', status:'issued'}, 
];