<svelte:window on:scroll|passive={onScroll} />

<div class="app clearfix">
	<blockquote>Adequate opportunities under the condition of limited resources</blockquote>

	<div class="app-bar layout alignment-center-left" bind:this={appBar}>
		<Button
			id="hamburger"
			icon={menu}
			color="inherit"
			on:click={() => {
				lspVisible = true;
			}}
		/>
		<a id="brand" class="icon" target="_blank" href="https://svelte.dev">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 103 124" fill="currentcolor">
				<svelte:component this={svelte} />
			</svg>
		</a>

		<div class="grow">Simple Components</div>

		{#if !isLegacy()}
			<Button icon={invertColors} on:click={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
		{/if}

		<div style="font-size: 16px;">
			<Menu dx="4" dy="4">
				<span slot="activator" style="margin-right: 6px;display:block;">
					<Button icon={moreVert} color="inherit" />
				</span>

				<Menuitem disabled={isLegacy()} on:click={(e) => setTheme(e.target.textContent)}>{theme === 'dark' ? 'Light' : 'Dark'}</Menuitem>
				<Menuitem on:click={() => (rspVisible = true)} ripple={false} title="Item Menu withowt Ripple">Help</Menuitem>
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
	</div>

	<Sidepanel bind:visible={lspVisible} disableScroll>
		<div class="logo">
			<Button
				icon={arrowBack}
				color="inherit"
				on:click={() => {
					lspVisible = false;
				}}
			/>
			<span style="margin-left:4px;">Logo</span>
		</div>

		<div style="padding: 8px 0;">
			<Nav
				{routes}
				on:click={() => {
					lspVisible = false;
				}}
			/>
		</div>
	</Sidepanel>

	<Sidepanel right bind:visible={rspVisible}>
		<div class="logo" style="padding-left: 1rem;">Help</div>
		<p>
			<i style="padding: 12px;">Blank</i>
		</p>
		<div class="about">v0.0.1</div>
	</Sidepanel>

	<Dialog width="290" bind:visible={loginDialogVisible}>
		<div slot="title"> Welcome!</div>

		<Textfield name="username" autocomplete="off" required bind:value={username} label="username" message="Your account name" />
		<Textfield type="password" name="password" autocomplete="off" required bind:value={password} label="password" message="Your password" />

		<div slot="actions" class="actions center">
			<Button color="primary" disabled>Submit</Button>
		</div>

		<div slot="footer" style="text-align: center;margin-bottom: 1rem;font-size: 13px;">
			Don't have account?
			<a href="/#singup" class="disabled" style="color: #f50057;padding-left: 1rem;">Sing Up</a>
		</div>
	</Dialog>

	<div class="warning">
		<p>
			<em>WARNING</em>
		</p>
		<p>This is a demo of work in progress...</p>
	</div>

	<NavPanel classes="nav-panel" top="68" width="200" {routes} />

	<div class="page">
		<h2 style="padding: 3.2rem 0 8px;margin-bottom: 0;">Components</h2>
		<hr />

		<section>
			<article>
				<h3 id="button">Button</h3>
				<ButtonDemo {theme} />
			</article>

			<article>
				<h3 id="check-box">Checkbox</h3>
				<CheckboxDemo />
			</article>

			<article>
				<h5 id="check-box-group">Checkbox Group</h5>
				<CheckboxGroupDemo />
			</article>

			<article>
				<h3 id="dialog">Dialog</h3>
				<DialogDemo bind:visible={loginDialogVisible} />
			</article>

			<article>
				<h3 id="icon">Icon</h3>
				<IconDemo />
			</article>

			<article>
				<h3 id="menu">Menu</h3>
				<MenuDemo />
			</article>

			<article>
				<h3 id="radio-button">Radio Button</h3>
				<RadioDemo />
			</article>

			<article>
				<h3 id="ripple">Ripple</h3>
				<RippleDemo />
			</article>

			<article>
				<h3 id="side-panel">Side Panel</h3>
				<SidepanelDemo bind:lpanel={lspVisible} bind:rpanel={rspVisible} />
			</article>

			<article>
				<h3 id="snackbar">Snackbar</h3>
				<SnackbarDemo />
			</article>

			<article>
				<h3 id="textfield">Textfield</h3>
				<TextfieldDemo />
			</article>
		</section>
	</div>
</div>

<script>
	export let routes = [];

	import { tick, onMount } from 'svelte';
	import NavPanel from './components/NavPanel.svelte';
	import Nav from './components/Nav.svelte';

	import { arrowBack, invertColors, menu, moreVert } from './components/icons';
	import svelte from './components/icons/svelte.svelte';

	import { Button, Dialog, Menu, Menuitem, Sidepanel, Textfield } from '../../src';

	import ButtonDemo from './components/demo/Button.svelte';
	import CheckboxDemo from './components/demo/Checkbox.svelte';
	import CheckboxGroupDemo from './components/demo/CheckboxGroup.svelte';
	import DialogDemo from './components/demo/Dialog.svelte';
	import IconDemo from './components/demo/Icon.svelte';
	import MenuDemo from './components/demo/Menu.svelte';
	import RadioDemo from './components/demo/Radio.svelte';
	import RippleDemo from './components/demo/Ripple.svelte';
	import SidepanelDemo from './components/demo/Sidepanel.svelte';
	import SnackbarDemo from './components/demo/Snackbar.svelte';
	import TextfieldDemo from './components/demo/Textfield.svelte';

	let appBar;
	let lspVisible = false;
	let rspVisible = false;
	let loginDialogVisible = false;

	let username = '';
	let password = '';

	let theme = 'light';
	let themeDark = {
		'--color': '#eee',
		'--alternate': '#000',
		'--bg-color': '#303134',
		'--primary': '#3ea6ff',
		'--accent': '#ff6fab',
		'--divider': 'rgba(255,255,255,0.175)',
		'--bg-popover': '#3f3f3f',
		'--border': 'rgba(255,255,255,0.5)',
		'--label': 'rgba(255,255,255,0.5)',
		'--bg-input-filled': 'rgba(255,255,255,0.1)',

		'--bg-app-bar': '#888',
		'--bg-panel': '#434343',
	};

	onMount(async () => {
		await tick();
		try {
			let mql = window.matchMedia('(prefers-color-scheme: dark)');
			mql.matches && setTheme('dark');
		} catch (err) {} // eslint-disable-line
	});

	function setTheme(name) {
		name = name.replace(/\s/g, '').toLowerCase();

		theme = name;
		theme === 'dark'
			? Object.keys(themeDark).map((key) => {
					document.documentElement.style.setProperty(key, themeDark[key]);
			  })
			: document.documentElement.removeAttribute('style');
	}

	function onScroll() {
		let offsetTop;

		if (appBar) {
			offsetTop = window.pageYOffset || document.documentElement.scrollTop;

			offsetTop > 36 ? (appBar.style.boxShadow = '0 1px 6px rgba(0, 0, 0, .12), 0 1px 6px rgba(0, 0, 0, .18)') : (appBar.style.boxShadow = '');
		}
	}

	function isLegacy() {
		return !(window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)'));
	}
</script>

<style>
	.app {
		margin: 48px auto 0;
		min-width: 256px;
		max-width: 1200px;
		padding: 20px;
		position: relative;
	}
	.app-bar {
		height: 48px;
		color: #fff;
		background: #888;
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
	.app-bar .grow {
		margin-left: 4px;
	}
	#brand {
		margin-top: -2px;
		margin-right: 2px;
	}
	@media only screen and (min-width: 721px) {
		.nav-panel + .page {
			margin-left: 224px;
		}
		:global(#hamburger) {
			display: none;
		}
		:global(#brand) {
			display: block;
		}
	}
	@media only screen and (max-width: 720px) {
		:global(.nav-panel),
		:global(#brand) {
			display: none;
		}
		:global(#hamburger) {
			display: block;
		}
	}

	.warning {
		background: #eee;
		background: var(--bg-panel);
		border-left: 4px solid #fdd835;
		margin: 16px 0;
		padding: 8px;
		font-size: 14px;
	}

	h2,
	h3,
	h5 {
		margin-top: -2.8rem;
		padding-top: 4.2rem;
		margin-bottom: 1rem;
	}

	article {
		max-width: 800px;
	}

	article {
		margin-bottom: 4rem;
	}

	.logo {
		height: 48px;
		padding: 0 4px;
		display: flex;
		align-items: center;
		color: #fff;
		background: #888;
		background: var(--bg-app-bar);
	}
	.about {
		position: absolute;
		bottom: 0;
		color: rgba(0, 0, 0, 0.1);
		color: var(--divider);
		font-size: 8px;
		padding: 2px;
	}

	blockquote {
		margin: 0;
		font-style: italic;
		padding: 1.2rem 32px;
		border-left: 4px solid #78c0a8;
		line-height: 1.6;
		position: relative;
		background: #eee;
		background: var(--bg-panel);
	}
	blockquote::before {
		content: '\201C';
		color: #78c0a8;
		font-size: 3em;
		position: absolute;
		left: 2px;
		top: -10px;
	}
	blockquote::after {
		content: '';
	}
</style>
