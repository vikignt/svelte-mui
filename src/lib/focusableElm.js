export function getFocusable(context = document) {
	const focusable = Array.prototype.slice
		.call(
			context.querySelectorAll(
				'button, [href], select, textarea, input:not([type="hidden"]), [tabindex]:not([tabindex="-1"])'
			)
		)
		.filter(function(item) {
			const style = window.getComputedStyle(item);

			return (
				!item.disabled &&
				!item.getAttribute('disabled') &&
				!item.classList.contains('disabled') &&
				style.display !== 'none' &&
				style.visibility !== 'hidden' &&
				style.opacity > 0
			);
		});

	return focusable;
}

export function trapTabKey(e, context) {
	if (e.key !== 'Tab' && e.keyCode !== 9) {
		return;
	}

	let focusableItems = getFocusable(context);

	if (focusableItems.length === 0) {
		e.preventDefault();
		return;
	}

	let focusedItem = document.activeElement;

	let focusedItemIndex = focusableItems.indexOf(focusedItem);

	if (e.shiftKey) {
		if (focusedItemIndex <= 0) {
			focusableItems[focusableItems.length - 1].focus();
			e.preventDefault();
		}
	} else {
		if (focusedItemIndex >= focusableItems.length - 1) {
			focusableItems[0].focus();
			e.preventDefault();
		}
	}
}
