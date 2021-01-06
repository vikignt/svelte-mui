Tabs specifiy grouped content on same level chosen one by one.
There are two components. The wrapper **Tabs** component and the individual **Tab** component.

If the number of tabs overflow its wrapper, the tab names will have swipe/drag capability enabled.

#### HTMLElement attributes

You can use HTMLElement attributes, like

`id`, `style`, `data-*` and so on

#### Events
`change` - When a tab is clicked, it despatches the custom event **change**. 
event.detail.activeTab has the current active tab number.

Any HTMLElement events
