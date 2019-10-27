<div class="warning">
	<p>
		<em>WARNING</em>
	</p>
	<p>This is a demo of work in progress...</p>
</div>

<section>
	{@html introduction}
	{@html quickStart}
	{@html byExample}
</section>

<script>
	import introduction from './introduction.md';
	import quickStart from './quick-start.md';
	import byExample from './by-example.md';
</script>

<style>
	section :global(p),
	section :global(li) {
		font-family: var(--code-font-family);
		font-size: 14px;
		letter-spacing: 0.01em;
		line-height: 1.5em;
	}
	section :global(pre) {
		background: #212121;
		color: #fff;
		border-radius: 4px;
		padding: 1rem;
		overflow-x: auto;
	}
	section :global(:not(pre) code),
	section :global(:not(pre) code) {
		font-size: 14px;
		color: var(--accent);
	}
	.warning {
		background: var(--bg-panel);
		border-left: 4px solid #fdd835;
		padding: 8px;
		font-size: 14px;
	}
</style>
