<section>
	<h3>Description</h3>
	<slot />
</section>

<style>
	section {
		background: var(--bg-color);
		font-family: var(--code-font-family);
		font-size: 14px;
		letter-spacing: 0.01em;
		line-height: 1.5em;
	}
	section :global(code) {
		color: var(--accent);
	}
</style>
