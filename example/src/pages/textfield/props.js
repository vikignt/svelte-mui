export default [
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'error',
		def: 'false',
		type: 'boolean',
		desc: 'Indicates that the <code>message</code> property contains an error',
	},
	{
		name: 'filled',
		def: 'false',
		type: 'boolean',
		desc: 'Filled input style',
	},
	{
		name: 'label',
		def: "''",
		type: 'string',
		desc: 'Input label',
	},
	{
		name: 'message',
		def: "''",
		type: 'string',
		desc: 'Help string or error message',
	},

	{
		name: 'outlined',
		def: 'false',
		type: 'boolean',
		desc: 'Outlined input style. <i>Note: background of the parent element must set</i>',
	},
	{
		name: 'required',
		def: 'false',
		type: 'boolean',
		desc: "Add symbol '*' to the label",
	},
	{
		name: 'type',
		def: "'text'",
		type: 'string',
		desc:
			"Available types 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'",
	},
	{
		name: 'value',
		def: "''",
		type: '[number, string]',
		desc: 'Input value',
	},
];
