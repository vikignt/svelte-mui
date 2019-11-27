```xml
<!-- inline path -->
<Icon
	color="hotpink"
	style="position: absolute; margin-left: -16px; margin-top: -8px;"
	path="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0
	14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21
	0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3
	1.34 3 3s-1.34 3-3 3z"
/>
<!-- path -->
<Icon path={home} />

<!-- compiled svg -->
<Icon>
	<svelte:component this={approval} />
</Icon>
<Icon size="36">
	<svelte:component this={paint} />
</Icon>

<!-- path with props -->
<Icon path={spinner} size="36" viewBox="0 0 1792 1792" {pulse} />

<!-- inline svg -->
<Icon color="Red">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path
			d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5
			2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12
			21.35z"
		/>
	</svg>
</Icon>

<!-- path -->
<Icon path={cartOutline} />
<Icon path={cartOutline} flip="h" />
<Icon path={cartOutline} flip="v" />
<Icon path={cartOutline} flip />

<script>
	import { Icon } from '@vikignt/svelte-ui';

	import paint from '/components/icons/svg/paint.svg';
	import approval from '/components/icons/svg/approval.svg';
	import { home, cartOutline, spinner } from '/components/icons';
</script>
```
