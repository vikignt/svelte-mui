```xml
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
				<Button color='primary' on:click={()=> {remove(tab)} } style="margin-top:24px">Remove Tab</Button>
			</div>
		</Tab>
	{/each}
</Tabs>

<div class="tabpropchange">
	<Button color='primary' on:click={()=> {add('Tab ' + ++tabCounter)} } style="margin:24px 0">Add Tab</Button>
	
	<div>Change active tab</div>
	<input type="text" bind:value={activetab} style="width:100px" />
</div>


<script>
	import { Tabs, Tab, Button } from 'svelte-mui';

	let tabCounter = 5;
	let activetab = 0;

	let tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

	function remove(tabName) {
		tabs = tabs.filter(tab => tab !== tabName);
	}

	function add(tabName) {
		tabs = [...tabs, tabName];
	}	

	function tabChange (e) {
		console.log(e.detail.activeTab);
	}
</script>

<style>
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
```
