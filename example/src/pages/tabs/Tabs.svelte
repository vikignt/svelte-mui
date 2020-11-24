<DemoPanel>
	<div style="flex:1; padding:0 10px; background:#eee; background: var(--bg-panel); width:100%;">
		<Tabs tabNames={['Tab 1', 'Tab 2', 'Tab 3']}>
			<Tab>
				<div class="tabcontent">Content 1...</div>
			</Tab>

			<Tab>
				<div class="tabcontent">Content 2...</div>
			</Tab>

			<Tab>
				<div class="tabcontent">Content 3...</div>
			</Tab>			
		</Tabs>

        <Tabs tabNames={tabs} activeTab={activetab} on:change={(e)=>{ tabChange(e) }} style="margin-top:36px">
		{#each tabs as tab, i (tab)}
			<Tab>
				<div class="tabcontent">
					<div>{tab} content</div>
					<Button color='primary' outlined on:click={()=> {remove(tab)} } style="margin-top:24px">Remove Tab</Button>
				</div>
			</Tab>
		{/each}
        </Tabs>

		<div class="tabpropchange">
			<Button color='primary' outlined on:click={()=> {add('Tab ' + ++tabCounter)} } style="margin:24px 0">Add Tab</Button>
			
			<div>Change active tab</div>
			<input type="text" bind:value={activetab} style="width:113px" />
		</div>
	</div>

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

<Properties data={custom}>
	<h4 slot="name">CSS custom properties</h4>
</Properties>

<script>
	import { Tabs, Tab } from '/../../src';
	import { Button } from '/../../src';
	import { DemoPanel, Play, Description, Properties } from '/components/demo';
	
	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';
	import custom from './custom';

	let label = 'Label';
	let required = true;
	let value = '';
	let error = '';
	let message = 'help message';
	let messagePersist = false;
	let outlined = false;
	let filled = false;
	let readonly = false;
	let disabled = false;

	let type = 'default';

	let tabCounter = 5;
	let activetab = 0;

	let tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

	$: outlined = type === 'outlined';
	$: filled = type === 'filled';

	function remove(tabName) {
		tabs = tabs.filter(tab => tab !== tabName);
	}

	function add(tabName) {
		tabs = [...tabs, tabName];
	}	

	function tabChange (e) {
		//console.log(e.detail.activeTab);
	}
</script>

<style>
	input {
		width: 100%;
		font-family: inherit;
		font-size: 16px !important;
		color: var(--color);
		background: var(--bg-color);
		padding: 6px;
		margin: 4px 0 4px 0;
		border: 1px solid var(--divider);
		border-radius: 2px;
	}

	.tabcontent {
		padding: 16px;
		border: 1px solid #ddd;
	}

	.tabpropchange {
		align-items:center;
		display:flex;
		flex-flow:column
	}
</style>
