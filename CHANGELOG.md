# svelte-mui changelog

## 0.3.3-5

- example
	typo
- Datefield
	changes the props order

## 0.3.3-4

- Dialog
	fix for the sapper when loading a page with a visible dialog
- ButtonGroup
	- set wrap style

## 0.3.3-3

- Popover
	- fix click outside

## 0.3.3-2

- Popover
	- listen keydown event on capture phase and stopPropagation on ESC key

## 0.3.3

- Button
	- color optimize
- ExpansionPanel
	- fix header align-items on ff

## 0.3.1

- ExpansionPanel
	- set local transition

## 0.3.0

- add src to the npm package for sapper
- ExpansionPanel
	- fix slide on safari

## 0.2.2

- ExpansionPanel new component
- Button
	- update :hove, :focus style for toggle button
- Icon, Datepicker
	- small optimization

## 0.2.1

- rename repo svelte-ui -> svelte-mui
- Datefield
	- add borber-radius popover element

## 0.2.0

- ToggleButton delete
- color
	- fix ssr
- Datefield new component
- Popover
	- dispatch 'close' custom event
- Datepicker new component

## 0.1.11

- ButtonGroup
	- firefox fix empty text node

## 0.1.9

- ButtonGroup
	- color prop
	- update padding button
- ToggleButton deprecated

## 0.1.8

- Button
	- fullWidth prop
- Textfield
	- error prop is string
	- messagePersist prop
- Dialog
	- open/close custom events
	- beforeClose callback prop
	- closeByEsc prop
	- modal prop
	- fix click outside

## 0.1.7

- ToggleButton new component
- ButtonGroup new component

## 0.1.5

- Menu
	- use popover component
	- add class, style props

## 0.1.4

- Checkbox, Radio
	- forward events from input element
- focusableElm
	- fix focusedItemIndex

## 0.1.3

- Checkbox, Radio
	- fix events, thanks to @sourcegr

## 0.1.2

- Button
	- fix focus ring in Chrome
- Icon
	- fix svelte v3.13 Icon tag error

## 0.1.1

- Textfield
	- del `:required`, `:invalid` Red border in Firefox
	- fix `label` position if `placeholder` attribute set

## 0.1.0

- Initial
