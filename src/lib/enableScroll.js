export default function enableScroll(enable) {
	let isHidden = document.body.style.overflow === 'hidden';

	if (enable && isHidden) {
		let top = Math.abs(parseInt(document.body.style.top));

		document.body.style.cssText = null;
		document.body.removeAttribute('style');
		window.scrollTo(0, top);
	} else if (!enable && !isHidden) {
		document.body.style.top =
			'-' +
			Math.max(
				document.body.scrollTop,
				(document.documentElement && document.documentElement.scrollTop) || 0
			) +
			'px';
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
		document.body.style.overflow = 'hidden';
	}
}
