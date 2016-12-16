"use strict";
exports.MENUS = [
    {
        name: 'Dashboard',
        link: '/dashboard'
    },
    {
        name: 'Operations',
        link: '#',
        sub: [
            { name: 'Guest, Visitor & Contractors', link: '' },
            { name: 'Incident Reports', link: '' },
            { name: 'Manage Orders', link: '' },
            { name: 'Manage Project', link: '' },
        ]
    },
    {
        name: 'Manage Request',
        link: '',
        description: 'Track request for permits such as renovation, move-in, move-out and bulk delivery',
        sub: [
            { name: 'Browse Request', link: '' },
            { name: 'Add Request', link: '' },
            { name: 'Search Reference.no', link: '' }
        ]
    },
    {
        name: 'Facilities Booking',
        link: '',
        description: 'Manage booking of facilities',
    },
    {
        name: 'Payment System',
        link: '',
        description: 'Manage monthly MCST, deposits and other payments',
    },
    {
        name: 'Resident Database',
        link: '',
        description: 'Track issuance of access cards, car decal, transponder',
        sub: [
            { name: 'Browse Database', link: '' },
            { name: 'Add Resident', link: '' },
            { name: 'Manage Access control', link: '' }
        ]
    },
    {
        name: 'Manage Community',
        link: '',
        description: 'Manage event and announcement, E-voting and feedbacks',
        sub: [
            { name: 'Manage Announcement', link: '' },
            { name: 'E-voting', link: '' },
            { name: 'Manage Feedbacks', link: '' },
            { name: 'Lost & Found', link: '' },
        ]
    },
    {
        name: 'Useful Information',
        link: '',
        sub: [
            { name: 'AGM & Circular', link: '' },
            { name: 'Contact Directory', link: '' },
            { name: 'User', link: '/user' },
        ]
    },
];
//# sourceMappingURL=mock-menu.js.map