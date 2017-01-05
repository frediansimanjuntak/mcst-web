"use strict";
exports.MENUS = [
    {
        name: 'Dashboard',
        link: '/dashboard'
    },
    {
        name: 'Operations',
        sub: [
            { name: 'Guest, Visitor & Contractors', link: '' },
            { name: 'Incident Reports', link: '/incident' },
            { name: 'Manage Orders', link: '' },
            { name: 'Manage Project', link: '' },
        ]
    },
    {
        name: 'Manage Request',
        description: 'Track request for permits such as renovation, move-in, move-out and bulk delivery',
        sub: [
            { name: 'Browse Request', link: '/petition' },
            { name: 'Add Request', link: '/petition/add' },
            { name: 'Search Reference.no', link: '' }
        ]
    },
    {
        name: 'Facilities Booking',
        link: '/booking',
        description: 'Manage booking of facilities',
    },
    {
        name: 'Payment System',
        link: '#',
        description: 'Manage monthly MCST, deposits and other payments',
    },
    {
        name: 'Resident Database',
        description: 'Track issuance of access cards, car decal, transponder',
        sub: [
            { name: 'Browse Database', link: '' },
            { name: 'Add Resident', link: '' },
            { name: 'Manage Access control', link: '/access_control' }
        ]
    },
    {
        name: 'Manage Community',
        description: 'Manage event and announcement, E-voting and feedbacks',
        sub: [
            { name: 'Manage Announcement', link: '/announcement' },
            { name: 'E-voting', link: '' },
            { name: 'Manage Feedbacks', link: '' },
            { name: 'Lost & Found', link: '' },
        ]
    },
    {
        name: 'Useful Information',
        sub: [
            { name: 'AGM & Circular', link: '/newsletter' },
            { name: 'Contact Directory', link: '' },
            { name: 'User', link: '/user' },
            { name: 'Unit', link: '/unit' },
            { name: 'User Group', link: '/user_group' },
        ]
    },
];
//# sourceMappingURL=menu.js.map