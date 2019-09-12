<DemoContainer>
	<!-- NOTE: для Textfield outlined у родителя должен быть установлен фон -->
	<div style="flex: 1;margin: 0 8px;background: #eee;background: var(--bg-panel);">
		<Textfield bind:value {label} {required} {message} {error} {readonly} {disabled} {outlined} {filled} />
	</div>

	<div slot="play">
		<div class="properties layout alignment-top-space-between">
			<label style="width: 48%;">
				label
				<input type="text" bind:value={label} />
			</label>
			<label style="width: 48%;">
				message
				<input type="text" bind:value={message} />
			</label>
			<label>
				value
				<input type="text" bind:value />
			</label>
		</div>

		<div class="properties layout alignment-top-space-around">
			<div>
				<Radio bind:group={type} value={'default'}>
					<span title="default">default</span>
				</Radio>
				<Radio bind:group={type} value={'filled'}>filled</Radio>
				<Radio bind:group={type} value={'outlined'}>outlined</Radio>

			</div>
			<div>
				<Checkbox bind:checked={error}>error</Checkbox>
				<Checkbox bind:checked={required}>required</Checkbox>
				<Checkbox bind:checked={readonly}>readonly</Checkbox>
				<Checkbox bind:checked={disabled}>disabled</Checkbox>
			</div>
		</div>
	</div>
</DemoContainer>

<script>
	import DemoContainer from '../DemoContainer.svelte';
	import { Checkbox, Textfield, Radio } from '/src';

	let label = 'Label';
	let required = true;
	let value = '';
	let message = 'message text';
	let outlined = false;
	let filled = false;
	let error = false;
	let readonly = false;
	let disabled = false;

	let type = 'default';

	$: outlined = type === 'outlined';
	$: filled = type === 'filled';
</script>

<style>
	label {
		width: 100%;
		font-size: 13px;
		color: rgba(0, 0, 0, 0.375);
		color: var(--label);
	}
	input {
		width: 100%;
		font-size: 16px !important;
	}
</style>
