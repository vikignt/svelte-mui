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
		background: #eee;
		background: var(--bg-panel);
		margin-bottom: 16px;
	}
	.demo :global(.result) {
		padding: 0 8px;
		text-align: center;
	}
	.toolbar {
		height: 48px;
		padding: 0 8px 0 16px;
		color: rgba(0, 0, 0, 0.375);
		color: var(--label);
		background: #eee;
		background: var(--bg-panel);
	}
	.toolbar .title {
		font-size: 18px;
		letter-spacing: 0.4px;
	}

	.component {
		background: #eee;
		background: var(--bg-panel);
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
		color: #000;
		color: var(--color);
		background: #fbfbfb;
		background: var(--bg-color);
		padding: 6px;
		margin: 4px 0 4px 0;
		box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border: 1px solid var(--divider);
		border-radius: 2px;
	}
</style>
