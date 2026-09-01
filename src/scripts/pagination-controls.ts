export interface PaginationControls {
	pagination: HTMLElement | null;
	pageButtons: HTMLButtonElement[];
	previousButton: HTMLButtonElement | null;
	nextButton: HTMLButtonElement | null;
}

export function getPaginationControls(scope: ParentNode): PaginationControls {
	const pagination = scope.querySelector<HTMLElement>("[data-pagination]");

	return {
		pagination,
		pageButtons: Array.from(
			pagination?.querySelectorAll<HTMLButtonElement>("[data-page]") ?? [],
		),
		previousButton:
			pagination?.querySelector<HTMLButtonElement>("[data-page-previous]") ?? null,
		nextButton:
			pagination?.querySelector<HTMLButtonElement>("[data-page-next]") ?? null,
	};
}

export function syncPaginationControls(
	controls: PaginationControls,
	currentPage: number,
	totalPages: number,
	resultCount: number,
): void {
	const { pagination, pageButtons, previousButton, nextButton } = controls;

	if (pagination) pagination.hidden = resultCount === 0;
	pageButtons.forEach((button) => {
		const page = Number(button.dataset.page);
		button.parentElement?.toggleAttribute("hidden", page > totalPages);
		if (page === currentPage) button.setAttribute("aria-current", "page");
		else button.removeAttribute("aria-current");
	});
	if (previousButton) previousButton.disabled = currentPage === 1;
	if (nextButton) nextButton.disabled = currentPage === totalPages;
}
