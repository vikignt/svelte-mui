```xml
<Textfield
	required
	autocomplete="off"
	label="Secret word"
	bind:value="{ secretWord }"
	message="Please provide your Secret Word."
	error="The secret word should start with SW !"
	validator="{ startsWithSW }"
/>


<Textfield
	autocomplete="off"
	label="Label"
	required
	bind:value
	message="message text"
/>

<script>
	import { Textfield } from 'svelte-mui';

	const startsWithSW = text => {
		return text.startsWith('SW');
	}


	let value = '';
	let secretWord = '';
</script>
```