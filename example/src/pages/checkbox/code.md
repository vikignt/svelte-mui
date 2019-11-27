```xml
<Checkbox {...props} bind:checked bind:indeterminate>
	<span>
		I agree that
		<a target="_blank" href="https://svelte.dev" title="Open in new window">Svelte</a>
		is awesome
	</span>
</Checkbox>

<script>
	import { Checkbox } from '@vikignt/svelte-ui';

	let checked = true;
	let indeterminate = false;

	let props = {
		color: 'accent',
		name: 'svelte',
		value: 'awesome',
	};
</script>
```
