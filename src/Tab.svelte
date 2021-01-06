<div class="tabcontent-page {className}" {style} {...attrs} use:events>
	<slot></slot>
</div>

<script>
	import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
	import { current_component } from 'svelte/internal';
	import { getEventsAction } from './lib/events';

	const events = getEventsAction(current_component);

	export { className as class, style };

	let className = '';
	let style = null;

    let attrs = {};
	
	$: {
		/* eslint-disable no-unused-vars */
		const {	style, ...other	} = $$props;
		attrs = other;
	}
</script>

<style>
    .tabcontent-page {
        width: 100%;
        flex: 1 0 100%;
    }
</style>