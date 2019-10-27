<h4>Properties</h4>

<div class="properties">
	<table>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
		{#each data as item}
			<tr>
				<td>
					<code>{item.name}</code>
					<small>{item.type}</small>
				</td>
				<td>
					{@html item.desc}
				</td>
				<td>
					<strong>{item.def}</strong>
				</td>
			</tr>
		{/each}
	</table>
</div>

<script>
	export let data = [];
</script>

<style>
	table {
		width: 100%;
		font-family: var(--code-font-family);
		letter-spacing: 0.01em;
		border-collapse: collapse;
		border-spacing: 0;
		font-size: 13px;
		line-height: 18px;
	}
	tr:first-child {
		background: var(--bg-panel);
		font-weight: 500;
	}
	tr:first-child th:nth-child(2) {
		width: 80%;
	}
	th,
	td {
		padding: 8px;
		border: 1px solid var(--border);
		text-align: left;
		vertical-align: middle;
	}
	td :global(code) {
		color: var(--accent);
	}
	code {
		color: var(--accent);
	}
	small {
		display: block;
		color: var(--label);
		text-transform: capitalize;
	}
</style>
