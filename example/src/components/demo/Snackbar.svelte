<Snackbar bind:visible bgcolor={bgcolors[type]} {color} {position} {timeout}>
	{message}
	<span slot="action">
		<Button color={btcolors[type]} on:click={() => (visible = false)}>Close</Button>
	</span>
</Snackbar>

<DemoContainer>
	<Button color="primary" outlined on:click={() => (visible = true)}>Show snackbar</Button>

	<div slot="props">
		<div class="layout alignment-top-space-around">
			<div>
				<Radio bind:group={type} value={'0'}>default</Radio>
				<Radio bind:group={type} value={'1'}>info</Radio>
				<Radio bind:group={type} value={'2'}>success</Radio>
				<Radio bind:group={type} value={'3'}>error</Radio>
			</div>
			<div>
				<Checkbox bind:checked={bottom}>bottom</Checkbox>
			</div>
		</div>

		<div class="layout alignment-top-space-around" style="background: #fafafa;background: var(--bg-color);">
			<Textfield classes="layout-item" outlined bind:value={message} label="Message" style="max-width: 60%;" />
			<Textfield outlined type="number" bind:value={timeout} min="0" label="Timeout" message="sec, 0 infinite" style="max-width: 26%;" />
		</div>

	</div>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Snackbar, Button, Checkbox, Radio, Textfield } from '../../../../src';

	let visible = false;
	let timeout = 5;
	let message = 'Snackbar message!';
	let color = '#fff';
	let position = 'top';

	let bottom = false;
	let type = '0';

	let bgcolors = ['rgba(0,0,0,.87)', '#1976d2', '#43a047', '#f44336', '#f50057'];
	let btcolors = ['#f50057', '#ff0', '#ff0', '#ff0', '#ff0'];

	$: position = bottom ? 'bottom' : 'top';
</script>
