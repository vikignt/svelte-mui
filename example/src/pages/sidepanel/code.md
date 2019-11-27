```xml
<Sidepanel right bind:visible={rightVisible}>
	<div class="logo" style="padding-left: 1rem;">Help</div>
	<p>
		<i style="padding: 12px;">Blank</i>
	</p>
</Sidepanel>

<script>
	export let rightVisible = false;

	import { Sidepanel } from '@vikignt/svelte-ui';
</script>
```
