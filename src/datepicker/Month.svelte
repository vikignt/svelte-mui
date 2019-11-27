<div class="view">
	<div class="toolbar">
		<Button
			icon
			style="z-index: 5;"
			disabled={year < 2}
			on:click={() => {
				addYear(-1);
			}}
		>
			<Icon path="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
		</Button>
		<Button
			icon
			style="z-index: 5;"
			on:click={() => {
				addYear(1);
			}}
		>
			<Icon path="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
		</Button>
	</div>
	<div class="grid">
		{#each [0] as item (legacy ? item : year)}
			<div
				class="grid-cell"
				in:fly={{ x: direction * 50, duration: 200, delay: 80 }}
				out:fade={{ duration: direction === 0 ? 0 : 160 }}
			>
				<div class="title" tabindex="0" on:keydown={onKeydown} on:click={onYear}>
					{('000' + year).slice(-4)}
				</div>
				<div class="months">
					{#each Array(4) as any, row}
						<div class="row">
							{#each Array(3) as any, cell}
								<div class="cell">
									<span
										tabindex="0"
										class="month-control"
										class:selected={isEqual(new Date(new Date().setFullYear(year, row * 3 + cell, 1)), isNaN(value) ? new Date(0) : value)}
										on:keydown={onKeydown}
										on:click={() => {
											onMonth(row * 3 + cell);
										}}
									>
										{new Intl.DateTimeFormat(locale, {
											month: 'short',
										}).format(new Date(new Date().setFullYear(year, row * 3 + cell, 1)))}
									</span>
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import Icon from '../Icon.svelte';
	import Button from '../Button.svelte';

	export let locale;
	export let year;
	export let value; // Date

	let legacy = false;
	let direction = 0;

	const dispatch = createEventDispatcher();

	onMount(() => {
		legacy = typeof document.createElement('div').style.grid !== 'string';
	});

	function onYear() {
		direction = 0;
		dispatch('changeView', { type: 'year' });
	}

	function onMonth(m) {
		direction = 0;
		dispatch('select', { month: m, year });
	}
	function onKeydown(e) {
		// click simulate
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.stopPropagation();
			e.preventDefault();

			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			e.target.dispatchEvent(clickEvent);
			e.target.blur();
		}
	}

	function isEqual(d1, d2) {
		return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
	}

	function addYear(amount) {
		let d = new Date(new Date().setFullYear(year, 0, 1));
		d.setFullYear(d.getFullYear() + amount);
		year = d.getFullYear();
		direction = amount;
	}
</script>

<style>
	.view {
		position: relative;
		padding: 0 8px 4px;
		height: 100%;
	}
	.toolbar {
		padding: 0 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		height: 48px;
		top: 0;
		right: 0;
		left: 0;
	}
	.grid {
		width: 100%;
		height: 100%;
		overflow: hidden;
		user-select: none;
		display: -ms-grid;
		display: grid;
		-ms-grid-columns: 1fr;
		-ms-grid-rows: 1fr;
	}
	.grid-cell {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 3;
		-ms-grid-column: 1;
		grid-column: 1;
		-ms-grid-row: 1;
		grid-row: 1;
		height: 100%; /* legacy browsers */
	}
	.grid-cell:nth-child(2) {
		-ms-grid-row: 1;
		grid-row: 1;
	}
	.title {
		height: 48px;
		font-size: 16px;
		letter-spacing: 0.75px;
		text-align: center;
		margin: 0 48px;
		outline: none;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title:focus,
	.title:hover,
	.title:active {
		color: #1976d2;
		color: var(--primary, #1976d2);
	}
	.months {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.row {
		display: flex;
		justify-content: space-around;
		text-align: center;
		margin-bottom: 2px;
	}
	.cell {
		position: relative;
		height: 34px;
		width: 30%;
		overflow: hidden;
		user-select: none;
	}
	.month-control {
		display: block;
		box-sizing: border-box;
		cursor: pointer;
		line-height: 34px;
		border-radius: 2px;
	}
	.month-control.selected {
		background: #1976d2;
		background: var(--primary, #1976d2);
		color: #fff;
		color: var(--alternate, #fff);
		font-weight: 700;
	}
	.month-control:focus {
		outline: none;
	}
	.month-control:before {
		border-radius: inherit;
		color: inherit;
		bottom: 0;
		content: '';
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
		will-change: background-color, opacity;
	}
	@media (hover: hover) {
		.month-control:hover:not([disabled]):not(.disabled):before {
			background-color: currentColor;
			opacity: 0.15;
		}
		:global(.focus-visible).month-control:focus:not([disabled]):not(.disabled):before {
			background-color: currentColor;
			opacity: 0.3;
		}
	}
</style>
