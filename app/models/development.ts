import { User, Attachment } from './index'

export class Development {
  _id : string;
  name : string;
  owner : User;
  staff : User[];
  description : string;
  properties : [
    {
      _id : string,
      address : {
        unit_no : string,
        unit_no_2 : string,
        block_no : string,
        street_name : string,
        postal_code : string,
        country : string,
        full_address : string,
      },
      landlord : User,
      tenant : User[];
      status: string,
      created_by: User,
      created_at : string
    }
  ];
  newsletter: [
    {
      _id : string,
      title : string,
      description : string,
      type : string,
      attachment : Attachment,
      released : boolean,
      pinned : { rank : string },
      released_by : User,
      created_by : User,
      released_at : string,
      created_at : string,
    }
  ]
  /*more field*/
}