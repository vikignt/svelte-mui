export default [
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'visible',
		def: 'false',
		type: 'boolean',
		desc: 'Controls whether the component is visible or hidden',
	},
	{
		name: 'width',
		def: '320',
		type: 'number',
		desc: 'Width of the component, px',
	},
	{
		name: 'modal',
		def: 'false',
		type: 'boolean',
		desc: 'To prevent the dialog from closing by clicking outside, set it to <code>true</code>',
	},
	{
		name: 'closeByEsc',
		def: 'true',
		type: 'boolean',
		desc:
			'To prevent the dialog from closing by <kbd>ESC</kbd> key, set it to <code>false</code>',
	},
	{
		name: 'beforeClose',
		def: '() => true',
		type: 'function',
		desc:
			'Callback function starts before closing the dialog, returns <code>false</code> to prevent the dialog from closing',
	},
];
