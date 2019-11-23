Button component contains two major types of buttons, namely, **regular** (default) and **icon button** (when setting `icon` property). **Icon button** can be configured as **FAB** (Floating Action Button) by setting `fab` property. The button can become a toggle by setting the `toggle` property

All properties of Button's are **optional**

#### Regular buttons

Regular buttons can be

- baseline (default)
- `raised` (high priority)
- `unelevated`
- `outlined` (low priority)

All of them can be configured as `dense` and/or `shaped`. For baseline button, `shaped` property affects only on :hove and :focus

#### Icon button

To turn a regular button into an **icon button**, one has to set property `icon`

Notice that icon button can be

- `fab`

As well as regular buttons, icon buttons can be

- baseline (default)
- `raised`
- `unelevated` (for `fab` is `raised` equivalent)
- `outlined` (for `fab` is not effected)

All of them can be configured as `dense`.

#### HTMLElement attributes

You can use any HTMLElement attributes, like

`id`, `class`, `style`, `disabled`, `data-*` and so on

#### Events

`change` toggle button dispatch custom event

Any HTMLElement events
