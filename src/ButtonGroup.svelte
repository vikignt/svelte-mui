<div class="button-group" style={color ? `color: ${color};` : '' + style}>
	<slot />
</div>

<script>
	import { islegacy } from './lib/colors';

	export let color = '';
	export let style = '';

	$: if (color === 'primary') {
		color = islegacy() ? '#1976d2' : 'var(--primary, #1976d2)';
	} else if (color == 'accent') {
		color = islegacy() ? '#f50057' : 'var(--accent, #f50057)';
		// } else if (!color) {
		// 	color = islegacy() ? '#333' : 'var(--color, #333)';
	}
</script>

<style>
	.button-group {
		display: inline-flex;
		flex-wrap: wrap;
	}
	.button-group :global(button) {
		padding: 0 8px;
	}
	.button-group :global(button:first-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
	.button-group :global(button:last-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.button-group :global(.shaped:first-child) {
		padding-left: 12px;
	}
	.button-group :global(.shaped:last-child) {
		padding-right: 12px;
	}

	.button-group :global(button:not(:first-child):not(:last-child)) {
		border-radius: 0;
	}
	.button-group :global(button:not(:first-child)) {
		border-left: none;
	}
	.button-group :global(.outlined) {
		border-width: 1px;
	}
</style>
