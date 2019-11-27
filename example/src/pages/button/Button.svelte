<DemoPanel>
	<Button {...props} color="primary" title="Simple button" on:click={increment}>Button</Button>

	<Button {...props} color="accent" title="Button with left icon" on:click={increment}>
		<!-- left icon -->
		<Icon path={cartOutline} style="margin: 0 8px 0 -4px;" />
		Add
	</Button>

	<Button
		{...props}
		color={$theme === 'dark' ? '#00bfa5' : '#00796b'}
		title="Button with right icon"
		on:click={increment}
	>
		Send
		<!-- right icon -->
		<Icon path="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" style="margin: 0 -4px 0 8px;" />
	</Button>

	<!-- icon buttons -->
	<Button {...props} icon title="Icon button with icon" on:click={increment}>
		<Icon path={search} />
	</Button>

	<Button {...props} icon color="primary" title="Icon button with text" on:click={increment}>
		VA
	</Button>

	<Button
		{...props}
		icon
		color="#5c9122"
		title="Icon button with multicolor icon"
		on:click={increment}
	>
		<Icon>
			<svelte:component this={approval} />
		</Icon>
	</Button>

	<p class="result" slot="result">
		Clicked counter: [
		<code>{counter}</code>
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
		<Radio bind:group={type} value={'baseline'} title="default">baseline *</Radio>
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
		<Checkbox bind:checked={props.fullWidth}>full width</Checkbox>
	</div>
</Play>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Button, Checkbox, Icon, Radio } from '/../../src';
	import { cartOutline, search } from '/components/icons';
	import approval from '/components/icons/svg/approval.svg';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';
	import { theme } from '/store';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let counter = 0;

	let type = 'raised';
	let props = {
		raised: false,
		unelevated: false,
		outlined: false,
		shaped: false,
		fab: false,
		dense: false,
		ripple: true,
		disabled: false,
		fullWidth: false,
	};

	$: props.raised = type === 'raised';
	$: props.unelevated = type === 'unelevated';
	$: props.outlined = type === 'outlined';

	function increment() {
		counter += 1;
	}
</script>
