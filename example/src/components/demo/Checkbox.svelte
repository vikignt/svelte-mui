<DemoContainer>
	<div style="padding-right: 4px;width: 100%;">
		<Checkbox {...props} bind:checked bind:indeterminate>
			<span>
				I agree that
				<a target="_blank" href="https://svelte.dev" title="Open in new window">Svelte</a>
				is awesome
			</span>
		</Checkbox>
	</div>

	<div class="layout alignment-center-center">
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

	<div slot="play" class="layout alignment-top-space-around">
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
	import { Button, Checkbox } from '/src';

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
