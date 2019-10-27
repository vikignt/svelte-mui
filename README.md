# svelte-ui

**`svelte-ui`** is a set of light in weight _(~19K full set minified gzip)_ UI components for [Svelte](https://svelte.dev) application, inspired by Google's [Material Design](https://material.io/design/)

[Docs and Demo](https://svelte-ui.ibbf.ru)

## Quick start

_Note that you will need to have [Node.js](https://nodejs.org) installed_

1. Create a new project based on [sveltejs/template](https://github.com/sveltejs/template)

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
npm install
```

2. Add components

```bash
npm install --save-dev @vikignt/svelte-ui
```

* _Optionally_ add [focus-visible](https://github.com/WICG/focus-visible) polyfill to enable focus to be visible when using <kbd>TAB</kbd> key. This option can be applied to `Button`, `Checkbox`, `Radio` button, `Menuitem`

```bash
npm install --save-dev focus-visible
```

3. Modify file `src/App.svelte` in the following way

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
    // optional import focus-visible polyfill
    import 'focus-visible';
    // import any components
    import { Button, Checkbox } from '@vikignt/svelte-ui';

    let checked = true;
</script>

<style>
    h1 {
        color: purple;
    }
</style>
```

...then start [Rollup](https://rollupjs.org/)

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000)

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

## License

Code released under [MIT](https://github.com/vikignt/svelte-ui/blob/master/LICENSE) license
