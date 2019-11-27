<div class="datepicker" use:events>
	{#if header}
		<div class="header">
			{#if !isNaN(value)}
				<div class="year">{('000' + value.getFullYear()).slice(-4)}</div>
				<div class="wrap">
					<div class="date">
						{new Intl.DateTimeFormat(locale, {
							weekday: 'short',
							month: 'short',
							day: 'numeric',
						}).format(value)}
					</div>
				</div>
			{:else}
				<div class="year">&nbsp;</div>
				<div class="date">No Date</div>
			{/if}
		</div>
	{/if}
	<div class="body" bind:this={contElm}>
		{#if type === 'year'}
			<Year {year} on:select={onYear} />
		{:else if type === 'month'}
			<Month {locale} bind:year {value} on:select={onMonth} on:changeView={onView} />
		{:else}
			<Day
				{locale}
				{isAllowed}
				bind:month
				bind:year
				{value}
				on:select={onDay}
				on:changeView={onView}
			/>
		{/if}
	</div>
</div>

<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import { isDate } from './lib/date';
	import Day from './datepicker/Day.svelte';
	import Month from './datepicker/Month.svelte';
	import Year from './datepicker/Year.svelte';

	export let locale = '';
	export let isAllowed = () => true;
	export let value = new Date();
	export let header = true;

	const events = getEventsAction(current_component);
	const dispatch = createEventDispatcher();

	let type = 'days';
	let month;
	let year;
	let contElm;

	if (!isDate(value)) {
		value = new Date(NaN);
	}

	let d = isNaN(value) ? new Date() : new Date(value.getTime());
	month = d.getMonth();
	year = d.getFullYear();

	onMount(() => {
		if (!locale) {
			locale =
				navigator.languages && navigator.languages.length
					? navigator.languages[0]
					: navigator.userLanguage || navigator.language || navigator.browserLanguage || 'ru';
		}
		if (contElm) {
			contElm.style.height = contElm.offsetHeight + 'px';
			contElm.style.width = contElm.offsetWidth + 'px';
		}
	});

	function onView({ detail }) {
		type = detail.type;
	}
	function onYear({ detail }) {
		year = +detail.year;
		type = 'days';
	}
	function onMonth({ detail }) {
		month = +detail.month;
		year = +detail.year;
		type = 'days';
	}
	function onDay({ detail }) {
		value = new Date(detail.getTime());
		dispatch('select', value);
	}
</script>

<style>
	.datepicker {
		position: relative;
		overflow: hidden;
	}
	.header {
		color: #fff;
		color: var(--alternate, #fff);
		background: #1976d2;
		background: var(--primary, #1976d2);
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
		padding: 16px;
		height: 97px;
	}
	.wrap {
		position: relative;
	}
	.wrap .date {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		overflow: hidden;
		/* text-overflow: ellipsis; */
		white-space: nowrap;
	}

	.year {
		font-size: 16px;
		font-weight: 700;
		opacity: 0.6;
		margin-bottom: 8px;
	}
	.date {
		font-size: 34px;
		font-weight: 500;
	}
	.body {
		overflow: hidden;
	}

	@media only screen and (max-height: 400px) and (min-width: 420px) {
		.datepicker {
			display: flex;
		}
		.header {
			height: auto;
			width: 148px;
		}
		.wrap .date {
			white-space: unset;
		}
	}
</style>
