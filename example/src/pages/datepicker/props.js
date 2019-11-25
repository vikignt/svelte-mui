export default [
	{
		name: 'header',
		def: 'true',
		type: 'boolean',
		desc: 'Controls whether the header is visible or hidden',
	},
	{
		name: 'isAllowed',
		def: '() => true',
		type: 'function',
		desc: 'Callback function provides disabling of some dates to be selected',
	},
	{
		name: 'locale',
		def: 'navigator language',
		type: 'string',
		desc:
			'Locale is used to set the first day of the week and to format language sensitive date',
	},
	{
		name: 'value',
		def: 'today',
		type: 'Date',
		desc: 'Binding value',
	},
];
