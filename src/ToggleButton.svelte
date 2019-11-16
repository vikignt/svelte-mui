<Button {...props} toggle {active} on:click={onClick} on:click>
	<slot />
</Button>

<script>
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let active = false;
	let props = {};

	$: {
		/* eslint-disable no-unused-vars */
		const { active, ...other } = $$props;

		props = other;
	}

	function onClick() {
		active = !active;
		dispatch('change', active);
	}
</script>
