<svelte:window on:scroll={onScroll} on:resize|passive={onScroll} />

<nav class={classes} style={`top: ${top}px;width: ${width}px;${style}`} bind:this={el}>
	<Nav {routes} />
</nav>

<script>
	export let classes = '';
	export let style = '';
	export let width = 236;
	export let top = 20;
	export let routes = [];

	import { onMount } from 'svelte';
	import Nav from './Nav.svelte';

	let el;

	function onScroll() {
		try {
			const rc = el.getClientRects()[0];
			let maxHeight = window.innerHeight - rc.top - 24;

			el.style.maxHeight = maxHeight + 'px';
		} catch (err) {} // eslint-disable-line
	}

	onMount(() => {
		onScroll();
	});
</script>

<style>
	nav {
		box-sizing: border-box;
		position: sticky;
		float: left;
		left: auto;
		overflow-x: hidden;
		overflow-y: auto;
		overscroll-behavior: none;
		padding: 8px 0;
		border-radius: 4px;
		background: #fff;
		background: var(--bg-panel);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border: 1px solid var(--divider);
	}
	nav::-webkit-scrollbar {
		height: 4px;
		width: 4px;
	}
	nav::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.375);
		background: var(--border);
	}
</style>
