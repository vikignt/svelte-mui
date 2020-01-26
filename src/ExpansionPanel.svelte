<div class={'panel ' + className} class:dense class:active {...attrs} use:events>
	<button class="header" class:rotate {disabled} on:click={onclick}>
		<span>{name}</span>
		<slot name="icon">
			<i class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
					fill="currentColor"
				>
					<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
				</svg>
			</i>
		</slot>
	</button>

	{#if active}
		<div class="content" transition:slide|local={{ duration: 250 }}>
			<slot />
		</div>
	{/if}
</div>

<script>
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';

	const events = getEventsAction(current_component);
	const dispatch = createEventDispatcher();

	export { className as class, name, group, dense, rotate, expand, disabled };

	let className = '';
	let name = '?';
	let group = '';
	let dense = false;
	let rotate = true;
	let expand = false;
	let disabled = false;

	let attrs = {};
	$: {
		/* eslint-disable no-unused-vars */
		const { name, group, dense, rotate, expand, disabled, ...other } = $$props;

		delete other.class;
		attrs = other;
	}

	$: if (expand) {
		group = name;
	}
	$: active = group === name;
	$: dispatch('change', { expanded: active, name });

	function onclick(e) {
		group = group === name ? '' : name;
		e.target.classList.remove('focus-visible');
	}
</script>

<style>
	.panel {
		position: relative;
		box-sizing: border-box;
		background: var(--bg-color, #fbfbfb);
		box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
			0px 1px 3px 0px var(--border, #dfdfdf);
		transition: margin 0.25s;
	}
	.panel::before {
		position: absolute;
		top: -1px;
		left: 0;
		right: 0;
		height: 1px;
		content: '';
		background-color: var(--divider, rgba(0, 0, 0, 0.1));
	}
	.panel:first-child {
		border-top: none;
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}
	.panel:last-child {
		border-bottom-left-radius: inherit;
		border-bottom-right-radius: inherit;
	}
	.panel:first-child::before {
		display: none;
	}
	.panel.active:not(:first-child):not(.dense),
	.panel.active:not(.dense) + .panel {
		margin-top: 16px;
	}
	.panel.active:not(.dense)::before {
		display: none;
	}
	.panel.active:not(.dense) + .panel:before {
		display: none;
	}

	.header {
		display: flex;
		align-items: flex-start;
		width: 100%;
		min-height: 48px;
		cursor: pointer;
		background: none;
		color: inherit;
		font-size: 16px;
		line-height: 1;
		border: 2px solid transparent;
		outline: none;
		margin: 0;
		padding: 10px 22px;
		text-align: left;
		outline: none;
		transition: min-height 0.25s;
	}
	.header:active {
		background: none;
	}
	.header span {
		flex: 1;
		line-height: 24px;
	}
	.icon {
		display: inline-block;
		line-height: 0.5;
	}
	.panel :global(.icon) {
		transition: 0.25s linear;
	}

	.active .header {
		min-height: 64px;
	}
	.active .rotate :global(.icon) {
		transform: rotate(-180deg);
	}

	.content {
		overflow: auto;
		margin: 0;
		padding: 0 24px 16px;
	}

	@media (hover: hover) {
		.header.focus-visible:focus:not([disabled]):not(.disabled) {
			outline: none;
			border: 2px solid var(--focus-color, rgba(25, 118, 210, 0.5));
		}
	}
</style>
