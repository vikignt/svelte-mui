```xml
<Datefield
	value={date}
	label="A Special Day"
	{format}
	message={format}
	on:date-change={onchange}
/>

<script>
	import { Datefield } from '@vikignt/svelte-ui';

	let format = 'D.MM.YYYY';
	let date = '21.01.2019';  // String or
	// let date = new Date(); // Date

	const onchange = ({ detail }) => {
		console.log('onchange', detail);
	};
</script>
```
