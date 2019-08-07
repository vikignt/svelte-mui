<!-- TODO: можно сделать haverable для приостановки таймера -->
{#if visible}
	<div transition:fly={{ y: position === 'top' ? -48 : 48, duration: 350 }} class={`snackbar ${position}`} on:click bind:this={snackElm} style={`color: ${color};background: ${bgcolor};${style}`}>
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
	export let visible = false;
	export let position = 'top';
	export let bgcolor = 'rgba(0,0,0,.87)';
	export let color = '#fff';
	export let timeout = 5;
	export let style = '';

	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import Button from './Button.svelte';

	let timerId;
	let snackElm;

	$: if (visible === true) {
		if (timeout > 0) {
			clearTimeout(timerId);

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
		border-radius: 0 0 4px 4px;
		padding: 6px 16px;
		min-height: 48px;
		min-width: 288px;
		max-width: 568px;
		position: fixed;
		flex-wrap: nowrap;
		z-index: 50;
		box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
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
