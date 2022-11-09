<script>
  import { slide } from "svelte/transition";

  import { Button, Icon } from "../../../../src";
  import { code } from "../../components/icons";

  let codeVisible = false;
</script>

<div class="demo-panel">
  <div class="toolbar">
    <span class="title">Example</span>
    <Button icon title="Code" color="inherit" on:click={() => (codeVisible = !codeVisible)}>
      <Icon path={code} />
    </Button>
  </div>

  {#if codeVisible}
    <div transition:slide class="hljs code">
      <slot name="code">Not have code yet</slot>
    </div>
  {/if}

  <div class="demo">
    <slot />
    <slot name="action" />
  </div>

  <slot name="result" />
</div>

<style>
  .demo-panel {
    display: inline-block;
    background: var(--bg-panel);
    /* margin-bottom: 16px; */
    width: 100%;
  }
  .demo-panel :global(.result) {
    padding: 0 8px;
    text-align: center;
  }

  .toolbar {
    display: flex;
    align-items: center;
    height: 48px;
    padding: 0 8px 0 16px;
    color: var(--label);
    background: var(--bg-panel);
  }
  .toolbar .title {
    flex: 1;
    font-size: 18px;
    letter-spacing: 0.4px;
  }
  .code {
    overflow-x: auto;
    border-radius: 0;
    border: 1px solid var(--bg-panel);
  }
  .demo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: var(--bg-panel);
    margin: 1rem 0;
    padding: 8px;
    min-height: 7.25rem;
  }
  .demo :global(button) {
    margin: 4px;
  }
  .demo :global(.action) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
