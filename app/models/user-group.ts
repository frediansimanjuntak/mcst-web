import { User } from './index'

export class UserGroup {
  _id : string;
  description : string;
  chief : User;
  users : User[];
  created_at : string;
  development : string;
}

export var UserGroups: any[] = [
	{
	  _id : '1',
	  description : 'lorem ipsum dolor sit atmet',
	  chief : '1',
	  users : ['3','2','4'],
	  created_at : ''
	},
	{
	  _id : '2',
	  description : 'lorem ipsum dolo dasdsa r sit atmet',
	  chief : '2',
	  users : ['7','9','4'],
	  created_at : ''
	},
	{
	  _id : '3',
	  description : 'lorem treedssadsadt dolor sit fsdfatmet',
	  chief : '3',
	  users : ['9','6','4'],
	  created_at : ''
	},
	{
	  _id : '4',
	  description : 'loremdsdf fds s sfds fds ipsum dolor sit atmet',
	  chief : '4',
	  users : ['10','12','8','11'],
	  created_at : ''
	},
	{
	  _id : '5',
	  description : 'lorem dasds sa aipsum dolor sit atmet',
	  chief : '5',
	  users : ['9','2'],
	  created_at : ''
	},
	{
	  _id : '6',
	  description : 'loremasdsadad ipsum doloadsadr sit atmet',
	  chief : '8',
	  users : ['3','5','15'],
	  created_at : ''
	},
	{
	  _id : '7',
	  description : 'sada s asadsa da ipsum dolor sit atmet',
	  chief : '15',
	  users : ['9','2','4', '7'],
	  created_at : ''
	},
	{
	  _id : '8',
	  description : 'lorem ilala lili lulu psum dolor sit atmet',
	  chief : '9',
	  users : ['3','10','4', '12', '14'],
	  created_at : ''
	},
];
    
