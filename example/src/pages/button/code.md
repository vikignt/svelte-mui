```xml
<Button color="primary" title="Simple button" on:click={increment}>Button</Button>

<Button color="accent" on:click={increment}>
	<!-- left icon -->
	<Icon path={cartOutline} style="margin: 0 8px 0 -4px;" />
	Add
</Button>

<Button color='#00796b' on:click={increment}>
	Send
	<!-- right icon -->
	<Icon path="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" style="margin: 0 -4px 0 8px;" />
</Button>

<!-- icon buttons -->
<Button icon on:click={increment}>
	<Icon path={search} />
</Button>

<Button icon color="primary" on:click={increment}>VA</Button>

<Button icon color="#5c9122" on:click={increment}>
	<Icon>
		<svelte:component this={approval} />
	</Icon>
</Button>

<script>
	import { Button, Icon } from '@vikignt/svelte-ui';
	import { cartOutline, search } from '/components/icons';
	import approval from '/components/icons/svg/approval.svg';

	let counter = 0;

	function increment() {
		counter += 1;
	}
</script>
```
