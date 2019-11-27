<DemoPanel>
	<Menu style="border-radius: 4px;" {origin} {dx} {dy} width={width * 56}>
		<div slot="activator">
			<Button color="primary" outlined ripple={false} style="padding-right: 4px;">
				<span>Menu</span>
				<Icon path={arrowDropDown} />
			</Button>
		</div>

		<Menuitem on:click={() => (menu = 'Refresh')}>Refresh</Menuitem>
		<Menuitem on:click={() => (menu = 'Send feedback')}>Send feedback</Menuitem>
		<Menuitem on:click={() => (menu = 'Settings')} disabled>Settings</Menuitem>
		<Menuitem on:click={() => (menu = 'Help')}>Help</Menuitem>
		<Menuitem on:click={() => (menu = 'Sign In')}>Sign In</Menuitem>
		<hr />
		<Menuitem href="https://svelte.dev" target="_blank">Svelte</Menuitem>
	</Menu>

	<p class="result" slot="result">
		Value: [
		{#if menu}
			<code>{menu}</code>
		{/if}
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
		<Radio bind:group={origin} value={'bottom left'}>bottom left</Radio>
		<Radio bind:group={origin} value={'bottom right'}>bottom right</Radio>
		<Radio bind:group={origin} value={'top left'} title="default">top left *</Radio>
		<Radio bind:group={origin} value={'top right'}>top right</Radio>
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
</Play>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Menu, Menuitem, Icon, Button, Radio } from '/../../src';
	import { arrowDropDown } from '/components/icons';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let menu;
	let origin = 'top left';
	let dx = 0;
	let dy = 0;
	let width = 2;
</script>

<style>
	input {
		width: 4rem;
		font-family: inherit;
		font-size: inherit;
		color: var(--color);
		background: var(--bg-color);
		padding: 6px;
		margin: 4px 0 4px 0;
		border: 1px solid var(--divider);
		border-radius: 2px;
	}
</style>
