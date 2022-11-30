<script>
  import { createEventDispatcher } from "svelte";
  import { trapTabKey } from "./lib/focusableElm";

  const dispatch = createEventDispatcher();

  export { className as class, style, origin, dx, dy, visible, duration };

  let className = "";
  let style = null;
  let origin = "top left";
  let dx = 0;
  let dy = 0;
  let visible = false;
  let duration = 300;

  let popoverEl;
  let triggerEl;

  let listeners = [];

  const MARGIN = 8;

  $: if (visible === true) {
    triggerEl = popoverEl ? popoverEl.parentElement : null;
    triggerEl && setStyle();
  }

  function popoverIn(target) {
    target.style.transformOrigin = origin;
    target.style.transform = "scale(0.6)";
    target.style.opacity = "0";

    return {
      duration: +duration,
    };
  }
  function popoverOut(target) {
    target.style.transformOrigin = origin;
    target.style.transitionDuration = duration + "ms";
    target.style.transitionProperty = "opacity, transform";
    target.style.transform = "scale(0.6)";
    target.style.opacity = "0";

    return {
      duration: +duration,
    };
  }
  function istart({ target }) {
    setTimeout(() => {
      target.style.transitionDuration = duration + "ms";
      target.style.transitionProperty = "opacity, transform";
      target.style.transform = "scale(1)";
      target.style.opacity = null;
    }, 0);
  }
  function iend({ target }) {
    target.style.transformOrigin = null;
    target.style.transitionDuration = null;
    target.style.transitionProperty = null;
    target.style.transform = null;

    let scrollable = target;
    while ((scrollable = getScrollable(scrollable.parentElement))) {
      try {
        scrollable.addEventListener("scroll", onScroll);
        listeners.push(scrollable);
      } catch (error) {}
    }

    // grab focus
    target.focus();
    dispatch("open");
  }
  function oend({ target }) {
    if (listeners.length > 0) {
      let listener;
      while ((listener = listeners.pop())) {
        try {
          listener.removeEventListener("scroll", onScroll);
        } catch (error) {}
      }
    }

    dispatch("close");
  }
  function getLeftPosition(width, rc) {
    let left = 0;
    dx = +dx;
    const maxLeft = window.innerWidth - MARGIN - width;
    const minLeft = MARGIN;
    left = origin.indexOf("left") >= 0 ? (left = rc.left + dx) : (left = rc.left + rc.width - width - dx);

    left = Math.min(maxLeft, left);
    left = Math.max(minLeft, left);
    return left;
  }
  function getTopPosition(height, rc) {
    let top = 0;
    dy = +dy;
    const maxTop = window.innerHeight - MARGIN - height;
    const minTop = MARGIN;

    top = origin.indexOf("top") >= 0 ? (top = rc.top + dy) : (top = rc.top + rc.height - height - dy);

    top = Math.min(maxTop, top);
    top = Math.max(minTop, top);
    return top;
  }
  function setStyle() {
    if (!visible || !popoverEl || !triggerEl) return;

    const rect = triggerEl.getBoundingClientRect();
    if (rect.top < -rect.height || rect.top > window.innerHeight) {
      close("overflow");
      return;
    }
    popoverEl.style.top = getTopPosition(popoverEl.offsetHeight, rect) + "px";
    popoverEl.style.left = getLeftPosition(popoverEl.offsetWidth, rect) + "px";
  }

  function close(params) {
    dispatch("close", params);
    visible = false;
  }
  // window event handlers
  function onScroll() {
    setStyle();
  }
  function onResize() {
    setStyle();
  }
  function onKeydown(e) {
    if (visible) {
      if (e.keyCode === 27) {
        e.stopPropagation();
        close("escape");
      }
      trapTabKey(e, popoverEl);
    }
  }
  function onclickOutside(e) {
    if (visible && triggerEl && !triggerEl.contains(e.target)) {
      e.stopPropagation();
      close("clickOutside");
    }
  }

  const isScrollable = function (elm) {
    if (!elm) return false;
    if (!(elm instanceof Element)) return false;

    const hasScrollableContent = elm.scrollHeight > elm.clientHeight;

    const overflowYStyle = window.getComputedStyle(elm).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

    return hasScrollableContent && !isOverflowHidden;
  };

  const getScrollable = function (elm) {
    if (!elm) return null;
    if (isScrollable(elm)) return elm;

    return getScrollable(elm.parentNode);
  };
</script>

<svelte:window
  on:scroll|passive={onScroll}
  on:resize|passive={onResize}
  on:keydown|capture={onKeydown}
  on:click|capture={onclickOutside}
/>

{#if visible}
  <div
    class={"popover " + className}
    {style}
    tabindex="-1"
    in:popoverIn
    out:popoverOut
    on:introstart={(e) => istart(e)}
    on:introend={(e) => iend(e)}
    on:outroend={(e) => oend(e)}
    on:click
    bind:this={popoverEl}
  >
    <slot />
  </div>
{/if}

<style>
  .popover {
    color: #333;
    /* postcss-custom-properties: ignore next */
    color: var(--color, #333);
    background: #fff;
    /* postcss-custom-properties: ignore next */
    background: var(--bg-popover, #fff);
    backface-visibility: hidden;
    position: fixed;
    border-radius: 2px;
    max-height: 100%;
    max-width: 80%;
    overflow: auto;
    outline: none;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    z-index: 50;
  }
</style>
