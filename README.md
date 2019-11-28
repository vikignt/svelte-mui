# svelte-ui

Set of the UI components for [Svelte](https://svelte.dev) (~30 KB minzipped)

[View the demo](https://svelte-ui.ibbf.ru)

## Installation

_Note that you will need to have [Node.js](https://nodejs.org) installed_

```bash
npm install --save-dev @vikignt/svelte-ui
```

## Usage

```html
<Textfield bind:value filled label="Name" message="Enter your name" />

<h1>Hello {value}!</h1>

<script>
    // import any components you want
    import { Textfield } from '@vikignt/svelte-ui';

    let value = 'world';
</script>
```

This code on the [Svelte REPL](https://svelte.dev/repl/5cae739a3a2f4208a48fd2822061b164?version=3.12.1)

## Quick start with new project

Create a new project based on [sveltejs/template](https://github.com/sveltejs/template)

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
```

Add components

```bash
npm install --save-dev @vikignt/svelte-ui
```

* _Optionally_ add [focus-visible](https://github.com/WICG/focus-visible) polyfill to enable focus to be visible when using <kbd>TAB</kbd> key. This option can be applied to `Button`, `Checkbox`, `Radio` button, `Menuitem`

```bash
npm install --save-dev focus-visible
```

Modify file `src/App.svelte` in the following way

```html
<script>
    // optional import focus-visible polyfill only once
    import 'focus-visible';
    // import any components
    import { Button, Checkbox } from '@vikignt/svelte-ui';

    let checked = true;
</script>

<Checkbox bind:checked>Checkbox</Checkbox>

<p>Checkbox is {checked ? 'checked' : 'unchecked'}</p>

<Button
    outlined
    shaped
    color="Red"
    on:click={() => { checked = !checked }}
>
    Inverse
</Button>
```

...then start [Rollup](https://rollupjs.org/)

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000)

For real applications, you have to add global styles to `disabled` state

```css
    .disabled,
    [disabled] {
        opacity: 0.5;
        pointer-events: none;
    }

    .disabled .disabled,
    .disabled [disabled],
    [disabled] .disabled,
    [disabled] [disabled] {
        opacity: 1;
    }
```

## Get started with an example

Clone repo [vikignt/svelte-ui](https://github.com/vikignt/svelte-ui.git)

```bash
git clone https://github.com/vikignt/svelte-ui.git
```

Then explore the __example__

```bash
cd svelte-ui/example
npm install
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000)
