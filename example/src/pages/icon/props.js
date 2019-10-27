export default [
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'color',
		def: "'currentColor'",
		type: 'string',
		desc: 'Fill color',
	},
	{
		name: 'flip',
		def: 'false',
		type: '[boolean, string]',
		desc:
			"If <strong>true</strong>, rotates icon vertically and horizontally, 'h' horizontal rotation, 'v' vertical rotation",
	},
	{
		name: 'path',
		def: 'null',
		type: 'string',
		desc: 'SVG element attribute',
	},
	{
		name: 'pulse',
		def: 'false',
		type: 'boolean',
		desc: 'Animate icon by 45° rotation',
	},
	{
		name: 'size',
		def: '24',
		type: 'number',
		desc: 'Icon size, px',
	},
	{
		name: 'spin',
		def: 'false',
		type: 'boolean',
		desc: 'Animate rotation linear',
	},
	{
		name: 'viewBox',
		def: "'0 0 24 24'",
		type: 'string',
		desc: 'SVG element attribute, valid only if <code>path</code> property is set',
	},
];
