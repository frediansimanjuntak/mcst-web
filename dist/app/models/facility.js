"use strict";
var Facility = (function () {
    function Facility() {
    }
    return Facility;
}());
exports.Facility = Facility;
exports.Facilities = [
    {
        _id: '1',
        name: 'BBQ',
        development: '1',
        description: 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
        facility_type: 'daily',
        payment_type: 'cash',
        booking_type: 'hourly',
        maintenance_start: '',
        maintenance_end: '',
        schedule: [{
                day: 'monday',
                start_time: '08:00',
                end_time: '18:00',
            }, {
                day: 'saturday',
                start_time: '10:00',
                end_time: '17:00',
            }, {
                day: 'sunday',
                start_time: '10:00',
                end_time: '16:00',
            }],
        status: 'available',
        created_by: '',
        created_at: '',
    },
    {
        _id: '2',
        name: 'Tennis',
        description: 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
        facility_type: 'a',
        payment_type: 'cash',
        booking_type: 'daily',
        schedule: [{
                day: 'monday',
                start_time: '08:00',
                end_time: '18:00',
            }, {
                day: 'saturday',
                start_time: '10:00',
                end_time: '17:00',
            }],
        status: 'available'
    },
    {
        _id: '3',
        name: 'pool',
        description: 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
        facility_type: 'a',
        payment_type: 'cash',
        booking_type: 'daily',
        schedule: [{
                day: 'thursday',
                start_time: '08:00',
                end_time: '18:00',
            }, {
                day: 'friday',
                start_time: '10:00',
                end_time: '17:00',
            }],
        status: 'available'
    },
    {
        _id: '4',
        name: 'football field',
        description: 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
        facility_type: 'a',
        payment_type: 'cash',
        booking_type: 'daily',
        schedule: [{
                day: 'wednesday',
                start_time: '08:00',
                end_time: '18:00',
            }, {
                day: 'sunday',
                start_time: '10:00',
                end_time: '17:00',
            }],
        status: 'available'
    },
    {
        _id: '5',
        name: 'boxing',
        description: 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
        facility_type: 'a',
        payment_type: 'cash',
        booking_type: 'daily',
        schedule: [{
                day: ['monday', 'tuesday', 'wednesday', 'thursday'],
                start_time: '08.00',
                end_time: '18.00',
            }, {
                day: ['friday', 'saturday'],
                start_time: '10.00',
                end_time: '17.00',
            }, {
                day: ['sunday'],
                start_time: '10.00',
                end_time: '16.00',
            }],
        status: 'available'
    },
];
//# sourceMappingURL=facility.js.map