<div class="demo clearfix">
	<div class="toolbar layout alignment-center-left">
		<span class="title grow">Example</span>
	</div>
	<div class="component layout alignment-center-center">
		<slot />
	</div>

	<slot name="result" />
</div>

{#if labelProps}
	<p>{labelProps}</p>
	<slot name="play">
		<p>
			<i>No properties</i>
		</p>
	</slot>
{/if}

<script>
	export let labelProps = 'Play with some properties';
</script>

<style>
	.demo {
		background: var(--bg-panel, #eee);
		margin-bottom: 16px;
	}
	.demo :global(.result) {
		padding: 0 8px;
		text-align: center;
	}
	.toolbar {
		height: 48px;
		padding: 0 8px 0 16px;
		color: var(--label, rgba(0, 0, 0, 0.3755));
		background: var(--bg-panel, #eee);
	}
	.toolbar .title {
		font-size: 18px;
		letter-spacing: 0.4px;
	}

	.component {
		background: var(--bg-panel, #eee);
		margin: 1rem 0;
		padding: 8px;
		min-height: 6.25rem;
	}

	.component :global(.btn) {
		margin: 4px;
	}

	:global(.properties) input {
		font-family: inherit;
		font-size: inherit;
		color: var(--color, #333);
		background: var(--bg-color, #fbfbfb);
		padding: 6px;
		margin: 4px 0 4px 0;
		box-sizing: border-box;
		border: 1px solid var(--divider, rgba(0, 0, 0, 0.1));
		border-radius: 2px;
	}
</style>
