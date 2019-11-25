export default [
	{
		name: 'format',
		def: "'YYYY-MM-DD'",
		type: 'string',
		desc: 'Format string, valid D[D], M[M], YY[YY]',
	},
	{
		name: 'icon',
		def: 'false',
		type: 'boolean',
		desc: 'Add calendar icon on the left side, clicking on this icon opens the date pcicker',
	},
	{
		name: 'isAllowed',
		def: '() => true',
		type: 'function',
		desc:
			'Forwarding to the Datepicker callback function provides disabling of some dates to be selected',
	},
	{
		name: 'locale',
		def: 'navigator language',
		type: 'string',
		desc:
			'Forwarding to the Datepicker locale is used to set the first day of the week and to format language sensitive date',
	},
	{
		name: 'value',
		def: "''",
		type: 'date, string',
		desc: 'Binding value',
	},
];
