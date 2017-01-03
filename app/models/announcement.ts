import { User } from './index'

export class Announcement {
  _id : string;
  title : string;
  message : string;
  sticky : string;
  auto_post_on : string;
  valid_till : string;
  publish : boolean;
  publish_by : string;
  publish_at : string;
  created_by : string;
  updated_at : string;
  created_at : string;
}

export var Announcements: any[] = [
	{
	  _id : '1',
	  title : 'Title of announcement',
	  message : 'colorjdn nkdn ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
	  sticky : 'yes',
	  auto_post_on : '2017/01/02',
	  publish : true,
	  publish_by : '1',
	  publish_at : '2017/01/02',
	  valid_till : '2017/01/02',
	  created_by : '1',
	  updated_at : '',
	  created_at : '2017/01/02'
	},
	{
	  _id : '2',
	  title : 'Title of dawdwadwadwad 2',
	  message : 'colorj ajknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
	  sticky : 'no',
	  valid_till : '2017/01/02',
	  auto_post_on : 'no',
	  publish : false,
	  created_by : '5',
	  created_at : '2017/01/02'
	},
	{
	  _id : '3',
	  title : 'Title of announcement 3',
	  message : 'colorjdn nkdn ajknkj asnjkn ajs afasfasfsafnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
	  sticky : 'yes',
	  auto_post_on : '2017/01/02',
	  valid_till : '2017/01/02',
	  publish : true,
	  publish_by : '4',
	  publish_at : '2017/01/02',
	  created_by : '4',
	  updated_at : '2017/01/02',
	  created_at : '2017/01/02'
	},
	{
	  _id : '4',
	  title : 'dawdada of adwadwadwawadnnouncement 4',
	  message : 'colorjdn nkdn ajknkjdasdasd as  a a asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
	  sticky : 'yes',
	  auto_post_on : '2017/01/02',
	  publish : true,
	  publish_by : '3',
	  publish_at : '2017/11/20',
	  valid_till : '2016/10/20',
	  created_by : '3',
	  updated_at : '',
	  created_at : '2017/10/22'
	},
	{
	  _id : '5',
	  title : 'Title of announcement 5',
	  message : 'colorjdn nkdn ajasdadadknkj asnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
	  sticky : 'no',
	  valid_till : '2017/01/02',
	  auto_post_on : 'no',
	  publish : false,
	  created_by : '2',
	  updated_at : '',
	  created_at : '2017/01/02'
	},
	{
	  _id : '6',
	  title : 'Title of announcement 6',
	  message : 'colorjdn nkdn ajknkj a dwadwadwadsnjkn ajsnksjk ankj kan kjan kjan kjan akj nkajnkj ankj an kjn',
	  sticky : 'yes',
	  auto_post_on : '2017/01/02',
	  valid_till : 'forever',
	  publish : 'true',
	  publish_by : '1',
	  publish_at : '2017/01/02',
	  created_by : '10',
	  updated_at : '',
	  created_at : '2017/01/02'
	},
];
    
