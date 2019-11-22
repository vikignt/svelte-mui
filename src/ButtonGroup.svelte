<div class="button-group">
	<slot />
</div>

<style>
	.button-group {
		display: inline-table;
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
