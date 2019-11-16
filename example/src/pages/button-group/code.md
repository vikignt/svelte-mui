```xml
<ButtonGroup>
	<Button color="primary" on:click={increment}>This one</Button>
	<Button color="primary" on:click={increment}>Click</Button>
	<Button color="primary" on:click={increment}>Here</Button>
</ButtonGroup>

<ButtonGroup>
	<ToggleButton
		active={justify.left}
		color="accent"
		on:change={(e) => {
			onjustify('left', e.detail);
		}}
	>
		<Icon path={alignLeft} />
	</ToggleButton>
	<ToggleButton
		active={justify.center}
		color="accent"
		on:change={(e) => {
			onjustify('center', e.detail);
		}}
	>
		<Icon path={alignCenter} />
	</ToggleButton>
	<ToggleButton
		active={justify.right}
		color="accent"
		on:change={(e) => {
			onjustify('right', e.detail);
		}}
	>
		<Icon path={alignRight} />
	</ToggleButton>
	<ToggleButton
		active={justify.justify}
		color="accent"
		on:change={(e) => {
			onjustify('justify', e.detail);
		}}
	>
		<Icon path={alignJustify} />
	</ToggleButton>

	<ToggleButton bind:active={isbold} color="accent">
		<Icon path={bold} />
	</ToggleButton>
	<ToggleButton bind:active={isitalic} color="accent">
		<Icon path={italic} />
	</ToggleButton>
</ButtonGroup>
<script>
	import { ButtonGroup, Button, ToggleButton, Icon } from '@vikignt/svelte-ui';
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
		left: false,
		center: false,
		right: false,
		justify: false,
	};

	let isbold = false;
	let isitalic = false;

	function increment() {
		counter += 1;
	}

	function onjustify(param, value) {
		if (!value) {
			justify[param] = value;
			return;
		}
		Object.keys(justify).map((key) => {
			justify[key] = key === param ? true : false;
		});
	}
</script>
```
