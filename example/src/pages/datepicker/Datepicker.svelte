<DemoPanel>
	<div class="card">
		<Datepicker
			{header}
			{locale}
			bind:value={date}
			isAllowed={(date) => {
				return date.getDay() > 0 && date.getDay() < 6;
			}}
		/>
	</div>

	<div class="result" slot="result">
		<p>
			Selected: [
			<code>{formattedDate}</code>
			]
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
	<div style="flex-grow: 1;">
		<Textfield
			filled
			messagePersist
			label="locale"
			bind:value={trylocale}
			message="Try as el, en, en-GB, ru ..."
		/>
	</div>
	<div style="align-self: center;">
		<Checkbox bind:checked={header}>Header visible</Checkbox>
	</div>
</Play>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Datepicker, Checkbox, Textfield } from '/../../src';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let header = true;
	let date = new Date();
	date.setDate(date.getDate() + 2);

	let browserLanguage =
		navigator.languages && navigator.languages.length
			? navigator.languages[0]
			: navigator.userLanguage || navigator.language || navigator.browserLanguage || 'ru';
	let locale = browserLanguage;
	let trylocale = locale;
	let formattedDate;

	$: {
		try {
			new Intl.DateTimeFormat(trylocale, {
				dateStyle: 'short',
			});
			locale = trylocale;
		} catch (error) {
			locale = browserLanguage;
		}

		formattedDate = new Intl.DateTimeFormat(locale, {
			dateStyle: 'full',
		}).format(date);
	}
</script>

<style>
	.card {
		display: inline-block;
		box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
			0 1px 8px 0 rgba(0, 0, 0, 0.12);
	}
</style>
