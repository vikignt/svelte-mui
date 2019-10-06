<div on:click style={`${level > 0 ? 'font-size: 92.857%;' : ''}`}>
	{#each routes as route, i}
		<a class="nav-item" href={route.href} style={`padding-left: ${12 * (level + 1)}px;`}>
			<span class="nav-title">{route.name}</span>
			{#if route.children}
				<Icon content={expandMore} style="padding: 6px;" scale="0.833334" color="#bbb" flip={open ? 'v' : null} />
			{/if}
			<Ripple />
		</a>

		{#if route.children && open}
			<svelte:self routes={route.children} level={level + 1} />
		{/if}
	{/each}
</div>

<script>
	export let routes = [];
	export let level = 0;

	import { Icon, Ripple } from '/src';
	import { expandMore } from './icons';

	let open = true;
</script>

<style>
	div {
		font-family: var(--code-font-family, "Roboto Mono", Menlo, Consolas, monospace);
		font-size: 14px;
		margin: 0;
		padding: 0;
		position: relative;
		overflow-x: hidden;
		overflow-y: visible;
	}

	a.nav-item {
		position: relative;
		box-sizing: border-box;
		color: inherit;
		cursor: pointer;
		display: flex;
		align-items: center;
		padding-left: 16px;
		padding-right: 4px;
		min-height: 32px;
		width: 100%;
		text-decoration: none;
		outline: none;
	}
	.nav-item:focus {
		outline: none;
	}
	.nav-item::-moz-focus-inner {
		border: 0;
	}
	.nav-item:-moz-focusring {
		outline: none;
	}
	.nav-item:before {
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
	.nav-title {
		flex-grow: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-rendering: auto;
	}

	@media (hover: hover) {
		.nav-item:hover:not([disabled]):not(.disabled):before {
			opacity: 0.15;
		}
		:global(.focus-visible).nav-item:focus:not([disabled]):not(.disabled):before {
			opacity: 0.3;
		}
	}
</style>
