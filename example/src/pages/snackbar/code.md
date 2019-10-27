```xml
<Snackbar bind:visible bg="#f44336">
	{message}
	<span slot="action">
		<Button color="#ff0" on:click={() => (visible = false)}>Close</Button>
	</span>
</Snackbar>

<script>
	import { Snackbar, Button } from '@vikignt/svelte-ui';

	let visible = false;
	let message = 'Snackbar message!';
</script>
```
