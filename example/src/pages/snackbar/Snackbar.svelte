<script>
  import { DemoPanel, Play, Description, Properties } from "../../components/demo";
  import { Snackbar, Button, Checkbox, Radio, Textfield } from "../../../../src";
  import Icon from "../../../../src/Icon.svelte";
  import approval from "../../components/icons/svg/approval.svg";

  import code from "./code.md";
  import doc from "./doc.md";
  import properties from "./props";

  let visible = false;
  let timeout = 5;
  let message = "Snackbar message!";
  let color = "#fff";
  let progress = false;
  let icon = false;

  let bottom = false;
  let type = "0";

  let bgs = ["rgba(0,0,0,.87)", "#1976d2", "#43a047", "#f44336"];
  let btcolors = ["#f50057", "#ff0", "#ff0", "#ff0"];
</script>

<Snackbar
  bind:visible
  bg={bgs[type]}
  {progress}
  progressStyle="background-color: red"
  {color}
  {bottom}
  {timeout}
  on:open={() => console.log("snackbar open")}
>
  <span slot="icon">
    {#if icon}
      <Icon style="padding-right: 8px">
        <svelte:component this={approval} />
      </Icon>
    {/if}
  </span>
  {message}
  <span slot="action">
    <Button color={btcolors[type]} on:click={() => (visible = false)}>Close</Button>
  </span>
</Snackbar>

<DemoPanel>
  <Button color="primary" outlined on:click={() => (visible = true)}>Show snackbar</Button>

  <div slot="code">
    <div>
      {@html code}
    </div>
  </div>
</DemoPanel>

<Play>
  <div>
    <Radio bind:group={type} value={"0"} title="default">default *</Radio>
    <Radio bind:group={type} value={"1"}>info</Radio>
    <Radio bind:group={type} value={"2"}>success</Radio>
    <Radio bind:group={type} value={"3"}>error</Radio>
  </div>
  <div>
    <Checkbox bind:checked={bottom}>bottom</Checkbox>
  </div>
  <div>
    <Radio bind:group={icon} value={false} title="default">without icon *</Radio>
    <Radio bind:group={icon} value={true} title="show">with icon</Radio>
  </div>
  <div>
    <Radio bind:group={progress} value={false} title="default">without progress bar *</Radio>
    <Radio bind:group={progress} value={true} title="show">with progress bar</Radio>
  </div>
  <div class="text-fields">
    <Textfield
      class="layout-item"
      outlined
      bind:value={message}
      label="Message"
      style="max-width: 60%;"
    />
    <Textfield
      outlined
      type="number"
      bind:value={timeout}
      min="0"
      label="Timeout"
      message="sec, 0 infinite"
      style="max-width: 26%;"
    />
  </div>
</Play>

<Description>
  {@html doc}
</Description>

<Properties data={properties} />

<style>
  .text-fields {
    display: flex;
    flex: 1 1 100%;
    justify-content: space-around;
    align-items: flex-start;
    background: var(--bg-color);
  }
</style>
