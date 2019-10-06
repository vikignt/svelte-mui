<DemoContainer labelProps="">
	<div class="box filled">
		Block level element
		<Ripple />
	</div>
	<div class="box bordered">
		Center Ripple
		<Ripple center />
	</div>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Ripple } from '/src';
</script>

<style>
	.box {
		cursor: pointer;
		user-select: none;
		box-sizing: border-box;
		border-radius: 4px;
		border: 1px solid var(--primary, #1976d2);
		display: inline-block;
		margin: 0 1rem 1rem 0;
		padding: 0.75rem;
	}
	.box :global(.ripple) {
		border-radius: 0 !important;
	}
	.filled {
		color: var(--alternate, #fff);
		background: var(--primary, #1976d2);
	}
	.bordered {
		color: var(--primary, #1976d2);
	}
</style>
