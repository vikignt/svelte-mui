<button
	{id}
	class={'btn ' + classes}
	class:baseline={!(raised || unelevated || outlined)}
	class:raised
	class:outlined={outlined && !(raised || unelevated)}
	class:shaped={shaped && !icon}
	class:dense
	class:fab={fab && icon}
	class:icon-button={icon}
	style={computedStyle}
	{tabindex}
	disabled={disabled ? 'true' : null}
	{title}
	bind:this={el}
	on:click
>
	{#if icon && typeof icon === 'boolean'}
		<slot />
	{:else if icon}
		<Icon {scale} content={icon} />
	{:else}
		{#if left}
			<Icon {scale} content={left} style="margin: 0 8px 0 -4px;" />
		{/if}

		<slot />

		{#if right}
			<Icon {scale} content={right} style="margin: 0 -4px 0 8px;" />
		{/if}
	{/if}

	{#if ripple}
		<Ripple center={icon} circle={icon} />
	{/if}
</button>

<script>
	import { tick, onMount, afterUpdate } from 'svelte';
	import { isLegacy, luminance } from './lib/colors';
	import Icon from './Icon.svelte';
	import Ripple from './Ripple.svelte';

	export let id = null;
	export let classes = '';
	export let style = null;
	export let tabindex = 0;
	export let disabled = false;
	export let title = null;

	export let icon = false;
	export let fab = false;

	export let dense = false;
	export let raised = false;
	export let unelevated = false;
	export let outlined = false;

	export let shaped = false;
	export let left = null;
	export let right = null;

	export let color = null;
	export let ripple = true;

	$: scale = icon ? (fab ? 1 : dense ? 0.8333 : 1) : dense ? 0.6667 : 0.75;
	$: computedStyle = `background: ${raised || unelevated ? color : 'transparent'};${style}`;
	$: if (color === 'primary') {
		color = legacy ? '#1976d2' : 'var(--primary, #1976d2)';
	} else if (color == 'accent') {
		color = legacy ? '#f50057' : 'var(--accent, #f50057)';
	} else if (!color) {
		color = legacy ? '#333' : 'var(--color, #333)';
	}

	let el;
	let legacy = false;

	onMount(async () => {
		await tick();
		legacy = isLegacy();
	});

	afterUpdate(() => {
		if (!el) return;
		if (raised || unelevated) {
			let bg = window.getComputedStyle(el).getPropertyValue('background-color');
			let lum = luminance(bg);
			el.style.color = lum > 0.5 ? '#000' : '#fff';
		} else {
			el.style.color = color;
		}
	});
</script>

<style>
	button:disabled {
		cursor: default;
	}
	button {
		cursor: pointer;
		font-family: var(--button-font-family, 'Roboto', Helvetica, sans-serif);
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.75px;
		text-decoration: none;
		text-transform: uppercase;
		will-change: transform, opacity;
		padding: 0 16px;
		display: -ms-inline-flexbox;
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		height: 36px;
		border: none;
		outline: none;
		line-height: inherit;
		user-select: none;
		-webkit-appearance: none;
		overflow: hidden;
		vertical-align: middle;
		border-radius: 4px;
	}
	button::-moz-focus-inner {
		border: 0;
	}
	button:-moz-focusring {
		outline: none;
	}
	button:before {
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

	.raised {
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	}
	.outlined {
		padding: 0 14px;
		border-style: solid;
		border-width: 2px;
	}
	.shaped {
		border-radius: 18px;
	}
	.dense {
		height: 32px;
	}

	.icon,
	.icon-button {
		line-height: 0.5;
	}

	.icon.left {
		margin: 0 8px 0 -4px;
	}
	.icon.right {
		margin: 0 -4px 0 8px;
	}

	.icon-button {
		border-radius: 50%;
		padding: 8px;
		width: auto;
		height: auto;
		vertical-align: middle;
	}
	.icon-button.outlined {
		padding: 6px;
	}
	.icon-button.fab {
		border: none;
		width: 56px;
		height: 56px;
		box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
	}
	.icon-button.fab.dense {
		width: 40px;
		height: 40px;
	}

	.outlined:not(.shaped) :global(.ripple) {
		border-radius: 0 !important;
	}

	@media (hover: hover) {
		button:hover:not([disabled]):not(.disabled):before {
			opacity: 0.15;
		}
		:global(.focus-visible).btn:focus:not([disabled]):not(.disabled):before {
			opacity: 0.3;
		}
	}
</style>
