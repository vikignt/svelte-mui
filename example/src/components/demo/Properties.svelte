<slot name="name">
	<h4>Properties</h4>
</slot>

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
					{#if item.type}
						<small>{item.type}</small>
					{/if}
				</td>
				<td>
					{@html item.desc}
				</td>
				<td>
					<strong>
						{#if item.def && (item.def[0] === '#' || item.def.indexOf('rgb') === 0)}
							<span
								style={`display:inline-block;width:11px;height:11px;border:1px solid #bbb;background-color:${item.def}`}
							/>
							{item.def}
						{:else}
							{@html item.def}
						{/if}
					</strong>
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
		max-width: 80%;
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
