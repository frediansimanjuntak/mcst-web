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
      tenant : any[],
      registered_vehicle : any[],
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

export var Developments: any[] = [
  {
    _id: "1",
    name: "Marina Bay",
    owner: "1",
    staff: ["5", "4"],
    description: "Balalala",
    properties: 
    [{
      _id : '1',
        address : {
          unit_no : '12',
          unit_no_2 : '12313',
          block_no : '432434',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '213123',
          country : 'Indonesia',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "1",
      tenant : [
        {
          _id: "1", 
          resident: "8",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "2", 
          resident: "3",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "3", 
          resident: "1",
          type: "owner resident",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        }
      ],
      registered_vehicle: [
        {
          _id: "1",
          license_plate: "SGX 1266",
          owner: "8",
          transponder: "#12321321",
          document: "jk12n3kj1n3jk",
          registered_on: "2016-12-08T03:31:07",
          remarks: ""
        }
      ],
      status: "active",
      created_by: "1",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '2',
        address : {
          unit_no : '432',
          unit_no_2 : '1',
          block_no : '3123',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '123131',
          country : 'SIngapore',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "5",
      tenant : [
        {
          _id: "1", 
          resident: "8",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "2", 
          resident: "3",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "3", 
          resident: "1",
          type: "owner resident",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
         {
          _id: "4", 
          resident: "1",
          type: "owner resident",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        }
      ],
      registered_vehicle: [
        {
          _id: "1",
          license_plate: "SGX 1266",
          owner: "1",
          transponder: "#12321321",
          document: "jk12n3kj1n3jk",
          registered_on: "2016-12-08T03:31:07",
          remarks: ""
        }
      ],
      status: "inactive",
      created_by: "5",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '3',
        address : {
          unit_no : '5',
          unit_no_2 : '42234',
          block_no : '442',
          street_name : 'fssdfds',
          postal_code : '4212',
          country : 'Malaysia',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "9",
      tenant : [
        {
          _id: "1", 
          resident: "9",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        }
      ],
      registered_vehicle: [
        {
          _id: "1",
          license_plate: "SGX 1266",
          owner: "9",
          transponder: "#12321321",
          document: "jk12n3kj1n3jk",
          registered_on: "2016-12-08T03:31:07",
          remarks: ""
        }
      ],
      status: "active",
      created_by: "9",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '4',
        address : {
          unit_no : '234',
          unit_no_2 : '4',
          block_no : '7',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '1231',
          country : 'Thailand',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "3",
      tenant : [
        {
          _id: "1", 
          resident: "2",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "2", 
          resident: "7",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "3", 
          resident: "9",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        }
      ],
      registered_vehicle: [
        {
          _id: "1",
          license_plate: "SGX 1266",
          owner: "7",
          transponder: "#12321321",
          document: "jk12n3kj1n3jk",
          registered_on: "2016-12-08T03:31:07",
          remarks: ""
        },
        {
          _id: "2",
          license_plate: "SGX 1266",
          owner: "9",
          transponder: "#12321321",
          document: "jk12n3kj1n3jk",
          registered_on: "2016-12-08T03:31:07",
          remarks: ""
        }
      ],
      status: "active",
      created_by: "3",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '5',
        address : {
          unit_no : '4',
          unit_no_2 : '10',
          block_no : '4',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '765765',
          country : 'Malaysia',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "9",
      tenant : [
        {
          _id: "1", 
          resident: "5",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "2", 
          resident: "2",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "3", 
          resident: "6",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "4", 
          resident: "3",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        }
      ],
      status: "active",
      created_by: "14",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '6',
        address : {
          unit_no : '10',
          unit_no_2 : '1',
          block_no : '432434',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '213123',
          country : 'Singapore',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "10",
      tenant : [
        {
          _id: "1", 
          resident: "4",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        },
        {
          _id: "2", 
          resident: "2",
          type: "tenant",
          added_on: "2016-12-08T03:31:07",
          social_page: "yes",
          remarks: "#2133"
        }
      ],
      registered_vehicle: [
        {
          _id: "1",
          license_plate: "SGX 1266",
          owner: "4",
          transponder: "#12321321",
          document: "jk12n3kj1n3jk",
          registered_on: "2016-12-08T03:31:07",
          remarks: ""
        }
      ],
      status: "inactive",
      created_by: "10",
      created_at : "2016-12-08T03:31:07"
    }
    ],
    newsletter: [
      {
        _id : "1",
        title: "BBQ pit for everyone",
        description: "BBQ pit for everyone yay",
        type: "circular",
        attachment: "2",
        released: true,
        pinned: { "rank": 0 },
        released_by: "3",
        created_by: "3",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "2",
        title: "dasdsa pit adasd asdad",
        description: "BBQ pit for dasda yay",
        type: "egm",
        attachment: "3",
        released: true,
        pinned: { "rank": 0 },
        released_by: "4",
        created_by: "5",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "3",
        title: "dsajkdnadsadsadyone",
        description: "dklasdmsasdadjkslamdsaddsadksat for everyone yay",
        type: "agm",
        attachment: "8",
        released: false,
        pinned: { "rank": 0 },
        released_by: "1",
        created_by: "1",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "4",
        title: "dasdsadsadsadfdsf",
        description: "dklasdmsasdadjkslamdsaddsadksat for asdsad asdsadsad",
        type: "agm",
        attachment: "3",
        released: true,
        pinned: { "rank": 0 },
        released_by: "4",
        created_by: "1",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "5",
        title: "dasdsadsadk ujg",
        description: "dklasdmsasdadjkslamdsaddsadksat for sdsadsadsad  as as yay",
        type: "egm",
        attachment: "9",
        released: false,
        pinned: { "rank": 0 },
        released_by: "2",
        created_by: "10",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      }
    ]
  },

  {
    _id: "2",
    name: "Karena Bay",
    owner: "4",
    staff: ["5", "4", "10", "8"],
    description: "Balalaldsadsaa",
    properties: 
    [{
      _id : '1',
        address : {
          unit_no : '12',
          unit_no_2 : '12313',
          block_no : '432434',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '213123',
          country : 'Indonesia',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "1",
      tenant : ["5", "8"],
      status: "active",
      created_by: "1",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '2',
        address : {
          unit_no : '432',
          unit_no_2 : '1',
          block_no : '3123',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '123131',
          country : 'SIngapore',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "5",
      tenant : ["4", "3"],
      status: "inactive",
      created_by: "5",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '3',
        address : {
          unit_no : '5',
          unit_no_2 : '42234',
          block_no : '442',
          street_name : 'fssdfds',
          postal_code : '4212',
          country : 'Malaysia',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "9",
      tenant : ["9", "1", "2", "3"],
      status: "active",
      created_by: "9",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '4',
        address : {
          unit_no : '234',
          unit_no_2 : '4',
          block_no : '7',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '1231',
          country : 'Thailand',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "3",
      tenant : ["1", "2"],
      status: "active",
      created_by: "3",
      created_at : "2016-12-08T03:31:07"
    },
    {
      _id : '5',
        address : {
          unit_no : '4',
          unit_no_2 : '10',
          block_no : '4',
          street_name : 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
          postal_code : '765765',
          country : 'Malaysia',
          full_address : 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
        },
      landlord : "14",
      tenant : ["15", "8", "7"],
      status: "active",
      created_by: "14",
      created_at : "2016-12-08T03:31:07"
    },
    ],
    newsletter: [
      {
        _id : "1",
        title: "BBQ pit for everyone",
        description: "BBQ pit for everyone yay",
        type: "circular",
        attachment: "2",
        released: true,
        pinned: { "rank": 0 },
        released_by: "3",
        created_by: "3",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "2",
        title: "dasdsa pit adasd asdad",
        description: "BBQ pit for dasda yay",
        type: "circular",
        attachment: "3",
        released: true,
        pinned: { "rank": 0 },
        released_by: "4",
        created_by: "5",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "3",
        title: "dasdsa",
        description: "dklasdmsasdadjkslamdsaddsadksat for everyone yay",
        type: "agm",
        attachment: "8",
        released: true,
        pinned: { "rank": 0 },
        released_by: "1",
        created_by: "1",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
       {
        _id : "4",
        title: "dasdsadsadsadfdsf",
        description: "dklasdmsasdadjkslamdsaddsadksat for asdsad asdsadsad",
        type: "agm",
        attachment: "3",
        released: true,
        pinned: { "rank": 0 },
        released_by: "4",
        created_by: "1",
        released_at : "2016-12-08T03:31:07",
        created_at : "2016-12-08T03:31:07"
      },
    ]
  }

];
