<script>
  import { beforeUpdate, createEventDispatcher } from "svelte";

  import { islegacy, luminance } from "./lib/colors";
  import Ripple from "./Ripple.svelte";

  const dispatch = createEventDispatcher();

  export {
    className as class,
    style,
    icon,
    fab,
    dense,
    raised,
    unelevated,
    outlined,
    shaped,
    color,
    ripple,
    toggle,
    active,
    fullWidth,
  };

  let className = "";
  let style = null;

  let icon = false;
  let fab = false;

  let dense = false;
  let raised = false;
  let unelevated = false;
  let outlined = false;

  let shaped = false;

  let color = null;
  let ripple = true;
  let toggle = false;
  let active = false;
  let fullWidth = false;

  let elm;
  let attrs = {};

  $: {
    /* eslint-disable no-unused-vars */
    const {
      style,
      icon,
      fab,
      dense,
      raised,
      unelevated,
      outlined,
      shaped,
      color,
      ripple,
      toggle,
      active,
      fullWidth,
      ...other
    } = $$props;

    !other.disabled && delete other.disabled;
    delete other.class;
    attrs = other;
  }

  $: iconSize = icon ? (fab ? 24 : dense ? 20 : 24) : dense ? 16 : 18;

  $: if (color === "primary") {
    color = islegacy() ? "#1976d2" : "var(--primary, #1976d2)";
  } else if (color == "accent") {
    color = islegacy() ? "#f50057" : "var(--accent, #f50057)";
  } else if (!color && elm) {
    color = elm.style.color || elm.parentElement.style.color || (islegacy() ? "#333" : "var(--color, #333)");
  }

  beforeUpdate(() => {
    if (!elm) return;
    let svgs = elm.getElementsByTagName("svg");
    let len = svgs.length;

    for (let i = 0; i < len; i++) {
      svgs[i].setAttribute("width", iconSize + (toggle && !icon ? 2 : 0));
      svgs[i].setAttribute("height", iconSize + (toggle && !icon ? 2 : 0));
    }

    elm.style.backgroundColor = raised || unelevated ? color : "transparent";
    let bg = getComputedStyle(elm).getPropertyValue("background-color");
    elm.style.color = raised || unelevated ? (luminance(bg) > 0.5 ? "#000" : "#fff") : color;
  });

  function onclick(e) {
    if (toggle) {
      active = !active;
      dispatch("change", active);
    }
  }
</script>

<button
  class:raised
  class:outlined={outlined && !(raised || unelevated)}
  class:shaped={shaped && !icon}
  class:dense
  class:fab={fab && icon}
  class:icon-button={icon}
  class:toggle
  class:active={toggle && active}
  class:full-width={fullWidth && !icon}
  class={className}
  {style}
  on:click={onclick}
  on:click
  on:mousedown
  on:mouseup
  on:mouseover
  on:mouseout
  on:mousemove
  on:dblclick
  on:contextmenu
  on:mouseenter
  on:mouseleave
  on:focus
  on:blur
  {...attrs}
  bind:this={elm}
>
  <slot />

  {#if ripple}
    <Ripple center={icon} circle={icon} />
  {/if}
</button>

<style>
  button:disabled {
    cursor: default;
  }
  button {
    cursor: pointer;
    font-family: Roboto, Helvetica, sans-serif;
    /* postcss-custom-properties: ignore next */
    font-family: var(--button-font-family, Roboto, Helvetica, sans-serif);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.75px;
    text-decoration: none;
    text-transform: uppercase;
    will-change: transform, opacity;
    margin: 0;
    padding: 0 16px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 36px;
    border: none;
    outline: none;
    line-height: inherit;
    user-select: none;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 4px;
  }
  button::-moz-focus-inner {
    border: 0;
  }
  button:-moz-focusring {
    outline: none;
  }
  button:before {
    box-sizing: inherit;
    border-radius: inherit;
    color: inherit;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
    will-change: background-color, opacity;
  }
  .toggle:before {
    box-sizing: content-box;
  }
  .active:before {
    background-color: currentColor;
    opacity: 0.3;
  }

  .raised {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  .outlined {
    padding: 0 14px;
    border-style: solid;
    border-width: 2px;
  }
  .shaped {
    border-radius: 18px;
  }
  .dense {
    height: 32px;
  }

  .icon-button {
    line-height: 0.5;
    border-radius: 50%;
    padding: 8px;
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
  .icon-button.outlined {
    padding: 6px;
  }
  .icon-button.fab {
    border: none;
    width: 56px;
    height: 56px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  }
  .icon-button.dense {
    width: 36px;
    height: 36px;
  }

  .icon-button.fab.dense {
    width: 40px;
    height: 40px;
  }

  .outlined:not(.shaped) :global(.ripple) {
    border-radius: 0 !important;
  }

  .full-width {
    width: 100%;
  }

  @media (hover: hover) {
    button:hover:not(.toggle):not([disabled]):not(.disabled):before {
      background-color: currentColor;
      opacity: 0.15;
    }
    button:focus-visible:not(.toggle):not([disabled]):not(.disabled):before {
      background-color: currentColor;
      opacity: 0.3;
    }
    button.toggle:focus-visible:not(.active):not([disabled]):not(.disabled):before {
      background-color: currentColor;
      opacity: 0.15;
    }
  }
</style>
