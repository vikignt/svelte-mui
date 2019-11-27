<DemoPanel>
	<!-- NOTE: for 'outlined' Textfield parent element must set the background -->
	<div style="flex: 1;margin: 0 8px;background: #eee;background: var(--bg-panel);">
		<Textfield
			bind:value
			{label}
			{required}
			{messagePersist}
			{message}
			{error}
			{readonly}
			{disabled}
			{outlined}
			{filled}
		/>
	</div>

	<div slot="code">
		<div>
			{@html code}
		</div>
	</div>
</DemoPanel>

<Play>
	<div class="properties between">
		<label>
			value
			<input type="text" bind:value />
		</label>
		<label>
			label
			<input type="text" bind:value={label} />
		</label>
		<label>
			message
			<input type="text" bind:value={message} />
		</label>
		<label>
			error
			<input type="text" bind:value={error} />
		</label>
	</div>

	<div class="properties">
		<div>
			<Radio bind:group={type} value="default" title="default">default *</Radio>
			<Radio bind:group={type} value="filled">filled</Radio>
			<Radio bind:group={type} value="outlined">outlined</Radio>

		</div>
		<div>
			<Checkbox bind:checked={messagePersist}>persistant message</Checkbox>
			<Checkbox bind:checked={required}>required</Checkbox>
			<Checkbox bind:checked={readonly}>readonly</Checkbox>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
		</div>
	</div>
</Play>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Textfield, Checkbox, Radio } from '/../../src';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let label = 'Label';
	let required = true;
	let value = '';
	let error = '';
	let message = 'help message';
	let messagePersist = false;
	let outlined = false;
	let filled = false;
	let readonly = false;
	let disabled = false;

	let type = 'default';

	$: outlined = type === 'outlined';
	$: filled = type === 'filled';
</script>

<style>
	label {
		width: 100%;
		font-size: 13px;
		color: var(--label);
	}
	input {
		width: 100%;
		font-family: inherit;
		font-size: 16px !important;
		color: var(--color);
		background: var(--bg-color);
		padding: 6px;
		margin: 4px 0 4px 0;
		border: 1px solid var(--divider);
		border-radius: 2px;
	}
	.properties {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: flex-start;
		width: 100%;
	}
	.between {
		justify-content: space-between;
	}
	.properties label {
		width: 48%;
	}
</style>
