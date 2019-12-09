ExpansionPanel provides an expandable view

Multiple ExpansionPanel's can be combined into an __accordion__ with binding same `group` property and must contain unique `name` propery

#### HTMLElement attributes

You can use any HTMLElement attributes, like

`id`, `class`, `style`, `disabled`, `data-*` and so on

#### Events

`change` custom event emitted when the panel is open or close, `detail` object contains boolean `expanded` and `name` fields

Any HTMLElement events

#### Slots

`icon` may contain an custom icon
