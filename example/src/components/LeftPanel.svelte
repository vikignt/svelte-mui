<Sidepanel bind:visible disableScroll>
	<div class="logo">
		<Button
			icon
			color="inherit"
			on:click={() => {
				visible = false;
			}}
		>
			<Icon path={arrowBack} />
		</Button>
		<span style="margin-left:4px;">Logo</span>
	</div>

	<div style="padding: 8px 0;">
		<Nav
			routes={sitenav}
			{currentPath}
			on:click={() => {
				visible = false;
			}}
		/>
	</div>
</Sidepanel>

<script>
	export let visible = false;
	export let currentPath = '';
	export let sitenav = [];

	import { Button, Icon, Sidepanel } from '/../../src';

	import { arrowBack } from '/components/icons';
	import Nav from '/components/nav';
</script>

<style>
	.logo {
		height: 48px;
		padding: 0 4px;
		display: flex;
		align-items: center;
		color: #fff;
		background: var(--bg-app-bar);
	}
</style>
