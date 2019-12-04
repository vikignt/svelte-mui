<div
	class="date-field"
	class:focus-visible={visible || inputActive}
	disabled={disabled || null}
	use:events
	bind:this={elm}
>
	{#if icon}
		<Icon
			viewBox="0 0 24 18"
			path="M2,4 L16,4 L16,5 L2,5 L2,4 Z M4,9 L9,9 L9,14 L4,14 L4,9 Z M16,18 L2,18 L2,7 L16,7
			L16,18 Z M16,2 L15,2 L15,0 L13,0 L13,2 L5,2 L5,0 L3,0 L3,2 L2,2 C0.89,2 0,2.9 0,4 L0,18
			C0,19.1045695 0.8954305,20 2,20 L16,20 C17.1045695,20 18,19.1045695 18,18 L18,4
			C18,2.8954305 17.1045695,2 16,2 Z"
			on:click={open}
		/>
	{/if}
	<Textfield
		bind:value={text}
		placeholder={visible ? attrs.message || 'date' : ''}
		{...attrs}
		message={attrs.message}
		{error}
		on:keydown={onkeydown}
		on:focus={onfocus}
		on:blur={onblur}
		style={`padding-right: ${icon ? 0 : 21}px;`}
	/>

	{#if !icon}
		<Icon
			size="21"
			style="margin: 0 0 0 -20px;"
			viewBox="0 0 24 20"
			path="M7 10l5 5 5-5z"
			on:click={open}
		/>
	{/if}

	<Popover
		dx={icon ? 36 : 0}
		dy="24"
		style="border-radius: 4px;"
		bind:visible
		on:close={focusInputElm}
	>
		<Datepicker {locale} {isAllowed} value={pickerVal} on:select={onselect} />
	</Popover>
</div>

<script>
	import { createEventDispatcher } from 'svelte';
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import { isDate, parse, format as tostring, isSameDay } from './lib/date';

	import Icon from './Icon.svelte';
	import Textfield from './Textfield.svelte';
	import Popover from './Popover.svelte';
	import Datepicker from './Datepicker.svelte';

	const FORMAT_DEFAULT = 'YYYY-MM-DD';

	export let icon = false;
	export let value = ''; // [Date, String]
	export let locale;
	export let readonly;
	export let disabled = null;
	export let format = FORMAT_DEFAULT;
	export let isAllowed = () => true;

	const events = getEventsAction(current_component);
	const dispatch = createEventDispatcher();

	let attrs = {};

	let elm;
	let visible = false;
	let pickerVal; // Date type, can be isNaN(pickerVal)
	let text = isDate(value) ? tostring(value, format) : value;
	let error = '';
	let originalValue = clone(value);

	$: {
		/* eslint-disable no-unused-vars */
		const { icon, value, type, locale, format, isAllowed, ...other } = $$props;
		attrs = other;
	}
	// the format must exist
	$: format = format || FORMAT_DEFAULT;

	$: validate(text);
	$: reformat(format);

	let inputActive = false;

	function validate() {
		error = '';
		if (text.length >= format.length) {
			let d = parse(text, format);
			if (isDate(d) && !isNaN(d)) {
				return;
			}
		}
		if (text.length > 0) {
			error = format;
		}
	}

	function reformat() {
		if (isDate(value) && !isNaN(value)) {
			text = tostring(value, format);
			return;
		} else {
			validate();
		}
	}

	function open() {
		if (visible) return;
		pickerVal = parse(text, format);
		visible = true;
	}

	function onselect({ detail }) {
		text = tostring(detail, format);
		value = typeof value === 'string' ? text : clone(detail);
		visible = false;
		readonly ? setval(text) : focusInputElm();
	}

	function onfocus() {
		inputActive = true;
		readonly && open();
	}

	function onblur(e) {
		inputActive = false;
		setTimeout(() => {
			let dateField = e.target.parentNode.parentNode;
			if (dateField.contains(document.activeElement)) {
				return;
			}
			setval(text);
		}, 0);
	}

	function onkeydown(e) {
		if (/*e.keyCode === 13 || */ e.keyCode === 32) {
			e.stopPropagation();
			e.preventDefault();
			open();
		}
	}

	function focusInputElm() {
		if (readonly) return;
		let inputs = elm.querySelectorAll('input');
		inputs[0] && inputs[0].focus();
	}

	function setval(val) {
		if (typeof value === 'string') {
			value = isDate(val) ? tostring(val, format) : val;
		} else {
			value = isDate(val) ? clone(val) : parse(val, format);
		}

		if (!isEqual(value, originalValue)) {
			originalValue = clone(value);
			dispatch('date-change', value);
		}
	}

	function clone(val) {
		if (isDate(val)) {
			return isNaN(val) ? new Date(NaN) : new Date(val.getTime());
		}
		return val;
	}

	function isEqual(v1, v2) {
		if (isDate(v1) && isDate(v2)) {
			return isSameDay(v1, v2);
		}
		return v1 === v2;
	}
</script>

<style>
	.date-field {
		position: relative;
		display: flex;
		align-items: center;
	}
	:global(.date-field) > .icon {
		margin-right: 12px;
		color: #777;
		color: var(--bg-app-bar, #777);
	}
	:global(.date-field) > .icon:hover {
		cursor: pointer;
	}
	:global(.date-field).focus-visible > .icon,
	:global(.date-field).focus-visible .label {
		color: #1976d2;
		color: var(--primary, #1976d2);
	}
	:global(.date-field).focus-visible .focus-line {
		transform: scaleX(1);
		opacity: 1;
	}
</style>
