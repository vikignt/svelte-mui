<DemoPanel>
	<div class="container">
		<ExpansionPanel
			name="Panel 1"
			bind:group={group[0]}
			{dense}
			expand
			disabled
			on:change={onchage}
		>
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
				dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
				velit! Inventore laborum rerum at id?
			</div>
		</ExpansionPanel>
		<ExpansionPanel
			name="Panel 2"
			bind:group={group[accordion ? 0 : 1]}
			{dense}
			on:change={onchage}
		>
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
				dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
				velit! Inventore laborum rerum at id?
			</div>
		</ExpansionPanel>
		<ExpansionPanel
			name="Panel 3"
			bind:group={group[accordion ? 0 : 2]}
			{dense}
			rotate={false}
			on:change={onchage}
		>
			<div slot="icon">
				<Icon>
					<svelte:component this={approval} />
				</Icon>
			</div>
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
				dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
				velit! Inventore laborum rerum at id?
			</div>
		</ExpansionPanel>
		<ExpansionPanel
			name="Panel 4"
			bind:group={group[accordion ? 0 : 3]}
			{dense}
			on:change={onchage}
		>
			<div slot="icon">
				<Icon path="M7 10l5 5 5-5z" />
			</div>
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quod culpa et,
				dolores omnis, ipsum in perspiciatis porro ut nihil molestiae molestias tenetur delectus
				velit! Inventore laborum rerum at id?
			</div>
		</ExpansionPanel>
	</div>

	<div slot="action">
		<Checkbox bind:checked={accordion}>accordion</Checkbox>
		<Checkbox bind:checked={dense}>dense</Checkbox>
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

<script>
	import { ExpansionPanel, Checkbox, Icon } from '/../../src';
	import approval from '/components/icons/svg/approval.svg';
	import { DemoPanel, Description, Properties } from '/components/demo';

	import code from './code.md';
	import doc from './doc.md';
	import properties from './props';

	let accordion = true;
	let group = Array(4);
	let dense = false;

	const onchage = ({ detail }) => {
		// console.log(detail.expanded ? 'open' : 'close', detail.name);
	};
</script>

<style>
	.container {
		width: 100%;
		border-radius: 4px;
		margin-bottom: 3em;
	}
	.container:last-child {
		margin-bottom: 0;
	}
	.container :global(button) {
		margin: 0;
	}
</style>
