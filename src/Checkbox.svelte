<label class:right class:disabled class={classes} {title}>
	<input type="checkbox" {id} {name} bind:this={inputEl} bind:checked bind:indeterminate {value} {tabindex} disabled={disabled ? 'true' : null} on:change={groupUpdate} on:change />
	<div class="mark" style={`color: ${indeterminate || checked ? color : '#9a9a9a'}`}>
		<Icon content={indeterminate ? checkboxIndeterminate : checked ? checkbox : checkboxOutline} />
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
	import { isLegacy } from './lib/colors';

	export let id = null;
	export let name = null;
	export let classes = '';
	export let tabindex = 0;
	export let disabled = false;
	export let title = null;

	export let checked = false;
	export let value = 'on';
	export let group = null;
	export let indeterminate = false;
	export let ripple = true;
	export let label = '';
	export let right = false;
	export let color = 'primary'; // primary, accent, currentColor, inherit

	import { tick, onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import Ripple from './Ripple.svelte';

	let inputEl;
	let legacy = false;
	let checkbox = 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
	let checkboxOutline = 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z';
	let checkboxIndeterminate = 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z';

	$: if (group !== null) {
		groupCheck();
	}

	$: if (color === 'primary' || !color) {
		color = legacy ? '#1976d2' : 'var(--primary, #1976d2)';
	} else if (color === 'accent') {
		color = legacy ? '#f50057' : 'var(--accent, #f50057)';
	}

	function groupCheck() {
		setTimeout(() => {
			checked = group.indexOf(value) >= 0;
		}, 0);
	}

	function groupUpdate(/*e*/) {
		if (group !== null) {
			let i = group.indexOf(value);
			if (checked) {
				if (i < 0) {
					group.push(value);
				}
			} else if (i >= 0) {
				group.splice(i, 1);
			}
			group = group;
		}
	}

	onMount(async () => {
		await tick();
		legacy = isLegacy();
	});
</script>

<style>
	label {
		width: 100%;
		align-items: center;
		display: flex;
		margin: 0;
		position: relative;
		cursor: pointer;
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
		background-color: currentColor;
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
