<DemoPanel>
	<Checkbox {...props} bind:checked bind:indeterminate>
		<span>
			I agree that
			<a target="_blank" href="https://svelte.dev" title="Open in new window">Svelte</a>
			is awesome
		</span>
	</Checkbox>

	<div class="action" slot="action">
		<Button
			shaped
			on:click={() => {
				setChecked(true);
			}}
		>
			Check
		</Button>
		<Button
			shaped
			on:click={() => {
				setChecked(false);
			}}
		>
			Uncheck
		</Button>
		<Button
			shaped
			on:click={() => {
				setChecked();
			}}
		>
			Indeterminate
		</Button>
	</div>

	<p class="result" slot="result">
		Value: [
		<code>{indeterminate ? 'indeterminate' : checked}</code>
		]
	</p>

	<div slot="code">
		<div>
			{@html code}
		</div>
	</div>
</DemoPanel>

<Play>
	<div>
		<Checkbox bind:checked={props.right}>right</Checkbox>
		<Checkbox bind:checked={props.ripple} title="default true">ripple *</Checkbox>
		<Checkbox bind:checked={props.disabled}>disabled</Checkbox>
	</div>
</Play>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Button, Checkbox } from '/../../src';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let checked = true;
	let indeterminate = false;

	let props = {
		color: 'accent',
		name: 'svelte',
		value: 'awesome',
		right: false,
		ripple: true,
		disabled: false,
	};

	function setChecked(on) {
		if (typeof on === 'undefined') {
			checked = false;
			indeterminate = true;
		} else {
			indeterminate = false;
			checked = on;
		}
	}
</script>
