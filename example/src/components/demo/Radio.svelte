<DemoContainer>
	{#each Object.keys(colors) as key}
		<Radio {...props} bind:group color={colors[key]} value={key}>
			<span>{key}</span>
		</Radio>
	{/each}

	<Button shaped on:click={() => (group = 'Pink')}>Set Pink</Button>

	<p class="result" slot="result">
		Value: [
		<code>{group}</code>
		]
	</p>

	<div slot="props" class="layout alignment-top-space-around">
		<div>
			<Checkbox bind:checked={props.right}>right</Checkbox>
			<Checkbox bind:checked={props.ripple}>
				<span title="default">ripple *</span>
			</Checkbox>
			<Checkbox bind:checked={props.disabled}>disabled</Checkbox>
		</div>
	</div>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Button, Checkbox, Radio } from '../../../../src';

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
