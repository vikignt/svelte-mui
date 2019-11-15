{#if visible}
	<div
		in:fly={{ y: bottom ? 48 : -48, duration: 350 }}
		out:fly={{ y: bottom ? 48 : -48, duration: 350 }}
		class={'snackbar ' + className}
		class:top={!bottom}
		class:bottom
		style={`color: ${color};background: ${bg};${style}`}
		use:events
	>
		<div class="message">
			<slot />
		</div>
		<div class="action">
			<slot name="action">
				<Button color="#f50057" on:click={() => (visible = false)}>Close</Button>
			</slot>
		</div>
	</div>
{/if}

<script>
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import Button from './Button.svelte';

	const events = getEventsAction(current_component);

	export let visible = false;
	export { className as class };
	let className = '';
	export let style = '';
	export let bottom = false;
	export let bg = 'rgba(0,0,0,.87)';
	export let color = '#fff';
	export let timeout = 5;

	let timerId;

	$: if (visible === true) {
		clearTimeout(timerId);
		timerId = undefined;
		if (timeout > 0) {
			timerId = setTimeout(() => {
				visible = false;
				timerId = undefined;
			}, timeout * 1000);
		}
	}

	onDestroy(() => {
		clearTimeout(timerId);
		timerId = undefined;
	});
</script>

<style>
	.snackbar {
		display: flex;
		align-items: center;
		border-radius: 0 0 2px 2px;
		padding: 6px 16px;
		min-height: 48px;
		min-width: 288px;
		max-width: 568px;
		position: fixed;
		flex-wrap: nowrap;
		z-index: 50;
		box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
			0 1px 18px 0 rgba(0, 0, 0, 0.12);
	}

	.action {
		margin-right: -16px;
		padding: 0 8px;
		margin-left: auto;
	}

	.message {
		padding: 8px 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.top {
		top: 0;
		left: 50%;
		transform: translate3d(-50%, 0, 0);
	}
	.bottom {
		bottom: 0;
		left: 50%;
		border-radius: 2px 2px 0 0;
		transform: translate3d(-50%, 0, 0);
	}

	@media only screen and (max-width: 600px) {
		.snackbar {
			max-width: 100%;
			left: 0;
			right: 0;
			transform: translate3d(0, 0, 0);
		}
	}
</style>
