<DemoContainer labelProps="">
	<Button
		color="primary"
		outlined
		on:click={() => {
			lpanel = true;
		}}
	>
		Open Left
	</Button>
	<Button
		color="primary"
		outlined
		on:click={() => {
			rpanel = true;
		}}
	>
		Open Right
	</Button>
</DemoContainer>

<script>
	export let lpanel;
	export let rpanel;

	import DemoContainer from '../DemoContainer.svelte';
	import { Button } from '/src';
</script>
