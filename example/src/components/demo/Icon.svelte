<DemoContainer labelProps="">
	<div style="width: 100%;text-align: center;">
		<Icon
			color="hotpink"
			style="position: absolute; margin-left: -16px; margin-top: -8px;"
			content="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5
			5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"
		/>
		<Icon content={home} />
		<Icon content={paint} scale="1.5" box="0 0 80 80" />
		<Icon content={spinner} scale="1.5" box="0 0 1792 1792" {pulse} />
		<Icon content={favorite} color="Red" />
		<Icon content={cartOutline} />
		<Icon content={cartOutline} flip="h" />
		<Icon content={cartOutline} flip="v" />
		<Icon content={cartOutline} flip />
	</div>

	<div>
		<Checkbox bind:checked={pulse}>pulse</Checkbox>
	</div>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Icon, Checkbox } from '../../../../src';

	import { home, favorite, cartOutline, spinner } from '../icons';
	import paint from '../icons/paint.svelte';

	let pulse = false;
</script>
