<i class={'icon ' + classes} class:flip={flip && typeof flip === 'boolean'} class:flip-h={flip === 'h'} class:flip-v={flip === 'v'} class:spin class:pulse={pulse && !spin} {style}>
	<svg xmlns="http://www.w3.org/2000/svg" width={24 * scale} height={24 * scale} viewBox={box} fill={color}>
		{#if typeof content === 'string'}
			<path d={content} />
		{:else}
			<svelte:component this={content} />
		{/if}
	</svg>
</i>

<script>
	export let classes = '';
	export let style = null;
	export let content = null;
	export let scale = 1;
	export let box = '0 0 24 24';
	export let color = 'currentColor';
	export let flip = false;
	export let spin = false;
	export let pulse = false;
</script>

<style>
	.icon {
		display: inline-block;
		position: relative;
		vertical-align: middle;
		line-height: 0.5;
	}
	.flip {
		transform: scale(-1, -1);
	}
	.flip-h {
		transform: scale(-1, 1);
	}
	.flip-v {
		transform: scale(1, -1);
	}
	.spin {
		animation: spin 1s 0s infinite linear;
	}
	.pulse {
		animation: spin 1s infinite steps(8);
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
