<DemoContainer labelProps="">
	<Button
		color="primary"
		outlined
		on:click={() => {
			visible = true;
		}}
	>
		Open Dialog
	</Button>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Button } from '../../../../src';

	export let visible = false;
</script>
