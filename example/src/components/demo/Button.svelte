<DemoContainer>
	<Button {...props} color="primary" on:click={increment}>Button</Button>
	<Button {...props} color="accent" left={cartOutline} on:click={increment}>Add</Button>
	<Button {...props} color={theme === 'dark' ? '#00bfa5' : '#00796b'} right={send} on:click={increment}>Send</Button>
	<Button {...props} color={theme === 'dark' ? 'var(--color)' : '#333'} icon={search} on:click={increment} />

	<p class="result" slot="result">
		Clicked counter: [
		<code>{counter}</code>
		]
	</p>

	<div slot="props" class="layout alignment-top-space-around">
		<div>
			<Radio bind:group={type} value={'baseline'}>
				<span title="default">baseline *</span>
			</Radio>
			<Radio bind:group={type} value={'raised'}>raised</Radio>
			<Radio bind:group={type} value={'unelevated'}>unelevated</Radio>
			<Radio bind:group={type} value={'outlined'}>outlined</Radio>

			<span style="font-size: .875rem;margin-top:1rem;">* Default</span>
		</div>

		<div>
			<Checkbox bind:checked={props.shaped}>shaped</Checkbox>
			<Checkbox bind:checked={props.fab}>fab</Checkbox>
			<Checkbox bind:checked={props.dense}>dense</Checkbox>
			<Checkbox bind:checked={props.ripple}>
				<span title="default">ripple *</span>
			</Checkbox>
			<Checkbox bind:checked={props.disabled}>disabled</Checkbox>
		</div>
	</div>
</DemoContainer>

<script>
	export let theme = 'light';

	import DemoContainer from '../DemoContainer.svelte';
	import { cartOutline, search, send } from '../icons';
	import { Button, Checkbox, Radio } from '../../../../src';

	let counter = 0;

	let type = 'raised';
	let props = {
		raised: false,
		unelevated: false,
		outlined: true,
		shaped: false,
		fab: false,
		dense: false,
		ripple: true,
		disabled: false,
	};

	$: props.raised = type === 'raised';
	$: props.unelevated = type === 'unelevated';
	$: props.outlined = type === 'outlined';

	function increment() {
		counter += 1;
	}
</script>
