import './style/global.css';
import App from './App.svelte';
import routes from './router';
// Required focus highlight when using components,
// should be imported only once in your project
import './lib/focus-visible';

const app = new App({
	target: document.body,
	intro: true,
	props: {
		routes: routes,
	},
});

export default app;
