<label class:right class:disabled class={className} {style} {title}>
	<!-- {...attrs} don't work with bind:group, svelte bug? -->
	<input type="radio" {disabled} {value} bind:group bind:this={elm} use:events />
	<div class="mark" style={`color: ${value === group ? color : '#9a9a9a'}`}>
		<Icon path={group === value ? radioChecked : radioUnchecked} />
		{#if ripple}
			<Ripple center circle />
		{/if}
	</div>

	<div class="label-text">
		<slot />
	</div>
</label>

<script>
	import { tick, onMount } from 'svelte';
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import { islegacy } from './lib/colors';
	import Icon from './Icon.svelte';
	import Ripple from './Ripple.svelte';

	const events = getEventsAction(current_component);

	export { group, value, className as class, style, color, disabled, right, ripple, title };

	let group = null;
	let value = 'on';
	let className = '';
	let style = null;
	let color = 'primary'; // primary, accent, currentColor, inherit
	let disabled = false;
	let right = false;
	let ripple = true;
	let title = null;

	let elm;
	let attrs = {};

	$: {
		/* eslint-disable no-unused-vars */
		const { group, value, style, color, disabled, right, ripple, title, ...other } = $$props;

		delete other.class;
		attrs = other;
	}

	let radioChecked =
		'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
	let radioUnchecked =
		'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';

	$: if (color === 'primary' || !color) {
		color = islegacy() ? '#1976d2' : 'var(--primary, #1976d2)';
	} else if (color === 'accent') {
		color = islegacy() ? '#f50057' : 'var(--accent, #f50057)';
	}

	// NOTE: not reactive
	onMount(async () => {
		await tick();
		if (elm) {
			for (let name in attrs) {
				elm.setAttribute(name, attrs[name]);
			}
		}
	});
</script>

<style>
	label {
		cursor: pointer;
		width: 100%;
		align-items: center;
		display: flex;
		margin: 0;
		position: relative;
		line-height: 40px;
		user-select: none;
	}
	input {
		cursor: inherit;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		opacity: 0 !important;
	}
	.mark {
		display: flex;
		position: relative;

		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	.mark:before {
		background: currentColor;
		border-radius: inherit;
		bottom: 0;
		color: inherit;
		content: '';
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	}
	/* shake about one pixel on desktop safari (at least 12.1.2) with this transition */
	/* Safari 11+ hack */
	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) and (stroke-color: transparent) {
			.mark:before {
				transition: none;
			}
		}
	}

	.label-text {
		margin-left: 4px;
		white-space: nowrap;
		overflow: hidden;
	}
	.right .label-text {
		margin-left: 0;
		margin-right: auto;
		order: -1;
	}

	@media (hover: hover) {
		label:hover:not([disabled]):not(.disabled) .mark:before {
			opacity: 0.15;
		}
		:global(.focus-visible):focus:not([disabled]):not(.disabled) ~ .mark:before {
			opacity: 0.3;
		}
	}
</style>
