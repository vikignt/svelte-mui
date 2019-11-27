<Sidepanel bind:visible={leftVisible}>
	<div class="toolbar">Left</div>
	<p>
		<i style="padding: 12px;">Blank</i>
	</p>
</Sidepanel>

<Sidepanel right bind:visible={rightVisible}>
	<div class="toolbar">Right</div>
	<p>
		<i style="padding: 12px;">Blank</i>
	</p>
</Sidepanel>

<DemoPanel>
	<Button
		color="primary"
		outlined
		on:click={() => {
			leftVisible = true;
		}}
	>
		Open Left
	</Button>
	<Button
		color="primary"
		outlined
		on:click={() => {
			rightVisible = true;
		}}
	>
		Open Right
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
	import { Button, Sidepanel } from '/../../src';
	import { DemoPanel, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let leftVisible = false;
	let rightVisible = false;
</script>

<style>
	.toolbar {
		height: 48px;
		padding: 0 4px 0 1rem;
		display: flex;
		align-items: center;
		color: #fff;
		background: var(--bg-app-bar);
	}
</style>
