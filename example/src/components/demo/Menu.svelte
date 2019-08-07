<DemoContainer labelProps="Play with popover properties">
	<Menu {origin} {dx} {dy} width={width * 56}>
		<div slot="activator">
			<Button color="primary" outlined ripple={false} style="padding-right: 4px;">
				<span>Menu</span>
				<Icon content={arrowDropDown} />
			</Button>
		</div>

		<Menuitem on:click={() => (menu = 'Refresh')}>Refresh</Menuitem>
		<Menuitem on:click={() => (menu = 'Send feedback')}>Send feedback</Menuitem>
		<Menuitem on:click={() => (menu = 'Settings')} disabled>Settings</Menuitem>
		<Menuitem on:click={() => (menu = 'Help')}>Help</Menuitem>
		<hr />
		<Menuitem on:click={() => (menu = 'Sign In')}>Sign In</Menuitem>
	</Menu>

	<p class="result" slot="result">
		Value: [
		{#if menu}
			<code>{menu}</code>
		{/if}
		]
	</p>

	<div slot="props" class="layout alignment-top-space-around">
		<div>
			<Radio bind:group={origin} value={'bottom left'}>bottom left</Radio>
			<Radio bind:group={origin} value={'bottom right'}>bottom right</Radio>
			<Radio bind:group={origin} value={'top left'}>top left</Radio>
			<Radio bind:group={origin} value={'top right'}>
				<span title="default">top right *</span>
			</Radio>
		</div>

		<div class="properties">
			<label style="display: block;">
				<input class="numeric" type="number" bind:value={dx} />
				<span>dx, px</span>
			</label>
			<label style="display: block;">
				<input class="numeric" type="number" bind:value={dy} />
				<span>dy, px</span>
			</label>
			<label style="display: block;">
				<input class="numeric" type="number" bind:value={width} min="0" max="6" />
				<span>width * 56</span>
			</label>
		</div>
	</div>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Menu, Menuitem, Icon, Button, Radio } from '../../../../src';
	import { arrowDropDown } from '../icons';

	let menu;
	let origin = 'top left';
	let dx = 0;
	let dy = 0;
	let width = 2;
</script>

<style>
	input {
		width: 4rem;
	}
</style>
