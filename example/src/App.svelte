<svelte:window on:scroll|passive={onScroll} on:resize|passive={onResize} />

<svelte:head>
	<title>svelte-ui{titlePage ? `: ${titlePage}` : ''}</title>
</svelte:head>

<AppBar
	fade={offsetTop > 36}
	bind:leftPanelVisible
	bind:rightPanelVisible
	bind:loginDialogVisible
/>

<LeftPanel bind:visible={leftPanelVisible} currentPath={ctx ? ctx.path : null} {sitenav} />

<RightPanel bind:visible={rightPanelVisible} />

<LoginDialog bind:visible={loginDialogVisible} bind:username bind:password />

<main>
	{#if maxWidth > 720}
		<div class="nav-panel" transition:fly={{ x: -224, duration: 150, easing: linear }}>
			<Nav routes={sitenav} currentPath={ctx ? ctx.path : null} />
		</div>
	{/if}

	<div class="page">
		{#if page}
			{#if titlePage}
				<h3>{titlePage}</h3>
			{/if}

			<svelte:component this={page.default || page} {...ctx} />

			{#if maxWidth < 721 && ctx.path === '/'}
				<div
					class="explore"
					tabindex="0"
					on:click={() => {
						leftPanelVisible = true;
					}}
					on:keydown={onKeyDown}
				>
					<span>Explore components</span>
					<Icon path={arrowForward} />
				</div>
			{/if}
		{/if}
	</div>
</main>

<script>
	export let page = null;
	export let titlePage = null;
	export let ctx = null;

	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	import { Icon } from '/../../src';
	import { arrowForward } from '/components/icons';

	import AppBar from '/components/AppBar.svelte';
	import LeftPanel from '/components/LeftPanel.svelte';
	import RightPanel from '/components/RightPanel.svelte';
	import LoginDialog from '/components/LoginDialog.svelte';
	import Nav from '/components/nav';

	import sn from '/sitenav';

	let sitenav = sn;

	let maxWidth = 720;
	let offsetTop = 0;
	let leftPanelVisible = false;
	let rightPanelVisible = false;
	let loginDialogVisible = false;
	let username = '';
	let password = '';

	onMount(async () => {
		onResize();
	});

	function onKeyDown(e) {
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.stopPropagation();
			e.preventDefault();

			leftPanelVisible = true;
		}
	}

	function onResize() {
		maxWidth =
			window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		if (maxWidth > 720) {
			delete sitenav[0].name;
			leftPanelVisible = false;
		} else {
			sitenav[0].name = 'Home';
		}
	}

	function onScroll() {
		offsetTop = window.pageYOffset || document.documentElement.scrollTop;
	}
</script>

<style>
	main {
		margin: 48px auto 0;
		min-width: 256px;
		max-width: 1200px;
		padding: 1rem;
	}
	.page {
		margin-left: 224px;
		transition: 0.15s linear;
	}
	:global(.page) h3:first-child {
		margin-top: 0;
	}
	.nav-panel {
		position: fixed;
		top: 64px;
		width: 200px;
		min-width: 200px;
		padding: 8px 0;
		border-radius: 4px;
		background: var(--bg-panel);
		border: 1px solid var(--divider);
	}

	.explore {
		position: relative;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		color: inherit;
		margin: 2rem 0;
		padding: 0 1rem 0 1.2rem;
		height: 3.5rem;
		border: 1px solid var(--border);
		text-decoration: none;
		outline: none;
	}
	.explore::-moz-focus-inner {
		border: 0;
	}
	.explore:-moz-focusring {
		outline: none;
	}
	.explore span {
		padding-right: 1rem;
	}
	.explore:before {
		background-color: currentColor;
		color: inherit;
		bottom: 0;
		content: '';
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	}
	@media (hover: hover) {
		.explore:hover:before {
			opacity: 0.15;
		}
		:global(.focus-visible).explore:focus::before {
			opacity: 0.3;
		}
	}

	@media only screen and (min-width: 721px) {
		:global(#hamburger) {
			display: none;
		}
		:global(#brand) {
			display: block;
		}
	}
	@media only screen and (max-width: 720px) {
		.page {
			margin-left: 0;
		}
		:global(#brand) {
			display: none;
		}
		:global(#hamburger) {
			display: block;
		}
	}
</style>
