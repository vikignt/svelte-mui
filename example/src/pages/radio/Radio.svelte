<DemoPanel>
	{#each Object.keys(colors) as key}
		<Radio {...props} bind:group color={colors[key]} value={key}>
			<span>{key}</span>
		</Radio>
	{/each}

	<div class="action" slot="action">
		<Button shaped on:click={() => (group = 'Pink')}>Set Pink</Button>
	</div>

	<p class="result" slot="result">
		Value: [
		<code>{group}</code>
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
	import { Button, Checkbox, Radio } from '/../../src';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let group = 'Green';
	let colors = {
		Pink: '#f50057',
		Green: '#43a047',
		Blue: '#1976d2',
		Inherit: 'inherit',
	};

	let props = {
		right: false,
		ripple: true,
		disabled: false,
	};
</script>
