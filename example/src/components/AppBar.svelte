<div class="app-bar" bind:this={el}>
	<Button
		icon
		id="hamburger"
		color="inherit"
		on:click={() => {
			leftPanelVisible = true;
		}}
	>
		<Icon path={menu} />
	</Button>

	<a id="brand" class="icon" href="/">
		<Icon path={home} />
	</a>

	<div class="title">Simple Components</div>

	{#if !legacy}
		<Button icon on:click={() => setTheme($theme === 'dark' ? 'light' : 'dark')}>
			<Icon path={invertColors} />
		</Button>
	{/if}
	<a class="icon" rel="noreferrer" target="_blank" href="https://github.com/vikignt/svelte-mui">
		<Icon
			path="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
			0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633
			17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809
			1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
			0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267
			1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24
			2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81
			2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24
			12.297c0-6.627-5.373-12-12-12"
		/>
	</a>
	<Menu style="border-radius: 4px;" origin="top right" dx="4" dy="4">
		<span slot="activator" style="margin-right: 6px;display:block;">
			<Button icon color="inherit">
				<Icon path={moreVert} />
			</Button>
		</span>
		<Menuitem disabled={legacy} on:click={(e) => setTheme(e.target.textContent)}>
			{$theme === 'dark' ? 'Light' : 'Dark'}
		</Menuitem>
		<Menuitem
			on:click={() => (rightPanelVisible = true)}
			ripple={false}
			title="Item Menu withowt Ripple"
		>
			Help
		</Menuitem>
		<hr />
		<Menuitem
			on:click={() => {
				loginDialogVisible = true;
			}}
		>
			Login
		</Menuitem>
	</Menu>
</div>

<script>
	export let fade = false;
	export let leftPanelVisible = false;
	export let rightPanelVisible = false;
	export let loginDialogVisible = false;

	import { onMount } from 'svelte';

	import { Button, Icon, Menu, Menuitem } from '/../../src';
	import { home, menu, invertColors, moreVert } from '/components/icons';

	import { theme } from '/store';

	let el;
	let legacy = true;

	const darkTheme = {
		'--color': '#eee',
		'--alternate': '#000',
		'--bg-color': '#303134',
		'--primary': '#3ea6ff',
		'--accent': '#ff6fab',
		'--divider': 'rgba(255,255,255,0.175)',
		'--bg-popover': '#3f3f3f',
		'--border': '#555',
		'--label': 'rgba(255,255,255,0.5)',
		'--bg-input-filled': 'rgba(255,255,255,0.1)',

		'--bg-app-bar': '#838383',
		'--bg-panel': '#434343',

		'--focus-color': 'rgba(62, 166, 255, 0.5)', // primary with alpha
	};

	$: if (el) {
		fade
			? (el.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,.2), 0 2px 6px 2px rgba(0,0,0,.18)')
			: (el.style.boxShadow = '');
	}

	onMount(async () => {
		try {
			legacy = !(window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)'));

			let mql = window.matchMedia('(prefers-color-scheme: dark)');
			mql.matches && setTheme('dark');
		} catch (err) {} // eslint-disable-line
	});

	function setTheme(name) {
		name = name.replace(/\s/g, '').toLowerCase();

		$theme = name;
		$theme === 'dark'
			? Object.keys(darkTheme).map((key) => {
					document.documentElement.style.setProperty(key, darkTheme[key]);
			  })
			: document.documentElement.removeAttribute('style');
	}
</script>

<style>
	.app-bar {
		display: flex;
		align-items: center;
		height: 48px;
		color: #fff;
		background: var(--bg-app-bar);
		font-size: 18px;
		line-height: 1;
		min-width: inherit;
		padding: 0 4px 0 6px;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		z-index: 20;
	}
	.title {
		flex: 1;
		margin-left: 0.5rem;
	}
</style>
