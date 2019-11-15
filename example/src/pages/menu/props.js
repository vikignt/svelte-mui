export default [
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'dx',
		def: '0',
		type: 'number',
		desc: 'Offset with respect to activator in X axis, px',
	},
	{
		name: 'dy',
		def: '0',
		type: 'number',
		desc: 'Offset with respect to activator in Y axis, px',
	},
	{
		name: 'origin',
		def: "'top left'",
		type: 'string',
		desc: "Popover is open from 'bottom left', 'bottom right', 'top left', 'top right'",
	},
	{
		name: 'width',
		def: '112',
		type: 'number',
		desc: 'Popover minimum width, px',
	},
];
