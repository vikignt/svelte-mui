export default [
	{
		name: 'checked',
		def: 'false',
		type: 'boolean',
		desc: 'Get/Set checked state',
	},
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'color',
		def: "'primary'",
		type: 'string',
		desc:
			"Color of the active mark element, additionally, 'primary' and 'accent' values are possible",
	},
	{
		name: 'group',
		def: 'null',
		type: '[boolean, number, string]',
		desc: 'Combines components into a single group',
	},
	{
		name: 'indeterminate',
		def: 'false',
		type: 'boolean',
		desc: 'Set indeterminate state',
	},
	{
		name: 'right',
		def: 'false',
		type: 'boolean',
		desc: 'Moves the mark element to the right',
	},
	{
		name: 'ripple',
		def: 'true',
		type: 'boolean',
		desc: 'Enables the ripple effect',
	},
	{
		name: 'value',
		def: "'on'",
		type: '[boolean, number, string]',
		desc: 'The value that will be submitted for the checkbox when it is checked',
	},
];
