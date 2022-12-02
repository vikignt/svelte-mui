# svelte-mui changelog

## 0.5.6

- Datefield, ExpansionPanel: fix css

## 0.5.5

- Button: add forward events like mouseover, mouseout ...

## 0.5.4

- Popover: refactor
- Modal: fix error adding 'mui-modal' css class if custom class attr is used

## 0.5.3

- Popover: fix get positions

## 0.5.2

- Menu: prevent menu activator while open/close transitions

## 0.5.1
- Datepicker: #43 fix week start day, thanks to @ellemenno

## 0.5.0
- Datepicker: check elm after time out; Day, Month use local transition
- Snackbar: add open, close custom events; remove css .message class
- DatePicker: add validation after 'value' changed, good for period select
- Menu, Popover add open, close custom events
- Menu add 'duration' (mS) prop for Popover animation, 300 by default
- Modal
- Popover

## 0.4.0-2

- #46 update for latest Svelte version v3.46.1 compatible

## 0.3.3-6

- Datefield
	fixes behavoir of event bubbling (#41)
	add textfieldStyle prop (#40)

## 0.3.3-5

- example
	typo
- Datefield
	changes the props order (#39)

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
