<DemoContainer labelProps="">
	<div style="padding: 0 4px;width: 100%;">
		<Checkbox on:change={onAll} bind:checked {indeterminate}>All</Checkbox>
		<hr style="/*margin-top: -4px;*/margin-bottom: 8px;" />

		{#each colors as item}
			<Checkbox classes="thin" bind:group={favorite} value={item} color={item}>
				<span style={`color: ${item}`}>{item}</span>
			</Checkbox>
		{/each}
	</div>

	<div class="layout alignment-center-center">
		<Button shaped on:click={() => (favorite = Array.from(colors))}>Select All</Button>
		<Button shaped on:click={() => (favorite = [])}>Clear All</Button>
	</div>

	<p class="result" slot="result">
		Value: [
		{#if favorite.length > 0}
			<code>{favorite.join(', ')}</code>
		{/if}
		]
	</p>

	<div slot="play" class="row-flex" />
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Button, Checkbox } from '/src';

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
	:global(.thin) {
		margin-top: -8px !important;
	}
</style>
