{#if url}
	<li>
		<a
			class={'menu-item ' + className}
			href={url}
			tabindex={disabled ? '-1' : '0'}
			bind:this={elm}
			on:keydown={onKeydown}
			use:events
			{...attrs}
		>
			<slot />
			{#if ripple}
				<Ripple />
			{/if}
		</a>
	</li>
{:else}
	<li
		class={'menu-item ' + className}
		tabindex={disabled ? '-1' : '0'}
		bind:this={elm}
		on:keydown={onKeydown}
		use:events
		{...attrs}
	>
		<slot />
		{#if ripple}
			<Ripple />
		{/if}
	</li>
{/if}

<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import Ripple from './Ripple.svelte';

	const events = getEventsAction(current_component);

	export { className as class, ripple };

	let className = '';
	let ripple = true;

	let disabled = false;
	let url = null;
	let attrs = {};

	$: {
		/* eslint-disable no-unused-vars */
		const { href, ripple, ...other } = $$props;

		delete other.class;
		if (other.disabled === false) {
			delete other.disabled;
		}

		disabled = !!other.disabled;
		url = href && !disabled ? href : null;

		attrs = other;
	}

	let elm;

	function onKeydown(e) {
		// click simulate
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.stopPropagation();
			e.preventDefault();

			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			elm.dispatchEvent(clickEvent);
			elm.blur();
		}
	}
</script>

<style>
	li {
		display: block;
	}
	a,
	a:hover {
		text-decoration: none;
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
