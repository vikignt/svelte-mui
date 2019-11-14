<div class="menu" on:click={onActivatorClick} bind:this={menuEl} use:events>
	<slot name="activator">
		<span />
	</slot>

	<Popover class={className} {style} {origin} {dx} {dy} bind:visible on:click={onPopoverClick}>
		<ul style={`min-width: ${width}px`}>
			<slot />
		</ul>
	</Popover>
</div>

<script>
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';
	import Popover from './Popover.svelte';

	const events = getEventsAction(current_component);

	export { className as class, style, dx, dy, origin, width };

	let className = '';
	let style = null;
	let dx = 0;
	let dy = 0;
	let origin = 'top left'; // 'bottom left', 'bottom right', 'top left', 'top right'
	let width = 2 * 56;

	let visible = false;
	let menuEl;

	function onActivatorClick(e) {
		try {
			let triggerEl = menuEl.childNodes[0];

			if (triggerEl.contains(e.target)) {
				visible = !visible;
			} else if (e.target === menuEl) {
				visible = false;
			}
		} catch (err) {
			console.error(err);
		}
	}

	function onPopoverClick(e) {
		if (e.target.classList.contains('menu-item')) {
			visible = false;
		}
	}
</script>

<style>
	@supports (-webkit-overflow-scrolling: touch) {
		/* CSS specific to iOS devices */
		:global(html) {
			cursor: pointer; /* for handle iOS click event on window */
		}
	}
	.menu {
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}
	ul {
		margin: 0;
		padding: 8px 0;
		width: 100%;
		position: relative;
		overflow-x: hidden;
		overflow-y: visible;
	}
</style>
