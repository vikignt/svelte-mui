<div class={`text-field ${outlined && !filled ? 'outlined' : 'baseline'} ${classes}`} class:filled class:dirty disabled={disabled ? 'true' : null} {style} {title} on:focus on:blur on:input>

	<input type="text" {id} {name} {autocomplete} class="input" bind:value {min} {max} readonly={readonly ? 'true' : null} disabled={disabled ? 'true' : null} bind:this={inputEl} on:focus on:blur />

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

	{#if message.length > 0}
		<div class="help" class:error>
			<div class="message">{message}</div>
		</div>
	{/if}
</div>

<script>
	export let id = null;
	export let name = null;
	export let type = 'text';
	export let classes = '';
	export let style = null;
	export let title = null;
	export let outlined = false;
	export let filled = false;

	export let readonly = false;
	export let disabled = false;
	export let required = false;
	export let autocomplete = null;
	export let label = '';
	export let value = '';
	export let min = null;
	export let max = null;
	export let message = '';
	export let error = false;

	import { tick, onMount } from 'svelte';

	let inputEl;
	$: dirty = (typeof value === 'string' && value.length > 0) || typeof value === 'number';

	onMount(async () => {
		await tick();
		inputEl.type = type;
	});
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
		top: 0.125em;
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
		color: var(--color);
		caret-color: #1976d2;
		caret-color: var(--primary);
		border: none;
		margin: 0;
		padding: 2px 0 0;

		outline: none;
	}
	.input::-moz-focus-inner {
		padding: 0;
		border: 0;
	}
	.input:active {
		outline: none;
	}
	.input:hover ~ .input-line {
		background: #333;
		background: var(--color);
	}
	.label {
		font: inherit;
		display: inline-flex;
		position: absolute;
		left: 0;
		top: 28px;
		padding-right: 0.2em;
		color: rgba(0, 0, 0, 0.3755);
		color: var(--label);
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
		background: rgba(0, 0, 0, 0.375);
		background: var(--border);
	}
	.focus-line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		transform: scaleX(0);
		transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
		transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1);
		opacity: 0;
		z-index: 2;

		background: #1976d2;
		background: var(--primary);
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
		color: var(--label);
		opacity: 0;

		overflow: hidden;
		max-width: 90%;
		white-space: nowrap;
	}
	.error {
		opacity: 1;
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
		color: var(--primary);
	}
	.baseline .input:focus ~ .focus-line {
		transform: scaleX(1);
		opacity: 1;
	}
	.baseline .input:focus ~ .help {
		opacity: 1;
	}

	.baseline .input {
		height: 52px;
		padding-top: 22px;
	}

	.baseline.filled {
		background: rgba(0, 0, 0, 0.0555);
		background: var(--bg-input-filled);
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
		background: var(--bg-input-filled);
	}

	.outlined .help {
		left: 18px;
	}
	.outlined .input {
		padding: 11px 16px 9px;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.375);
		border: 1px solid var(--border);
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
		border-color: var(--color);
	}
	.outlined .input:focus ~ .label {
		top: -6px;
		bottom: unset;
		font-size: 12px;
		letter-spacing: 0.4px;
		padding: 0 4px;
		left: 13px;
		color: #1976d2;
		color: var(--primary);
	}
	.outlined .input:focus ~ .focus-ring,
	.outlined .input.focus-visible ~ .focus-ring {
		border-color: #1976d2;
		border-color: var(--primary);
	}
	.outlined .input:focus ~ .help {
		opacity: 1;
	}
</style>
