<script>
  import { Button, Checkbox } from "../../../../src";
  import { DemoPanel } from "../../components/demo";

  import code from "./code.md";

  let colors = ["coral", "goldenrod", "limegreen"];
  let favorite = ["coral", "goldenrod"];

  // Checkbox 'All' reactive properties
  $: checked = favorite.length === colors.length;
  $: indeterminate = favorite.length > 0 && favorite.length < colors.length;

  function onAll(e) {
    let on = e.target.checked;

    favorite = on ? Array.from(colors) : [];
  }
</script>

<DemoPanel>
  <div class="wrapper">
    <Checkbox on:change={onAll} {checked} {indeterminate}>All</Checkbox>
    <hr style="margin-bottom: 8px;" />

    {#each colors as item}
      <Checkbox class="thin" bind:group={favorite} value={item} color={item}>
        <span style={`color: ${item}`}>{item}</span>
      </Checkbox>
    {/each}
  </div>

  <div class="action" slot="action">
    <Button shaped on:click={() => (favorite = Array.from(colors))}>Select All</Button>
    <Button shaped on:click={() => (favorite = [])}>Clear All</Button>
  </div>

  <p class="result" slot="result">
    Value: [
    {#if favorite.length > 0}
      <span class="mono">{favorite.join(", ")}</span>
    {/if}
    ]
  </p>

  <div slot="code">
    <div>
      {@html code}
    </div>
  </div>
</DemoPanel>

<style>
  .wrapper {
    width: 100%;
  }
  .wrapper :global(.thin) {
    margin-top: -8px !important;
  }
</style>
