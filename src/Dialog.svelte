<script>
  import Modal from "./Modal.svelte";

  export { visible };

  let visible = false;
  let props = {};

  $: {
    /* eslint-disable no-unused-vars */
    const { visible, ...other } = $$props;
    props = other;
  }
</script>

<Modal on:open on:close bind:visible {...props}>
  <div>
    <div class="title">
      <slot name="title" />
    </div>

    <div class="content">
      <slot />
    </div>

    <slot name="actions" />

    <slot name="footer" />
  </div>
</Modal>

<style>
  div :global(.actions) {
    min-height: 48px;
    padding: 8px;
    display: flex;
    align-items: center;
  }
  div :global(.center) {
    justify-content: center;
  }
  div :global(.left) {
    justify-content: flex-start;
  }
  div :global(.right) {
    justify-content: flex-end;
  }

  .title {
    padding: 16px 16px 12px;
    font-size: 24px;
    line-height: 36px;
    background: rgba(0, 0, 0, 0.1);
    /* postcss-custom-properties: ignore next */
    background: var(--divider, rgba(0, 0, 0, 0.1));
  }
  .content {
    margin: 16px;
  }
</style>
