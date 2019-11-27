```xml
{#each Object.keys(colors) as key}
	<Radio bind:group color={colors[key]} value={key}>
		<span>{key}</span>
	</Radio>
{/each}

<p>Value: [<code>{group}</code>]</p>

<script>
	import { Radio } from '@vikignt/svelte-ui';

	let group = 'Green';
	let colors = {
		Pink: '#f50057',
		Green: '#43a047',
		Blue: '#1976d2',
		Inherit: 'inherit',
	};
</script>
```
