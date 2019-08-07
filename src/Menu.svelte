<svelte:window on:keydown={onWindowKeydown} on:click={onWindowClick} />

<div class="menu" on:click={onActivatorClick} bind:this={menuEl}>
	<slot name="activator">
		<span />
	</slot>

	{#if visible}
		<div class="popover" tabindex="-1" transition:popover={{ opacity: 0, start: 0.75, origin }} on:introstart={transitionStart} on:introend={transitionEnd} on:click={onPopoverClick} bind:this={popoverEl}>
			<ul>
				<slot />
			</ul>
		</div>
	{/if}
</div>

<script>
	export let dx = 0;
	export let dy = 0;
	export let origin = 'top right'; // 'bottom left', 'bottom right', 'top left', 'top right'
	export let width = 2 * 56;

	import { popover } from './lib/transition';
	import { trapTabKey } from './lib/focusableElm';

	let visible = false;
	let menuEl;
	let popoverEl;

	function transitionStart() {
		if (origin.includes('bottom')) {
			popoverEl.style.bottom = dy + 'px';
		} else {
			popoverEl.style.top = dy + 'px';
		}
		if (origin.includes('left')) {
			popoverEl.style.left = dx + 'px';
		} else {
			popoverEl.style.right = dx + 'px';
		}
		popoverEl.style['width'] = Math.max(width, popoverEl.clientWidth) + 'px';
	}

	function onActivatorClick(e) {
		try {
			let triggerEl = menuEl.childNodes[0];
			let rc = triggerEl.getBoundingClientRect();

			if (triggerEl.contains(e.target)) {
				if (visible) {
					hide();
				} else {
					visible = true;

					if (dx < rc.width && dy < rc.height) {
						triggerEl.classList.add('disabled');
					}
				}
			} else if (e.target === menuEl) {
				hide();
			}
		} catch (err) {
			console.error(err);
		}
	}

	function hide() {
		try {
			let triggerEl = menuEl.childNodes[0];
			triggerEl.classList.remove('disabled');
		} catch (err) {} // eslint-disable-line

		visible = false;
	}

	function transitionEnd() {
		if (visible) {
			popoverEl.focus();
		}
	}

	function onPopoverClick(e) {
		if (e.target.classList.contains('menu-item')) {
			e.stopPropagation();
			e.preventDefault();

			hide();
		}
	}

	function onWindowKeydown(e) {
		if (visible) {
			if (e.keyCode === 27) {
				hide();
			}
			trapTabKey(e, popoverEl);
		}
	}
	function onWindowClick(e) {
		if (visible) {
			if (!menuEl.contains(e.target)) {
				hide();
			}
		}
	}
</script>

<style>
	.menu {
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}
	.popover {
		position: absolute;
		z-index: 1;
		min-width: 112px;
		color: #333;
		color: var(--color);
		background: #fff;
		background: var(--bg-popover);
		border-radius: 4px;
		margin: 0;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
		user-select: none;
	}
	.popover:focus {
		outline: none;
	}
	.popover::-moz-focus-inner {
		border: 0;
	}
	.popover:-moz-focusring {
		outline: none;
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
