<script>
  import { tick, onMount, onDestroy, createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { trapTabKey } from "./lib/focusableElm";
  import enableScroll from "./lib/enableScroll";

  const dispatch = createEventDispatcher();

  export { className as class, style, visible, width, modal, closeByEsc, beforeClose };

  let className = "";
  let style = "";
  let visible = false;
  let width = 320;
  let modal = false;
  let closeByEsc = true;
  let beforeClose = () => true;

  let mouseDownOutside = false;

  let attrs = {};

  $: {
    /* eslint-disable no-unused-vars */
    const { style, visible, width, modal, closeByEsc, beforeClose, ...other } = $$props;

    delete other.class;

    attrs = other;
  }

  let mounted = false;
  let elm;

  $: if (visible) {
    mounted && enableScroll(false);
    onVisible();
  } else {
    mouseDownOutside = false;
    mounted && enableScroll(true);
  }

  onMount(async () => {
    await tick();
    mounted = true;
  });

  onDestroy(() => {
    mounted && enableScroll(true);
  });

  function close(params) {
    if (beforeClose()) {
      dispatch("close", params);
      visible = false;
    }
  }

  async function onVisible() {
    await tick();
    if (!elm) return;

    let inputs = elm.querySelectorAll('input:not([type="hidden"])');
    let length = inputs.length;
    let i = 0;

    for (; i < length; i++) {
      if (inputs[i].getAttribute("autofocus")) {
        break;
      }
    }
    i < length ? inputs[i].focus() : length > 0 ? inputs[0].focus() : elm.focus();
    dispatch("open");
  }

  function onKey(e) {
    const esc = "Escape";

    if (e.keyCode === 27 || e.key === esc || e.code === esc) {
      closeByEsc && close(esc);
    }
    if (visible) {
      trapTabKey(e, elm);
    }
  }
  function onPopstate() {
    visible = false;
  }
</script>

<svelte:window on:keydown={onKey} on:popstate={onPopstate} />

{#if visible}
  <div
    transition:fade={{ duration: 180 }}
    class="mui-overlay"
    on:mousedown={() => {
      mouseDownOutside = true;
    }}
    on:mouseup={() => {
      mouseDownOutside && !modal && close("clickOutside");
    }}
  >
    <div
      in:scale={{ duration: 180, opacity: 0.5, start: 0.75, easing: quintOut }}
      class={"mui-modal " + className}
      style={`width: ${width}px;${style}`}
      tabindex="-1"
      bind:this={elm}
      {...attrs}
      on:mousedown|stopPropagation
      on:mouseenter={() => {
        mouseDownOutside = false;
      }}
    >
      <slot />
    </div>
  </div>
{/if}

<style>
  .mui-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 30;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mui-modal {
    position: relative;
    font-size: 1rem;
    background: #eee;
    /* postcss-custom-properties: ignore next */
    background: var(--bg-panel, #eee);
    border-radius: 4px;
    cursor: auto;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12);
    z-index: 40;
    max-height: 80%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .mui-modal:focus {
    outline: none;
  }
  .mui-modal::-moz-focus-inner {
    border: 0;
  }
  .mui-modal:-moz-focusring {
    outline: none;
  }
</style>
