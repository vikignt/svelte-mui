### Quick start with new project

*Note that you will need to have [Node.js](https://nodejs.org) installed*

Create a new project based on [sveltejs/template](https://github.com/sveltejs/template)

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
```

Add components

```bash
npm install --save-dev svelte-mui
```

* *Optionally* add [focus-visible](https://github.com/WICG/focus-visible) polyfill to enable focus to be visible when using <kbd>TAB</kbd> key. This option can be applied to `Button`, `Checkbox`, `Radio` button, `Menuitem`

```bash
npm install --save-dev focus-visible
```

Modify file `src/App.svelte` in the following way

```html
<h1>Hello {name}!</h1>

<Checkbox bind:checked>Checkbox</Checkbox>

<p>Checkbox is <strong>{checked ? 'checked' : 'unchecked'}</strong></p>

<Button
    outlined
    shaped
    color="Red"
    on:click={() => { checked = !checked }}
>
    Inverse
</Button>

<script>
    export let name;
    // optional import focus-visible polyfill only once
    import 'focus-visible';
    // import any components
    import { Button, Checkbox } from 'svelte-mui';

    let checked = true;
</script>

<style>
    h1 {
        color: purple;
    }
</style>
```

```html
<script>
    import { Button, Checkbox } from 'svelte-mui/src';
</script>
```

...then start [Rollup](https://rollupjs.org/)

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080)

_NOTE: In real applications, you have to add global styles to `disabled` states_

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
