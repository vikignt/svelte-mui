<label class:right class:disabled class={classes} {title}>
	<input type="radio" {id} {name} {tabindex} {value} bind:group disabled={disabled ? 'true' : null} on:change />
	<div class="mark" style={`color: ${value === group ? color : '#9a9a9a'}`}>
		<Icon content={group === value ? radioChecked : radioUnchecked} />
		{#if ripple}
			<Ripple center circle />
		{/if}
	</div>

	<div class="label-text">
		{#if label}
			{label}
		{:else}
			<slot />
		{/if}
	</div>
</label>

<script>
	export let id = null;
	export let name = null;
	export let classes = '';
	export let tabindex = 0;
	export let disabled = false;
	export let title = null;

	export let value;
	export let group;
	export let ripple = true;
	export let label = '';
	export let right = false;
	export let color = 'primary'; // primary, accent, currentColor, inherit

	import Icon from './Icon.svelte';
	import Ripple from './Ripple.svelte';

	import { isLegacy } from './lib/colors';

	let radioChecked = 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
	let radioUnchecked = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';

	$: if (color === 'primary' || !color) {
		color = isLegacy() ? '#1976d2' : 'var(--primary, #1976d2)';
	} else if (color === 'accent') {
		color = isLegacy() ? '#f50057' : 'var(--accent, #f50057)';
	}
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
	}
	input {
		cursor: inherit;
		width: 0;
		height: 0;
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
