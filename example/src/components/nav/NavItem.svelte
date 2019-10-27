{#if path && name}
	<a
		href={path}
		class="nav-item"
		class:active
		class:dense={level > 1}
		style={`padding-left: ${12 * level}px;`}
	>
		{name}
	</a>
{/if}

<script>
	export let path;
	export let name;
	export let active = false;

	$: level = path.split('/').length - 1;
</script>

<style>
	.dense {
		font-size: 92.857%;
	}
	.active {
		font-weight: 700;
	}
	a {
		color: inherit;
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		min-height: 32px;
		padding-right: 4px;
		text-decoration: none;
		outline: none;
	}
	a:focus {
		outline: none;
	}
	a::-moz-focus-inner {
		border: 0;
	}
	a:-moz-focusring {
		outline: none;
	}
	a:before {
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
		a:hover:not([disabled]):not(.disabled):before {
			opacity: 0.15;
		}
		:global(.focus-visible).nav-item:focus:not([disabled]):not(.disabled):before {
			opacity: 0.3;
		}
	}
</style>
