```xml
<div class="card">
	<Datepicker
		bind:value={date}
		isAllowed={(date) => {
			return date.getDay() > 0 && date.getDay() < 6;
		}}
	/>
</div>

<script>
	import { Datepicker } from '@vikignt/svelte-ui';

	let date = new Date();
	date.setDate(date.getDate() + 2);
</script>

<style>
	.card {
		display: inline-block;
		box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
			0 1px 8px 0 rgba(0, 0, 0, 0.12);
	}
</style>
```
