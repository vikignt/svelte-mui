export default [
	{
		name: 'bg',
		def: "'rgba(0,0,0,.87)'",
		type: 'string',
		desc: 'Background',
	},
	{
		name: 'bottom',
		def: 'false',
		type: 'boolean',
		desc: 'Bottom of the screen',
	},
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'color',
		def: "'#fff'",
		type: 'string',
		desc: 'Color',
	},
	{
		name: 'style',
		def: "''",
		type: 'string',
		desc: 'Inline style',
	},
	{
		name: 'timeout',
		def: '5',
		type: 'number',
		desc: 'Sets the duration before hiding the snackbar (0 disables autohiding), sec',
	},
	{
		name: 'progress',
		def: 'false',
		type: 'boolean',
		desc: 'Enables progress bar at the bottom of a snackbar',
	},
	{
		name: 'progressStyle',
		def: 'background-color: red',
		type: 'string',
		desc: 'Progress bar styles (formatted as a string without a trailing semi-colon)',
	},
	{
		name: 'visible',
		def: 'false',
		type: 'boolean',
		desc: 'Controls whether the component is visible or hidden',
	},
];
