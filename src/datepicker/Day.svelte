<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Icon from "../Icon.svelte";
  import Button from "../Button.svelte";

  export let locale;
  export let isAllowed = () => true;
  export let value; // Date
  export let month; // Number, index
  export let year; // Number, full year

  let weekStart = 0; // Number
  let legacy = false;
  let direction = 0;

  const dispatch = createEventDispatcher();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

	const region_from_locale = (locale, _default='001') => {
		// not super robust; consider something like: https://github.com/gagle/node-bcp47
		return (locale.indexOf('-') > 0) ? locale.split('-')[1].toUpperCase() : _default;
	}

	// from cldr-json: https://github.com/unicode-org/cldr-json/blob/master/cldr-json/cldr-core/supplemental/weekData.json
	const firstDay = {"001":"mon","AD":"mon","AE":"sat","AF":"sat","AG":"sun","AI":"mon","AL":"mon","AM":"mon","AN":"mon","AR":"mon","AS":"sun","AT":"mon","AU":"sun","AX":"mon","AZ":"mon","BA":"mon","BD":"sun","BE":"mon","BG":"mon","BH":"sat","BM":"mon","BN":"mon","BR":"sun","BS":"sun","BT":"sun","BW":"sun","BY":"mon","BZ":"sun","CA":"sun","CH":"mon","CL":"mon","CM":"mon","CN":"sun","CO":"sun","CR":"mon","CY":"mon","CZ":"mon","DE":"mon","DJ":"sat","DK":"mon","DM":"sun","DO":"sun","DZ":"sat","EC":"mon","EE":"mon","EG":"sat","ES":"mon","ET":"sun","FI":"mon","FJ":"mon","FO":"mon","FR":"mon","GB":"mon","GB-alt-variant":"sun","GE":"mon","GF":"mon","GP":"mon","GR":"mon","GT":"sun","GU":"sun","HK":"sun","HN":"sun","HR":"mon","HU":"mon","ID":"sun","IE":"mon","IL":"sun","IN":"sun","IQ":"sat","IR":"sat","IS":"mon","IT":"mon","JM":"sun","JO":"sat","JP":"sun","KE":"sun","KG":"mon","KH":"sun","KR":"sun","KW":"sat","KZ":"mon","LA":"sun","LB":"mon","LI":"mon","LK":"mon","LT":"mon","LU":"mon","LV":"mon","LY":"sat","MC":"mon","MD":"mon","ME":"mon","MH":"sun","MK":"mon","MM":"sun","MN":"mon","MO":"sun","MQ":"mon","MT":"sun","MV":"fri","MX":"sun","MY":"mon","MZ":"sun","NI":"sun","NL":"mon","NO":"mon","NP":"sun","NZ":"mon","OM":"sat","PA":"sun","PE":"sun","PH":"sun","PK":"sun","PL":"mon","PR":"sun","PT":"sun","PY":"sun","QA":"sat","RE":"mon","RO":"mon","RS":"mon","RU":"mon","SA":"sun","SD":"sat","SE":"mon","SG":"sun","SI":"mon","SK":"mon","SM":"mon","SV":"sun","SY":"sat","TH":"sun","TJ":"mon","TM":"mon","TR":"mon","TT":"sun","TW":"sun","UA":"mon","UM":"sun","US":"sun","UY":"mon","UZ":"mon","VA":"mon","VE":"sun","VI":"sun","VN":"mon","WS":"sun","XK":"mon","YE":"sun","ZA":"sun","ZW":"sun"};

	const firstDay_for_region = (region, _default='mon') => {
		return firstDay[region] || _default;
	}

	const offset_for_day = (day, _default=1) => {
		// https://tc39.es/ecma262/#sec-week-day
		switch(day) {
			case 'sun': return 0;
			case 'mon': return 1;
			case 'tue': return 2;
			case 'wed': return 3;
			case 'thu': return 4;
			case 'fri': return 5;
			case 'sat': return 6;
			default: return _default;
		}
	}

	let weekdays = [];
	let cells = [];
	$: if (locale) {
		// locale changed
		weekStart = offset_for_day( firstDay_for_region( region_from_locale(locale) ) );
		weekdays.length = 0;
		let date = new Date(0); // universal time zero (UTC: Thu, 01 Jan 1970 00:00:00 GMT)
		date.setHours(0); // start of day, local time
		let dayZero = date.getDate() - date.getDay() + 7; // day zero of the week (Sunday)
		while (dayZero > 16) dayZero -= 7; // avoid overflow: (dayZero + 6 + 6) <= 28
		for (let i = 0; i < 7; i++) {
			date.setDate(dayZero + weekStart + i);
			weekdays.push(
				new Intl.DateTimeFormat(locale, {
					weekday: 'narrow',
				}).format(date)
			);
		}

    cells = getDateCells(year, month).map((c) => ({
      value: c,
      allowed: allow(year, month, c),
    }));
  }

  $: cells = getDateCells(year, month, value).map((c) => ({
    value: c,
    allowed: allow(year, month, c),
  }));

	onMount(() => {
		legacy = typeof document.createElement('div').style.grid !== 'string';
		if (!locale) {
			locale =
				navigator.languages && navigator.languages.length
					? navigator.languages[0]
					: navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-US';
		}
	});

  const allow = (year, month, date) => {
    if (!date) return true;
    return isAllowed(new Date(year, month, date));
  };

  const getDateCells = (year, month) => {
    const rows = Array.from({ length: 42 });
    const days = new Date(year, month + 1, 0).getDate();
    let startIndex = new Date(year, month, 1).getDay();

    if (startIndex < weekStart) {
      startIndex += 7;
    }

    Array.from({ length: days }).forEach((_, i) => {
      const index = startIndex + i - weekStart;
      rows[index] = i + 1;
    });

    return rows;
  };

  function onMonth() {
    direction = 0;
    dispatch("changeView", { type: "month" });
  }

  function onDay(e) {
    if (isNaN(value)) {
      value = new Date(year, month, +e.target.innerText);
    } else {
      value.setFullYear(year, month, +e.target.innerText);
    }
    value = value;
    dispatch("select", value);
  }
  function onKeydown(e) {
    // click simulate
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.stopPropagation();
      e.preventDefault();

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      e.target.dispatchEvent(clickEvent);
      e.target.blur();
    }
  }

  function isEqualDate(d1, d2) {
    return (
      d1 &&
      d2 &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function addMonths(amount) {
    let d = new Date(new Date().setFullYear(year, month, 1));
    d.setMonth(d.getMonth() + amount);
    month = d.getMonth();
    year = d.getFullYear();
    direction = amount;
  }
</script>

<div class="view">
  <div class="toolbar">
    <Button
      icon
      style="z-index: 5;"
      disabled={year < 2 && month < 1}
      on:click={() => {
        addMonths(-1);
      }}
    >
      <Icon path="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </Button>
    <Button
      icon
      style="z-index: 5;"
      on:click={() => {
        addMonths(1);
      }}
    >
      <Icon path="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </Button>
  </div>
  <div class="grid">
    {#each [0] as item (legacy ? item : year + month)}
      <div
        class="grid-cell"
        in:fly|local={{ x: direction * 50, duration: 200, delay: 80 }}
        out:fade|local={{ duration: direction === 0 ? 0 : 160 }}
      >
        <div class="title" tabindex="0" on:keydown={onKeydown} on:click={onMonth}>
          {new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(year, month, 1))}
          {("000" + year).slice(-4)}
        </div>
        <div class="weekdays">
          {#each weekdays as day}
            <span class="cell">{day}</span>
          {/each}
        </div>
        {#each Array(6) as _, week}
          <div class="row">
            {#each Array(7) as _, day}
              <div class="cell">
                {#if cells[day + week * 7].value}
                  <span
                    tabindex={!cells[day + week * 7].allowed ? "-1" : "0"}
                    class="day-control"
                    class:today={isEqualDate(
                      new Date(new Date().setFullYear(year, month, cells[day + week * 7].value)),
                      today
                    )}
                    class:selected={isEqualDate(
                      new Date(new Date().setFullYear(year, month, cells[day + week * 7].value)),
                      isNaN(value) ? new Date(0) : value
                    )}
                    class:disabled={!cells[day + week * 7].allowed}
                    on:keydown={onKeydown}
                    on:click={onDay}
                  >
                    {cells[day + week * 7].value || ""}
                  </span>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .view {
    position: relative;
    padding: 0 8px 4px;
  }
  .toolbar {
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    height: 48px;
    top: 0;
    right: 0;
    left: 0;
  }
  .grid {
    width: 100%;
    overflow: hidden;
    user-select: none;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr;
    -ms-grid-rows: 1fr;
  }
  .grid-cell {
    position: relative;
    z-index: 3;
    -ms-grid-column: 1;
    grid-column: 1;
    -ms-grid-row: 1;
    grid-row: 1;
  }
  .grid-cell:nth-child(2) {
    -ms-grid-row: 1;
    grid-row: 1;
  }
  .title {
    height: 48px;
    font-size: 16px;
    letter-spacing: 0.75px;
    text-align: center;
    margin: 0 48px;
    outline: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title:focus,
  .title:hover,
  .title:active {
    color: #1976d2;
    color: var(--primary, #1976d2);
  }
  .weekdays {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    margin: 8px 0;
    opacity: 0.5;
  }

  .row {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 2px;
  }
  .cell {
    position: relative;
    width: 34px;
    height: 34px;
    user-select: none;
  }
  .weekdays .cell {
    text-align: center;
    width: 36px;
    height: unset;
  }
  .day-control {
    font-size: 14px;
    font-weight: 500;
    display: block; /* .selected need it */
    box-sizing: border-box;
    cursor: pointer;
    width: 34px;
    height: 34px;
    line-height: 34px;
    border-radius: 50%;
  }
  .day-control.today {
    border: 1px solid;
    border-color: #1976d2;
    border-color: var(--primary, #1976d2);
    color: #1976d2;
    color: var(--primary, #1976d2);
    line-height: 32px; /* 2px border */
  }
  .day-control.selected {
    background: #1976d2;
    background: var(--primary, #1976d2);
    color: #fff;
    color: var(--alternate, #fff);
    font-weight: 700;
  }
  .day-control:focus {
    outline: none;
  }
  .day-control:before {
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
    transition: 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
    will-change: background-color, opacity;
  }
  @media (hover: hover) {
    .day-control:hover:not([disabled]):not(.disabled):before {
      background-color: currentColor;
      opacity: 0.15;
    }
    .day-control:focus-visible:not([disabled]):not(.disabled):before {
      background-color: currentColor;
      opacity: 0.3;
    }
  }
</style>
