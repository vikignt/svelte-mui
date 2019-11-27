export default [
	{
		name: 'active',
		def: 'false',
		type: 'boolean',
		desc:
			'Active state of the toggle button, effective only if the <code>toggle</code> property is set',
	},
	{
		name: 'class',
		def: "''",
		type: 'string',
		desc: 'Custom global CSS class name',
	},
	{
		name: 'color',
		def: 'null',
		type: 'string',
		desc: "Color of the button, additionally, 'primary' and 'accent' values are possible",
	},
	{
		name: 'dense',
		def: 'false',
		type: 'boolean',
		desc: 'Makes the button container and icon slightly smaller',
	},
	{
		name: 'fab',
		def: 'false',
		type: 'boolean',
		desc:
			'Sort of icon button with enlarged size and raised shade, <code>icon</code> property must be set',
	},
	{
		name: 'fullWidth',
		def: 'false',
		type: 'boolean',
		desc: 'Makes the width of the button the full width of the parent container',
	},
	{
		name: 'icon',
		def: 'false',
		type: 'boolean',
		desc: "Defines round button, <a href='/icon'>Icon</a> component can be used in slot",
	},
	{
		name: 'outlined',
		def: 'false',
		type: 'boolean',
		desc:
			'Button with border if properties <code>raised</code> or <code>unelevated</code> are not set because it has a low priority (for Fab has no effect)',
	},
	{
		name: 'raised',
		def: 'false',
		type: 'boolean',
		desc:
			"Button with a shadow and colored background of the button's color, the content is black or white depending on the brightness of the background",
	},
	{
		name: 'ripple',
		def: 'true',
		type: 'boolean',
		desc: 'Enables the ripple effect',
	},
	{
		name: 'shaped',
		def: 'false',
		type: 'boolean',
		desc:
			'Button with rounded edges (for the default button, it has an effect only on the state of :hover and :focus, the <code>icon</code> button has no effect)',
	},
	{
		name: 'toggle',
		def: 'false',
		type: 'boolean',
		desc: 'Set button as toggle',
	},
	{
		name: 'unelevated',
		def: 'false',
		type: 'boolean',
		desc:
			"Button with a colored background of the button's color, the content is black or white depending on the brightness of the background (for Fab, the equivalent of <code>raised</code> property)",
	},
];
