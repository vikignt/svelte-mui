/* eslint-env node */
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import root from 'rollup-plugin-root-import';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import properties from 'postcss-custom-properties';
import md from './build/rollup-plugin-markdown';
import hljs from 'highlight.js';

const production = !process.env.ROLLUP_WATCH;
const legacy = process.env.BUILD_LEGACY;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js',
	},
	plugins: [
		root({
			root: `${__dirname}/src`,
			useEntry: 'prepend',

			// If we don't find the file verbatim, try adding these extensions
			extensions: ['.mjs', '/index.mjs', '.js', '/index.js'],
		}),
		copy({
			targets: [
				{ src: 'assets/index.html', dest: 'public' },
				{ src: 'assets/favicon.png', dest: 'public' },
			],
		}),
		svelte({
			extensions: ['.svelte', '.svg'],

			// enable run-time checks when not in production
			dev: !production,
			emitCss: true,
		}),
		postcss({
			extract: true,
			minimize: production,
			sourceMap: false,
			plugins: [
				autoprefixer(),
				properties({
					importFrom: 'assets/global.css',
				}),
			],
		}),
		md({
			marked: {
				highlight: function(code) {
					return hljs.highlightAuto(code, ['bash', 'html', 'css']).value;
				},
			},
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/') || importee === '@babel' || importee.startsWith('@babel/')
		}),
		commonjs(),
		legacy &&
			babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					[
						'@babel/preset-env',
						{
							targets: '> 0.25%, not dead',
						},
					],
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					[
						'@babel/plugin-transform-runtime',
						{
							useESModules: true,
						},
					],
				],
			}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
