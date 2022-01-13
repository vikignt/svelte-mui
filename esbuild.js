const {build} = require(`esbuild`);
const sveltePlugin = require(`esbuild-svelte`);

const pkg = require(`./package.json`);

const svelte = sveltePlugin({
  compilerOptions:{
    css: true
  }
});

build({
  entryPoints: [pkg.svelte],
  outfile: pkg.cdn,
  format: 'iife',
  bundle: true,
  minify: true,
  sourcemap: false,
  plugins: [svelte],
  globalName: 'svelteMui',
})

build({
  entryPoints: [pkg.svelte],
  outfile: pkg.module,
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: false,
  plugins: [svelte],
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ]
})
