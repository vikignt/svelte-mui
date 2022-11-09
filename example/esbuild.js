const esbuild = require('esbuild')
const {derver} = require("derver") // dev server
const sveltePlugin = require('esbuild-svelte') // esbuild plugin svelte

const md = require("./scripts/esbuild-plugin-markdown").default;
const hljs = require('highlight.js');

function showUsage () {
  console.log('USAGE')
  console.log('node esbuild.js dev')
  console.log('node esbuild.js prod')
  process.exit(0)
}

if (process.argv.length < 3) {
  showUsage()
}

if (![ 'dev', 'prod' ].includes(process.argv[2])) {
  showUsage()
}

// production mode, or not
const production = (process.argv[2] === 'prod')

// esbuild watch in dev mode to rebuild out files
let watch = false
if (!production) {
  watch = {
    onRebuild(error) {
      if (error) console.error('esbuild: Watch build failed:', error.getMessage())
      else console.log('esbuild: Watch build succeeded')
    }
  }
}

// esbuild build options
// see: https://esbuild.github.io/api/#build-api
const options = {
  entryPoints: ['./src/main.js'],
  bundle: true,
  watch,
  format: 'iife',
  minifyWhitespace: true,
  minifyIdentifiers: true,
  sourcemap: false,
  outfile: './public/build/bundle.js', // and bundle.css
  plugins: [
    {
      name: 'dedupe-svelte',
      setup({ onResolve }) {
        const svelte = require.resolve('svelte')
        onResolve({ filter: /^svelte/ }, args => {
          let path = svelte.replace(/svelte\/[^\.]+.js$/,args.path+"/index.mjs")// .mjs for browser path
          return { path }
        })
      }
    },
    sveltePlugin({
      include: /\.svelte$|\.svg$/,
    }),
    md({
      highlight: function(code) {
        return hljs.highlightAuto(code, ['bash', 'html', 'css']).value;
      },
    }),
  ]
}

// start web dev server
if (!production) {
    derver({
        dir: 'public',
        port: 5000,
        watch:['public'],
        spa: true,
    })
}

// esbuild dev + prod
esbuild.build(options).catch((err) => {
  console.error(err)
  process.exit(1)
})
