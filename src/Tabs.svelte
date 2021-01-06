<div class="tabbar {className}" bind:this={elm} {style} {...attrs} use:events>
    <div class="tabbar-wrap">
        {#each tabNames as tab, i (tab)}
            <button class="tabbutton { activeTab == i ? 'tabbuttonactive' : ''}" on:click={(e)=>{navClick(e, i)}}>
                {tab}
                <Ripple center />
            </button>
        {/each}     
        <span class="tabindicator" style="{tabindi_pos}; background-color:var(--primary);"></span>
    </div>

    <div class="tabcontent-wrap">
        <div class="tabcontent" style="{pagenav}">
            <slot></slot>
        </div>
    </div>
</div>

<script context="module">
    function addSwipe(swipeElm, elm) {
        let pos1 = 0, pos2 = 0;

        swipeElm.addEventListener('mousedown', dragMouseDown);
        swipeElm.addEventListener('touchstart', dragMouseDown, false);

        if(swipeElm.style.left == '') {
            swipeElm.style.left = '0px';
        }

        function dragMouseDown(e) {
            swipeElm.style.userSelect = 'none';
            pos2 = e.touches ? e.touches[0].clientX : e.clientX;
            document.addEventListener('mouseup', closeDragElement);
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('touchmove', elementDrag, false);
            document.addEventListener('touchend', closeDragElement, false);
        }

        function elementDrag(e) {
            swipeElm.style.pointerEvents = 'none';
            const x = e.touches ? e.touches[0].clientX : e.clientX;

            pos1 = pos2 - x;
            pos2 = x;

            const left = (parseInt(swipeElm.style.left) - pos1);
            swipeElm.style.left = (left > 0 ? 0 : left + swipeElm.scrollWidth <= elm.clientWidth ? elm.clientWidth - swipeElm.scrollWidth : left)  + 'px';
        }

        function closeDragElement() {
            document.removeEventListener('mouseup', closeDragElement);
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('touchmove', elementDrag);
            document.removeEventListener('touchend', elementDrag);

            swipeElm.style.pointerEvents = 'all';
            swipeElm.style.userSelect = 'all';
        }
    }
</script>

<script>
	import { beforeUpdate, onMount, createEventDispatcher, tick } from 'svelte';
	import { current_component } from 'svelte/internal';
    import { getEventsAction } from './lib/events';
    import Ripple from './Ripple.svelte';

	const dispatch = createEventDispatcher();
	const events = getEventsAction(current_component);

	export { className as class, style, tabNames, activeTab };

	let className = '';
	let style = null;

	let elm;
    let attrs = {};
    
    let pagenav = 'transform:translate3d(0%, 0px, 0px);';
    let tabindi_pos = '';

    let tabNames = [];
    let activeTab = 0;

	$: {
		/* eslint-disable no-unused-vars */
		const { style, tabNames, activeTab,	...other } = $$props;
		attrs = other;
	}

    $: {
        tabNames;
        activeTab = Math.abs(parseInt(activeTab));
        !Number.isInteger(activeTab) ? activeTab = 0 : activeTab;

        refreshTabs();
    } 

    onMount(() => {
        refreshTabs() ? addSwipe(elm.querySelector('.tabbar-wrap'), elm) : '';
    });
    
    async function refreshTabs () {
        await tick;
        let elms = elm.querySelectorAll('.tabbutton');

        if(elms && elms.length > 0) {
            let el = {};

            activeTab >= elms.length ? activeTab > elms.length ? activeTab = elms.length - 1 :  activeTab-- : activeTab;
            el.target = elms[activeTab];
            navClick(el, activeTab);

            return true;
        }

        return false;
    }

    function navClick(e, index) {
        let targ = e.target;

        pagenav = 'transform:translate3d(-' + (index * 100)  +'%, 0px, 0px);';
        tabindi_pos = 'left:' + (targ.offsetLeft) + 'px; width:' + targ.offsetWidth + 'px;';

        activeTab = index;
        dispatch('change', { activeTab: activeTab });
    }
</script>

<style>
    .tabbar {
        width: 100%;
        overflow: hidden;
    }

    .tabbar-wrap {
        display: flex;
        position: relative;
        transition: left 150ms;
    }

    .tabbutton{
        color: var(--color);
        min-width: 70px;
        font-family: Roboto,sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-size: .875rem;
        font-weight: 500;
        letter-spacing: .08929em;
        text-decoration: none;
        text-transform: uppercase;
        position: relative;
        display: flex;
        flex: 1 0 auto;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        height: 48px;
        margin: 0 !important;
        padding: 0 24px;
        border: none;
        outline: none;
        background: none;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        z-index: 1;
    }

    .tabbutton:before{
        bottom: 0;
        content: '';
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
        will-change: background-color, opacity;
    }
   		.tabbutton:hover:before {
			background-color: currentColor;
			opacity: 0.15;
		}

    .tabbuttonactive {
        color: var(--primary);
    }

    .tabcontent-wrap {
        overflow: hidden;
        transition: none;
    }

    .tabcontent {
        display: flex;
        align-items: flex-start;
        flex-wrap: nowrap;
        transform: translate3d(0%, 0px, 0px);
        transition: transform .35s cubic-bezier(.4,0,.2,1);
        will-change: transform;
    }
    
    .tabindicator {
        height: 2px;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: left .2s cubic-bezier(.4,0,.2,1);
        background-color: var(--primary);
    }
</style>