<li class="menu-item" tabindex={disabled ? '-1' : '0'} class:disabled {title} bind:this={itemEl} on:keydown={onKeydown} on:click>
	<slot />
	{#if ripple}
		<Ripple />
	{/if}
</li>

<script>
	export let ripple = true;
	export let disabled = false;
	export let title = '';

	import Ripple from './Ripple.svelte';

	let itemEl;

	function onKeydown(e) {
		// simulate click
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.stopPropagation();
			e.preventDefault();

			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			itemEl.dispatchEvent(clickEvent);
			itemEl.blur();
		}
	}
</script>

<style>
	li {
		display: block;
	}
	.menu-item {
		position: relative;
		color: inherit;
		cursor: pointer;
		height: 44px;
		user-select: none;

		display: flex;
		align-items: center;
		padding: 0 16px;
		white-space: nowrap;
	}
	.menu-item:focus {
		outline: none;
	}
	.menu-item::-moz-focus-inner {
		border: 0;
	}
	.menu-item:-moz-focusring {
		outline: none;
	}
	.menu-item:before {
		background-color: currentColor;
		color: inherit;
		bottom: 0;
		content: '';
		left: 0;
		opacity: 0;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	}

	@media (hover: hover) {
		.menu-item:hover:not([disabled]):not(.disabled):before {
			opacity: 0.15;
		}
		:global(.focus-visible).menu-item:focus:not([disabled]):not(.disabled):before {
			opacity: 0.3;
		}
	}
</style>
