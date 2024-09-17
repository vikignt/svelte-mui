<script>
  import { createEventDispatcher } from "svelte";
  import { isDate } from "./lib/date";
  import Day from "./datepicker/Day.svelte";
  import Month from "./datepicker/Month.svelte";
  import Year from "./datepicker/Year.svelte";

  export let locale;
  export let isAllowed = () => true;
  export let header = true;
  export let value = new Date();

  const dispatch = createEventDispatcher();

  let type = "days";
  let month = value.getMonth();
  let year = value.getFullYear();
  let elm;

  if (!isDate(value)) {
    value = new Date(NaN);
  }

  $: if (elm) {
    setTimeout(() => {
      if (elm) {
        elm.style.height = elm.offsetHeight + "px";
        elm.style.width = elm.offsetWidth + "px";
      }
    }, 0);
  }

  function onView({ detail }) {
    type = detail.type;
  }
  function onYear({ detail }) {
    year = +detail.year;
    type = "days";
  }
  function onMonth({ detail }) {
    month = +detail.month;
    year = +detail.year;
    type = "days";
  }
  function onDay({ detail }) {
    value = new Date(detail.getTime());
    dispatch("select", value);
  }
</script>

<div class="datepicker">
  {#if header}
    <div class="header">
      {#if !isNaN(value)}
        <div class="year">{("000" + value.getFullYear()).slice(-4)}</div>
        <div class="wrap">
          <div class="date">
            {new Intl.DateTimeFormat(locale, {
              weekday: "short",
              month: "short",
              day: "numeric",
            }).format(value)}
          </div>
        </div>
      {:else}
        <div class="year">&nbsp;</div>
        <div class="date">No Date</div>
      {/if}
    </div>
  {/if}
  <div class="body" bind:this={elm}>
    {#if type === "year"}
      <Year {year} on:select={onYear} />
    {:else if type === "month"}
      <Month {locale} bind:year {value} on:select={onMonth} on:changeView={onView} />
    {:else}
      <Day {locale} {isAllowed} bind:month bind:year {value} on:select={onDay} on:changeView={onView} />
    {/if}
  </div>
</div>

<style>
  .datepicker {
    position: relative;
    overflow: hidden;
  }
  .header {
    box-sizing: border-box;
    color: #fff;
    color: var(--alternate, #fff);
    background: #1976d2;
    background: var(--primary, #1976d2);
    padding: 16px;
    height: 97px;
  }
  .wrap {
    position: relative;
  }
  .wrap .date {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    white-space: nowrap;
  }

  .year {
    font-size: 16px;
    font-weight: 700;
    opacity: 0.6;
    margin-bottom: 8px;
  }
  .date {
    font-size: 34px;
    font-weight: 500;
  }
  .body {
    overflow: hidden;
  }

  @media only screen and (max-height: 400px) and (min-width: 420px) {
    .datepicker {
      display: flex;
    }
    .header {
      height: auto;
      width: 148px;
    }
    .wrap .date {
      white-space: unset;
    }
  }
</style>
