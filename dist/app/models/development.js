"use strict";
var Development = (function () {
    function Development() {
    }
    return Development;
}());
exports.Development = Development;
exports.Developments = [
    {
        _id: "1",
        name: "Marina Bay",
        owner: "1",
        staff: ["5", "4"],
        description: "Balalala",
        properties: [{
                _id: '1',
                address: {
                    unit_no: '12',
                    unit_no_2: '12313',
                    block_no: '432434',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '213123',
                    country: 'Indonesia',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "1",
                tenant: ["5", "8"],
                status: "active",
                created_by: "1",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '2',
                address: {
                    unit_no: '432',
                    unit_no_2: '1',
                    block_no: '3123',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '123131',
                    country: 'SIngapore',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "5",
                tenant: ["4", "3"],
                status: "inactive",
                created_by: "5",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '3',
                address: {
                    unit_no: '5',
                    unit_no_2: '42234',
                    block_no: '442',
                    street_name: 'fssdfds',
                    postal_code: '4212',
                    country: 'Malaysia',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "9",
                tenant: ["9", "1", "2", "3"],
                status: "active",
                created_by: "9",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '4',
                address: {
                    unit_no: '234',
                    unit_no_2: '4',
                    block_no: '7',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '1231',
                    country: 'Thailand',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "3",
                tenant: ["1", "2"],
                status: "active",
                created_by: "3",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '5',
                address: {
                    unit_no: '4',
                    unit_no_2: '10',
                    block_no: '4',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '765765',
                    country: 'Malaysia',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "14",
                tenant: ["15", "8", "7"],
                status: "active",
                created_by: "14",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '6',
                address: {
                    unit_no: '10',
                    unit_no_2: '1',
                    block_no: '432434',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '213123',
                    country: 'Singapore',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "10",
                tenant: ["5", "8", '13', '11', '3', '7'],
                status: "inactive",
                created_by: "10",
                created_at: "2016-12-08T03:31:07"
            }
        ],
        newsletter: [
            {
                _id: "1",
                title: "BBQ pit for everyone",
                description: "BBQ pit for everyone yay",
                type: "circular",
                attachment: "2",
                released: true,
                pinned: { "rank": 0 },
                released_by: "3",
                created_by: "3",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "2",
                title: "dasdsa pit adasd asdad",
                description: "BBQ pit for dasda yay",
                type: "circular",
                attachment: "3",
                released: true,
                pinned: { "rank": 0 },
                released_by: "4",
                created_by: "5",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "3",
                title: "dsajkdnadsadsadyone",
                description: "dklasdmsasdadjkslamdsaddsadksat for everyone yay",
                type: "agm",
                attachment: "8",
                released: true,
                pinned: { "rank": 0 },
                released_by: "1",
                created_by: "1",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "4",
                title: "dasdsadsadsadfdsf",
                description: "dklasdmsasdadjkslamdsaddsadksat for asdsad asdsadsad",
                type: "agm",
                attachment: "3",
                released: true,
                pinned: { "rank": 0 },
                released_by: "4",
                created_by: "1",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "5",
                title: "dasdsadsadk ujg",
                description: "dklasdmsasdadjkslamdsaddsadksat for sdsadsadsad  as as yay",
                type: "agm",
                attachment: "9",
                released: true,
                pinned: { "rank": 0 },
                released_by: "2",
                created_by: "10",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            }
        ]
    },
    {
        _id: "2",
        name: "Karena Bay",
        owner: "4",
        staff: ["5", "4", "10", "8"],
        description: "Balalaldsadsaa",
        properties: [{
                _id: '1',
                address: {
                    unit_no: '12',
                    unit_no_2: '12313',
                    block_no: '432434',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '213123',
                    country: 'Indonesia',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "1",
                tenant: ["5", "8"],
                status: "active",
                created_by: "1",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '2',
                address: {
                    unit_no: '432',
                    unit_no_2: '1',
                    block_no: '3123',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '123131',
                    country: 'SIngapore',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "5",
                tenant: ["4", "3"],
                status: "inactive",
                created_by: "5",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '3',
                address: {
                    unit_no: '5',
                    unit_no_2: '42234',
                    block_no: '442',
                    street_name: 'fssdfds',
                    postal_code: '4212',
                    country: 'Malaysia',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "9",
                tenant: ["9", "1", "2", "3"],
                status: "active",
                created_by: "9",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '4',
                address: {
                    unit_no: '234',
                    unit_no_2: '4',
                    block_no: '7',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '1231',
                    country: 'Thailand',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "3",
                tenant: ["1", "2"],
                status: "active",
                created_by: "3",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: '5',
                address: {
                    unit_no: '4',
                    unit_no_2: '10',
                    block_no: '4',
                    street_name: 'dsajkjdkajdkskjahdkjsahdksjadhjksahkasadsad',
                    postal_code: '765765',
                    country: 'Malaysia',
                    full_address: 'djksadkjahdkjahdkjsahdkjsahdkjsahdskadjoweowejfew',
                },
                landlord: "14",
                tenant: ["15", "8", "7"],
                status: "active",
                created_by: "14",
                created_at: "2016-12-08T03:31:07"
            },
        ],
        newsletter: [
            {
                _id: "1",
                title: "BBQ pit for everyone",
                description: "BBQ pit for everyone yay",
                type: "circular",
                attachment: "2",
                released: true,
                pinned: { "rank": 0 },
                released_by: "3",
                created_by: "3",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "2",
                title: "dasdsa pit adasd asdad",
                description: "BBQ pit for dasda yay",
                type: "circular",
                attachment: "3",
                released: true,
                pinned: { "rank": 0 },
                released_by: "4",
                created_by: "5",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "3",
                title: "dasdsa",
                description: "dklasdmsasdadjkslamdsaddsadksat for everyone yay",
                type: "agm",
                attachment: "8",
                released: true,
                pinned: { "rank": 0 },
                released_by: "1",
                created_by: "1",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
            {
                _id: "4",
                title: "dasdsadsadsadfdsf",
                description: "dklasdmsasdadjkslamdsaddsadksat for asdsad asdsadsad",
                type: "agm",
                attachment: "3",
                released: true,
                pinned: { "rank": 0 },
                released_by: "4",
                created_by: "1",
                released_at: "2016-12-08T03:31:07",
                created_at: "2016-12-08T03:31:07"
            },
        ]
    }
];
//# sourceMappingURL=development.js.map