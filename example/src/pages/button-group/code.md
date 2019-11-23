```xml
<ButtonGroup  color="primary">
	<Button on:click={increment}>This one</Button>
	<Button on:click={increment}>Click</Button>
	<Button on:click={increment}>Here</Button>
</ButtonGroup>

<p>Button with<code>'toggle'</code>property set</p>

<ButtonGroup color="accent">
	<Button
		active={justify.left}
		toggle
		on:change={(e) => {
			onjustify('left', e.detail);
		}}
	>
		<Icon path={alignLeft} />
	</Button>
	<Button
		active={justify.center}
		toggle
		on:change={(e) => {
			onjustify('center', e.detail);
		}}
	>
		<Icon path={alignCenter} />
	</Button>
	<Button
		active={justify.right}
		toggle
		on:change={(e) => {
			onjustify('right', e.detail);
		}}
	>
		<Icon path={alignRight} />
	</Button>
	<Button
		active={justify.justify}
		toggle
		on:change={(e) => {
			onjustify('justify', e.detail);
		}}
	>
		<Icon path={alignJustify} />
	</Button>

	<Button bind:active={isbold} toggle>
		<Icon path={bold} />
	</Button>
	<Button bind:active={isitalic} toggle>
		<Icon path={italic} />
	</Button>
</ButtonGroup>

<script>
	import { ButtonGroup, Button, Icon } from '@vikignt/svelte-ui';
	import {
		alignCenter,
		alignJustify,
		alignLeft,
		alignRight,
		bold,
		italic,
	} from '/components/icons';

	let counter = 0;

	let justify = {
		left: true,
		center: false,
		right: false,
		justify: false,
	};

	let isbold = true;
	let isitalic = false;

	function increment() {
		counter += 1;
	}

	function onjustify(param, value) {
		Object.keys(justify).map((key) => {
			justify[key] = key === param ? value : false;
		});
	}
</script>
```
