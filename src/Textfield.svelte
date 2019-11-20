<div
	class={`text-field ${outlined && !filled ? 'outlined' : 'baseline'} ${className}`}
	class:filled
	class:dirty
	class:disabled
	{style}
	{title}
>
	<input class="input" bind:value use:events {...attrs} />

	<div class="focus-ring" />
	<div class="label">
		{label}
		{#if required && !value.length}
			<span class="required">*</span>
		{/if}
	</div>
	{#if !outlined || filled}
		<div class="input-line" />
		<div class="focus-line" />
	{/if}

	{#if !!message || !!error}
		<div class="help" class:persist={messagePersist} class:error>
			<div class="message">{error || message}</div>
		</div>
	{/if}
</div>

<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';

	const events = getEventsAction(current_component);

	export {
		value,
		disabled,
		required,
		className as class,
		style,
		title,
		label,
		outlined,
		filled,
		messagePersist,
		message,
		error,
	};

	let value = '';
	let disabled = false;
	let required = false;
	let className = '';
	let style = null;
	let title = null;
	let label = '';
	let outlined = false;
	let filled = false;
	let messagePersist = false;
	let message = '';
	let error = '';

	let placeholder;

	let attrs = {};

	$: {
		/* eslint-disable no-unused-vars */
		const {
			value,
			style,
			title,
			label,
			outlined,
			filled,
			messagePersist,
			message,
			error,
			...other
		} = $$props;

		!other.readonly && delete other.readonly;
		!other.disabled && delete other.disabled;
		delete other.class;
		other.type = allowedTypes.indexOf(other.type) < 0 ? 'text' : other.type;
		placeholder = other.placeholder;
		attrs = other;
	}

	$: dirty =
		(typeof value === 'string' && value.length > 0) ||
		typeof value === 'number' ||
		placeholder ||
		dirtyTypes.indexOf(attrs.type) >= 0;

	const allowedTypes = [
		'date',
		'datetime-local',
		'email',
		'month',
		'number',
		'password',
		'search',
		'tel',
		'text',
		'time',
		'url',
		'week',
	];

	const dirtyTypes = ['date', 'datetime-local', 'month', 'time', 'week'];
</script>

<style>
	.text-field {
		font-family: Roboto, 'Segoe UI', sans-serif;
		font-weight: 400;
		font-size: inherit;
		text-decoration: inherit;
		text-transform: inherit;
		box-sizing: border-box;
		margin: 0 0 20px;
		position: relative;
		width: 100%;
		background-color: inherit;
		will-change: opacity, transform, color;
	}
	.outlined {
		margin-top: 12px;
	}
	.required {
		position: relative;
		top: 0.175em;
		left: 0.125em;
		color: #ff5252;
	}
	.input {
		box-sizing: border-box;
		font: inherit;
		width: 100%;
		min-height: 32px;
		background: none;
		text-align: left;
		color: #333;
		/* postcss-custom-properties: ignore next */
		color: var(--color, #333);
		caret-color: #1976d2;
		/* postcss-custom-properties: ignore next */
		caret-color: var(--primary, #1976d2);
		border: none;
		margin: 0;
		padding: 2px 0 0;

		outline: none;
	}
	.input::placeholder {
		color: rgba(0, 0, 0, 0.3755);
		/* postcss-custom-properties: ignore next */
		color: var(--label, rgba(0, 0, 0, 0.3755));
		font-weight: 100;
	}
	.input::-moz-focus-inner {
		padding: 0;
		border: 0;
	}
	.input:-moz-focusring {
		outline: none;
	}
	.input:required {
		box-shadow: none;
	}
	.input:invalid {
		box-shadow: none;
	}
	.input:active {
		outline: none;
	}
	.input:hover ~ .input-line {
		background: #333;
		/* postcss-custom-properties: ignore next */
		background: var(--color, #333);
	}
	.label {
		font: inherit;
		display: inline-flex;
		position: absolute;
		left: 0;
		top: 28px;
		padding-right: 0.2em;
		color: rgba(0, 0, 0, 0.3755);
		/* postcss-custom-properties: ignore next */
		color: var(--label, rgba(0, 0, 0, 0.3755));
		background-color: inherit;

		pointer-events: none;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;

		overflow: hidden;
		max-width: 90%;
		white-space: nowrap;

		transform-origin: left top;
		transition: 0.18s cubic-bezier(0.25, 0.8, 0.5, 1);
	}
	.focus-ring {
		pointer-events: none;
		margin: 0;
		padding: 0;
		border: 2px solid transparent;
		border-radius: 4px;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	.input-line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0;
		height: 1px;
		background: rgba(0, 0, 0, 0.3755);
		/* postcss-custom-properties: ignore next */
		background: var(--label, rgba(0, 0, 0, 0.3755));
	}
	.focus-line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		-webkit-transform: scaleX(0);
		/* autoprefixer: ignore next */
		transform: scaleX(0);
		/* autoprefixer: ignore next */
		transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1),
			-webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
		/* autoprefixer: ignore next */
		transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		z-index: 2;

		background: #1976d2;
		/* postcss-custom-properties: ignore next */
		background: var(--primary, #1976d2);
	}
	.help {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -18px;
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		line-height: normal;
		letter-spacing: 0.4px;
		color: rgba(0, 0, 0, 0.3755);
		/* postcss-custom-properties: ignore next */
		color: var(--label, rgba(0, 0, 0, 0.3755));
		opacity: 0;

		overflow: hidden;
		max-width: 90%;
		white-space: nowrap;
	}
	.persist,
	.error,
	.input:focus ~ .help {
		opacity: 1;
	}
	.error {
		color: #ff5252;
	}

	.baseline.dirty .label {
		letter-spacing: 0.4px;
		top: 6px;
		bottom: unset;
		font-size: 13px;
	}
	.baseline .input:focus ~ .label {
		letter-spacing: 0.4px;
		top: 6px;
		bottom: unset;
		font-size: 13px;
		color: #1976d2;
		/* postcss-custom-properties: ignore next */
		color: var(--primary, #1976d2);
	}
	.baseline .input:focus ~ .focus-line {
		transform: scaleX(1);
		opacity: 1;
	}

	.baseline .input {
		height: 52px;
		padding-top: 22px;
	}

	.baseline.filled {
		background: rgba(0, 0, 0, 0.0555);
		/* postcss-custom-properties: ignore next */
		background: var(--bg-input-filled, rgba(0, 0, 0, 0.0555));
		border-radius: 4px 4px 0 0;
	}
	.baseline.filled .label {
		background: none;
	}
	.baseline.filled .input,
	.baseline.filled .label {
		padding-left: 8px;
		padding-right: 8px;
	}
	.baseline.filled .input:focus ~ .label {
		top: 6px;
	}
	.baseline.filled .help {
		padding-left: 8px;
	}
	.filled .input:hover,
	.filled .input:focus {
		background: rgba(0, 0, 0, 0.0555);
		/* postcss-custom-properties: ignore next */
		background: var(--bg-input-filled, rgba(0, 0, 0, 0.0555));
	}

	.outlined .help {
		left: 18px;
	}
	.outlined .input {
		padding: 11px 16px 9px;
		border-radius: 4px;
		border: 1px solid;
		border-color: rgba(0, 0, 0, 0.3755);
		/* postcss-custom-properties: ignore next */
		border-color: var(--label, rgba(0, 0, 0, 0.3755));
	}
	.outlined .label {
		top: 12px;
		bottom: unset;
		left: 17px;
	}
	.outlined.dirty .label {
		top: -6px;
		bottom: unset;
		font-size: 12px;
		letter-spacing: 0.4px;
		padding: 0 4px;
		left: 13px;
	}
	.outlined .input:hover {
		border-color: #333;
		/* postcss-custom-properties: ignore next */
		border-color: var(--color, #333);
	}
	.outlined .input:focus ~ .label {
		top: -6px;
		bottom: unset;
		font-size: 12px;
		letter-spacing: 0.4px;
		padding: 0 4px;
		left: 13px;
		color: #1976d2;
		/* postcss-custom-properties: ignore next */
		color: var(--primary, #1976d2);
	}
	.outlined .input:focus ~ .focus-ring,
	.outlined .input.focus-visible ~ .focus-ring {
		border-color: #1976d2;
		/* postcss-custom-properties: ignore next */
		border-color: var(--primary, #1976d2);
	}
</style>
