<DemoPanel>
	<div class="demo-content">
		<ButtonGroup>
			<Button {...props} color="primary" on:click={increment}>This one</Button>
			<Button {...props} color="primary" on:click={increment}>Click</Button>
			<Button {...props} color="primary" on:click={increment}>Here</Button>
		</ButtonGroup>
	</div>

	<div class="demo-content">
		<ButtonGroup>
			<ToggleButton
				active={justify.left}
				{...props}
				color="accent"
				on:change={(e) => {
					onjustify('left', e.detail);
				}}
			>
				<Icon path={alignLeft} />
			</ToggleButton>
			<ToggleButton
				active={justify.center}
				{...props}
				color="accent"
				on:change={(e) => {
					onjustify('center', e.detail);
				}}
			>
				<Icon path={alignCenter} />
			</ToggleButton>
			<ToggleButton
				active={justify.right}
				{...props}
				color="accent"
				on:change={(e) => {
					onjustify('right', e.detail);
				}}
			>
				<Icon path={alignRight} />
			</ToggleButton>
			<ToggleButton
				active={justify.justify}
				{...props}
				color="accent"
				on:change={(e) => {
					onjustify('justify', e.detail);
				}}
			>
				<Icon path={alignJustify} />
			</ToggleButton>

			<ToggleButton bind:active={isbold} {...props} color="accent">
				<Icon path={bold} />
			</ToggleButton>
			<ToggleButton bind:active={isitalic} {...props} color="accent">
				<Icon path={italic} />
			</ToggleButton>
		</ButtonGroup>
	</div>

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
		<Checkbox bind:checked={props.dense}>dense</Checkbox>
		<Checkbox bind:checked={props.ripple}>
			<span title="default">ripple *</span>
		</Checkbox>
		<Checkbox bind:checked={props.disabled}>disabled</Checkbox>
	</div>
</Play>

<Description>
	{@html doc}
</Description>

<script>
	import { ButtonGroup, Button, ToggleButton, Checkbox, Icon, Radio } from '@vikignt/svelte-ui';
	import {
		alignCenter,
		alignJustify,
		alignLeft,
		alignRight,
		bold,
		italic,
	} from '/components/icons';
	import { DemoPanel, Play, Description } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';

	let counter = 0;

	let justify = {
		left: false,
		center: false,
		right: false,
		justify: false,
	};

	let isbold = false;
	let isitalic = false;

	let type = 'outlined';
	let props = {
		raised: false,
		unelevated: false,
		outlined: false,
		shaped: true,
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

	function onjustify(param, value) {
		if (!value) {
			justify[param] = value;
			return;
		}
		Object.keys(justify).map((key) => {
			justify[key] = key === param ? true : false;
		});
	}
</script>

<style>
	.demo-content {
		margin-bottom: 1em;
		width: 100%;
	}
	.demo-content :global(button) {
		margin: 0;
	}
</style>
