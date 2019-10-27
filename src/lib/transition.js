import { sineInOut } from 'svelte/easing';

export function popover(
	node,
	{ delay = 0, duration = 200, easing = sineInOut, start = 0, opacity = 0, origin = 'top left' }
) {
	const style = getComputedStyle(node);
	const targetOpacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;

	const sd = 1 - start;
	const od = targetOpacity * (1 - opacity);

	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			return `transition-property: transform, opacity;transform: ${transform} scale(${1 -
				sd * u});transform-origin: ${origin};opacity: ${targetOpacity - od * u}`;
		},
	};
}
