import { User, Development } from './index';

export class Visit {
  _id : string;
  development : Development;
  property : string;
  visitor : {
    prefix : string,
    full_name : string,
    vehicle : string,
    pass : string,
  };
  purpose : string;
  remarks : string;
  visit_date : string;
  created_by : User;
  check_in : string;
  check_out : string;
  checkin_by : any;
  checkout_by : any;
  created_at : string; 
}


export var Visits: any[] = [
  {
    _id : "1",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
        prefix: "mr",
        full_name: "Bam",
        vehicle: "0934",
        pass: "S100"
    },
    purpose: "house_visit",
    remarks: "visiting my grandman",
    visit_date : "2017-01-01T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "2017-01-03T03:31:07",
    check_out : "2017-01-04T03:31:07",
    checkin_by : "w0974u0a4443feaakfef24t",
    checkout_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "2",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
        prefix: "Ms",
        full_name: "Lim hui yi",
        vehicle: "JKL0934",
        pass: "S700"
    },
    purpose: "maintenance_work",
    remarks: "with 3workers for drainage repair",
    visit_date : "2017-01-05T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "2016-01-05T03:31:07",
    check_out : "",
    checkin_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "3",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mr",
      full_name: "Bam",
      vehicle: "0934",
      pass: "S100"
    },
    purpose: "house_visit",
    remarks: "",
    visit_date : "2016-12-31T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "",
    check_out : "",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "4",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mr",
      full_name: "Bam",
      vehicle: "0934",
      pass: "S100"
    },
    purpose: "house_visit",
    remarks: "guess i will chair bounded",
    visit_date : "2017-01-01T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "2017-01-02T03:31:07",
    check_out : "",
    checkin_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "5",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mr",
      full_name: "Bam",
      vehicle: "0934",
      pass: "S100"
    },
    purpose: "house_visit",
    remarks: "my come with a familyof 4  ",
    visit_date : "2017-01-04T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "",
    check_out : "",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "6",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mr",
      full_name: "Bean",
      vehicle: "2139hj",
      pass: "191"
    },
    purpose: "maintenance_work",
    remarks: "Whatt",
    visit_date : "2017-01-06T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "",
    check_out : "",
    created_at : "2016-12-08T03:31:07"
  },
   {
    _id : "7",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mr",
      full_name: "Bonon",
      vehicle: "asf",
      pass: "H67"
    },
    purpose: "maintenance_work",
    remarks: "Whatt",
    visit_date : "2017-01-02T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "2017-01-02T03:31:07",
    check_out : "2017-01-02T03:31:07",
    checkin_by : "w0974u0a4443feaakfef24t",
    checkout_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "8",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mrs",
      full_name: "Gut",
      vehicle: "A4500",
      pass: "H67"
    },
    purpose: "house_visit",
    remarks: "Anything else",
    visit_date : "2017-01-05T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "2017-01-05T03:31:07",
    check_out : "",
    checkin_by : "w0974u0a4443feaakfef24t",
    created_at : "2016-12-08T03:31:07"
  },
  {
    _id : "9",
    development: "ANaX5P5gGdzh8bgyXN34fde3sus",
    property: "23de34G3dzh8bgyXN34fde3",
    visitor: {
      prefix: "mr",
      full_name: "Tre",
      vehicle: "GT32",
      pass: "H67"
    },
    purpose: "house_visit",
    remarks: "Yupp",
    visit_date : "2017-01-07T03:31:07",
    created_by : "583r3ddd97c97149884fe333",
    check_in : "",
    check_out : "",
    created_at : "2016-12-08T03:31:07"
  },
]
