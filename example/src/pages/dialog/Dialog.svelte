<LoginDialog bind:visible />

<DemoPanel>
	<Button
		color="primary"
		outlined
		on:click={() => {
			visible = true;
		}}
	>
		Open Dialog
	</Button>

	<div slot="code">
		<div>
			{@html code}
		</div>
	</div>
</DemoPanel>

<Description>
	{@html doc}
</Description>

<Properties data={properties} />

<script>
	import { Button } from '/../../src';
	import LoginDialog from '/components/LoginDialog.svelte';
	import { DemoPanel, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let visible = false;
</script>
