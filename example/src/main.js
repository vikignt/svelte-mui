import '../assets/global.css';
import 'focus-visible';
import page from 'page';

import App from '/App.svelte';

import sitenav from '/sitenav';

const app = new App({
	target: document.body,
	intro: false,
});

page('*', (ctx, next) => {
	const qs = ctx.querystring ? ctx.querystring.replace('?', '').split('&') : [];
	ctx.query = qs.reduce((query, param) => {
		const [key, val] = param.split('=');
		query[key] = decodeURIComponent(val);
		return query;
	}, {});

	next();
});

sitenav.forEach(({ path, component, name }) => {
	page(path, (ctx) => {
		app.$set({ ctx, page: component, titlePage: name });
		window && window.scrollTo(0, 0);
	});
});

page.start();

export default app;
