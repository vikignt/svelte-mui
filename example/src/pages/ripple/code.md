```xml
<div class="box filled">
	Block level element
	<Ripple />
</div>
<div class="box bordered">
	Center Ripple
	<Ripple center />
</div>

<script>
	import { Ripple } from '@vikignt/svelte-ui';
</script>

<style>
	.box {
		cursor: pointer;
		user-select: none;
		box-sizing: border-box;
		border-radius: 4px;
		border: 1px solid #3590db;
		display: inline-block;
		margin: 0 1rem 1rem 0;
		padding: 0.75rem;
	}
	.box :global(.ripple) {
		border-radius: 0 !important;
	}
	.filled {
		color: #fff;
		background: #1976d2;
	}
	.bordered {
		color: #1976d2;
	}
</style>
```
