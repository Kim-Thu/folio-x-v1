const pendingRenders = new WeakMap<HTMLElement, number>();

export function renderWithFilterLoading(
	root: HTMLElement,
	render: () => void,
): void {
	const results =
		root.querySelector<HTMLElement>("[data-archive-results]") ?? root;
	const skeleton = results.querySelector<HTMLElement>("[data-filter-skeleton]");
	const collection = results.querySelector<HTMLElement>("[data-card-collection]");

	if (!skeleton || !collection) {
		render();
		return;
	}

	const pending = pendingRenders.get(root);
	if (pending !== undefined) window.clearTimeout(pending);

	results.setAttribute("aria-busy", "true");
	skeleton.hidden = false;
	collection.hidden = true;
	results
		.querySelectorAll<HTMLElement>(
			"[data-filter-empty], [data-facet-empty], [data-product-empty]",
		)
		.forEach((emptyState) => {
			emptyState.hidden = true;
		});

	const timeout = window.setTimeout(() => {
		render();
		skeleton.hidden = true;
		collection.hidden = false;
		results.setAttribute("aria-busy", "false");
		pendingRenders.delete(root);
	}, 160);

	pendingRenders.set(root, timeout);
}
