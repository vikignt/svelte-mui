```xml
<div class="wrapper">
	<Checkbox on:change={onAll} {checked} {indeterminate}>All</Checkbox>
	<hr style="margin-bottom: 8px;" />

	{#each colors as item}
		<Checkbox class="thin" bind:group={favorite} value={item} color={item}>
			<span style={`color: ${item}`}>{item}</span>
		</Checkbox>
	{/each}
</div>

<p class="result">
	Value: [
	{#if favorite.length > 0}
		<code>{favorite.join(', ')}</code>
	{/if}
	]
</p>

<script>
	import { Checkbox } from '@vikignt/svelte-ui';

	let colors = ['coral', 'goldenrod', 'limegreen'];
	let favorite = ['coral', 'goldenrod'];

	// Checkbox 'All' reactive properties
	$: checked = favorite.length === colors.length;
	$: indeterminate = favorite.length > 0 && favorite.length < colors.length;

	function onAll(e) {
		let on = e.target.checked;

		favorite = on ? Array.from(colors) : [];
	}
</script>

<style>
	.wrapper {
		width: 100%;
	}
	.wrapper :global(.thin) {
		margin-top: -8px !important;
	}
</style>
```
