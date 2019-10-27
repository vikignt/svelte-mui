```xml
<Menu origin="top left">
	<div slot="activator">
		<Button color="primary" outlined ripple={false} style="padding-right: 4px;">
			<span>Menu</span>
			<Icon content={arrowDropDown} />
		</Button>
	</div>

	<Menuitem on:click={onRefresh}>Refresh</Menuitem>
	<Menuitem on:click={onFeedback}>Send feedback</Menuitem>
	<Menuitem on:click={onSettings} disabled>Settings</Menuitem>
	<Menuitem on:click={onHelp}>Help</Menuitem>
	<Menuitem on:click={onSignIn}>Sign In</Menuitem>
	<hr />
	<Menuitem href="https://svelte.dev" target="_blank">Svelte</Menuitem>
</Menu>

<script>
	import { Menu, Menuitem, Button, Icon } from '@vikignt/svelte-ui';
	import { arrowDropDown } from '/components/icons';
</script>
```
