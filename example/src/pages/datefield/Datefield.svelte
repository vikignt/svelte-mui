<DemoPanel>
	<Datefield
		value={date}
		label="A Special Day"
		{readonly}
		{disabled}
		{locale}
		{icon}
		{format}
		message={format}
		on:date-change={onchange}
	/>

	<div class="result" slot="result">
		<p>
			value:
			<code>"{date}"</code>
		</p>
		<p>{locale}</p>
	</div>

	<div slot="code">
		<div>
			{@html code}
		</div>
	</div>
</DemoPanel>

<Play>
	<div>
		<Textfield
			filled
			label="locale"
			bind:value={trylocale}
			message="Try as el, en, en-GB, fi ..."
		/>
	</div>
	<div>
		<Textfield filled label="format" bind:value={format} message="Try: MM/DD/YYYY" />
	</div>
	<div style="align-self: center;">
		<Checkbox bind:checked={icon}>Icon</Checkbox>
		<Checkbox bind:checked={readonly}>Readonly</Checkbox>
		<Checkbox bind:checked={disabled}>Disabled</Checkbox>
	</div>
</Play>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Datefield, Checkbox, Textfield } from '/../../src';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let date = '21.01.2019';
	// let date = new Date(NaN);

	let icon = false;
	let readonly = false;
	let disabled = false;
	let format = 'D.MM.YYYY';
	let browserLanguage =
		navigator.languages && navigator.languages.length
			? navigator.languages[0]
			: navigator.userLanguage || navigator.language || navigator.browserLanguage || 'ru';
	let locale = 'ru';
	let trylocale = locale;
	$: {
		try {
			new Intl.DateTimeFormat(trylocale, {
				dateStyle: 'short',
			});
			locale = trylocale;
		} catch (error) {
			locale = browserLanguage;
		}
	}

	const onchange = ({ detail }) => {
		date = detail;
		console.log('receive data-change');
	};
</script>

<style>
	@media only screen and (max-width: 480px) {
		:global(.properties) > div {
			width: 70%;
		}
	}
</style>
