import { User, Development } from './index'

export class LostFound {
  _id : string;
  serial_number : string;
  development : Development;
  property: string;
  type: string;
  description: string;
  photo: string[];
  preferred_method_of_contact: string;
  archieve: boolean;
  created_by: User;
  created_at: string;
}

export var LostFounds: any[] = [
	
];
    
