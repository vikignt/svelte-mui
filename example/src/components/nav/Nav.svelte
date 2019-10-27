<nav on:click>
	{#each routes as { path, name }}
		<NavItem {path} {name} active={currentPath === path} />
	{/each}
</nav>

<script>
	export let routes = [];
	export let currentPath = '';

	import NavItem from './NavItem.svelte';
</script>

<style>
	nav {
		font-family: var(--code-font-family);
		font-size: 14px;
	}
</style>
