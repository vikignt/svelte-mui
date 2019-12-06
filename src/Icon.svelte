<i
	class={'icon ' + className}
	class:flip={flip && typeof flip === 'boolean'}
	class:flip-h={flip === 'h'}
	class:flip-v={flip === 'v'}
	class:spin
	class:pulse={pulse && !spin}
	bind:this={elm}
	use:events
	{...attrs}
>
	{#if typeof path === 'string'}
		<svg xmlns="http://www.w3.org/2000/svg" {viewBox}>
			<path d={path} />
		</svg>
	{:else}
		<slot />
	{/if}
</i>

<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';

	const events = getEventsAction(current_component);

	export { className as class, path, size, viewBox, color, flip, spin, pulse };

	let className = '';
	let path = null;
	let size = 24;
	let viewBox = '0 0 24 24';
	let color = 'currentColor';
	let flip = false;
	let spin = false;
	let pulse = false;

	let elm;
	let attrs = {};

	$: {
		/* eslint-disable no-unused-vars */
		const { path, size, viewBox, color, flip, spin, pulse, ...other } = $$props;

		delete other.class;
		attrs = other;
	}
	$: if (elm) {
		elm.firstChild.setAttribute('width', size);
		elm.firstChild.setAttribute('height', size);

		color && elm.firstChild.setAttribute('fill', color);
	}
</script>

<style>
	.icon {
		display: inline-block;
		position: relative;
		vertical-align: middle;
		line-height: 0.5;
	}
	.icon > svg {
		display: inline-block;
	}
	.flip {
		transform: scale(-1, -1);
	}
	.flip-h {
		transform: scale(-1, 1);
	}
	.flip-v {
		transform: scale(1, -1);
	}
	.spin {
		animation: spin 1s 0s infinite linear;
	}
	.pulse {
		animation: spin 1s infinite steps(8);
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
