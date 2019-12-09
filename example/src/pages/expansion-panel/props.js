export default [
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'name',
		def: "'?'",
		type: 'string',
		desc: 'The name of the panel',
	},
	{
		name: 'group',
		def: "''",
		type: 'string',
		desc: "Combines panel's into a single group",
	},
	{
		name: 'dense',
		def: 'false',
		type: 'boolean',
		desc: 'Removes the gap of the open panel',
	},
	{
		name: 'rotate',
		def: 'true',
		type: 'boolean',
		desc: 'Rotates the icon by 180° when the panel is opened or closed',
	},
	{
		name: 'expand',
		def: 'false',
		type: 'boolean',
		desc: 'If true, expands the panel, otherwise collapse it',
	},
];
