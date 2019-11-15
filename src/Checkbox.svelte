<label class:right class:disabled class={className} {style} {title}>
	<input
		type="checkbox"
		bind:checked
		bind:indeterminate
		{value}
		on:change={groupUpdate}
		use:events
		{...attrs}
	/>
	<div class="mark" style={`color: ${indeterminate || checked ? color : '#9a9a9a'}`}>
		<Icon path={indeterminate ? checkboxIndeterminate : checked ? checkbox : checkboxOutline} />
		{#if ripple}
			<Ripple center circle />
		{/if}
	</div>

	<div class="label-text">
		<slot />
	</div>
</label>

<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import { islegacy } from './lib/colors';
	import Icon from './Icon.svelte';
	import Ripple from './Ripple.svelte';

	const events = getEventsAction(current_component);

	export {
		checked,
		className as class,
		style,
		color,
		disabled,
		group,
		indeterminate,
		right,
		ripple,
		title,
		value,
	};

	let checked = false;
	let className = '';
	let style = null;
	let color = 'primary'; // primary, accent, currentColor, inherit
	let disabled = false;
	let group = null;
	let indeterminate = false;
	let right = false;
	let ripple = true;
	let title = null;
	let value = 'on';

	let attrs = {};

	$: {
		/* eslint-disable no-unused-vars */
		const {
			checked,
			style,
			color,
			group,
			indeterminate,
			right,
			ripple,
			title,
			value,
			...other
		} = $$props;

		!other.disabled && delete other.disabled;
		delete other.class;
		attrs = other;
	}

	let checkbox =
		'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
	let checkboxOutline =
		'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z';
	let checkboxIndeterminate =
		'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z';

	$: if (group !== null) {
		groupCheck();
	}

	$: if (color === 'primary' || !color) {
		color = islegacy() ? '#1976d2' : 'var(--primary, #1976d2)';
	} else if (color === 'accent') {
		color = islegacy() ? '#f50057' : 'var(--accent, #f50057)';
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
