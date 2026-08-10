const parseFacets = (card: HTMLElement): Record<string, string[]> => {
	try {
		return JSON.parse(card.dataset.facets ?? "{}") as Record<string, string[]>;
	} catch {
		return {};
	}
};

export {};

document
	.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
	.forEach((root) => {
		const results = root.querySelector<HTMLElement>("[data-archive-results]");
		const cards = Array.from(
			results?.querySelectorAll<HTMLElement>("[data-facet-card]") ?? [],
		);
		const collection =
			results?.querySelector<HTMLElement>("[data-card-collection]");
		const search =
			root.querySelector<HTMLInputElement>("[data-archive-search]");
		const sort =
			root.querySelector<HTMLSelectElement>("[data-archive-sort]");
		const count = results?.querySelector<HTMLElement>("[data-result-count]");
		const empty = results?.querySelector<HTMLElement>("[data-facet-empty]");
		const pagination = results?.querySelector<HTMLElement>("[data-pagination]");
		const pageButtons = Array.from(
			results?.querySelectorAll<HTMLButtonElement>("[data-page]") ?? [],
		);
		const previous =
			results?.querySelector<HTMLButtonElement>("[data-page-previous]");
		const next = results?.querySelector<HTMLButtonElement>("[data-page-next]");
		const pageSize =
			Number(root.dataset.paginationPageSize) || cards.length || 1;
		let currentPage = 1;

		if (!cards.length || !collection) return;

		const selectedByKey = (): Record<string, string[]> => {
			const selected: Record<string, string[]> = {};
			root
				.querySelectorAll<HTMLInputElement>("[data-facet-filter]:checked")
				.forEach((control) => {
					const key = control.dataset.facetKey;
					if (!key || control.value === "all") return;
					(selected[key] ??= []).push(control.value);
				});
			root
				.querySelectorAll<HTMLSelectElement>("[data-facet-select]")
				.forEach((control) => {
					const key = control.dataset.facetKey;
					if (!key || !control.value || control.value === "all") return;
					selected[key] = [control.value];
				});
			return selected;
		};

		const render = (): void => {
			const term = search?.value.trim().toLowerCase() ?? "";
			const selected = selectedByKey();
			const visible = cards.filter((card) => {
				const facets = parseFacets(card);
				const matchesTerm =
					!term || (card.dataset.searchValue ?? "").includes(term);
				const matchesFacets = Object.entries(selected).every(
					([key, values]) =>
						!values.length ||
						values.some((value) => facets[key]?.includes(value)),
				);
				return matchesTerm && matchesFacets;
			});

			visible.sort((first, second) => {
				if (sort?.value === "oldest") {
					return Number(second.dataset.sortIndex) - Number(first.dataset.sortIndex);
				}
				return Number(first.dataset.sortIndex) - Number(second.dataset.sortIndex);
			});
			visible.forEach((card) => collection.append(card));

			const totalPages = Math.max(1, Math.ceil(visible.length / pageSize));
			currentPage = Math.min(currentPage, totalPages);
			const start = (currentPage - 1) * pageSize;
			const currentCards = new Set(visible.slice(start, start + pageSize));
			cards.forEach((card) => {
				card.hidden = !currentCards.has(card);
			});

			if (count) count.textContent = String(visible.length);
			if (empty) empty.hidden = visible.length > 0;
			if (pagination) pagination.hidden = visible.length === 0;
			pageButtons.forEach((button) => {
				const page = Number(button.dataset.page);
				button.parentElement?.toggleAttribute("hidden", page > totalPages);
				if (page === currentPage) button.setAttribute("aria-current", "page");
				else button.removeAttribute("aria-current");
			});
			if (previous) previous.disabled = currentPage === 1;
			if (next) next.disabled = currentPage === totalPages;
		};

		root
			.querySelectorAll<HTMLInputElement>("[data-facet-filter]")
			.forEach((control) =>
				control.addEventListener("change", () => {
					currentPage = 1;
					render();
				}),
			);
		root
			.querySelectorAll<HTMLSelectElement>("[data-facet-select], [data-archive-sort]")
			.forEach((control) =>
				control.addEventListener("change", () => {
					currentPage = 1;
					render();
				}),
			);
		search?.addEventListener("input", () => {
			currentPage = 1;
			render();
		});
		root
			.querySelectorAll<HTMLButtonElement>("[data-view-control]")
			.forEach((button) =>
				button.addEventListener("click", () => {
					collection.dataset.view = button.dataset.viewControl ?? "grid";
					root
						.querySelectorAll("[data-view-control]")
						.forEach((item) =>
							item.setAttribute("aria-pressed", String(item === button)),
						);
				}),
			);
		pageButtons.forEach((button) =>
			button.addEventListener("click", () => {
				currentPage = Number(button.dataset.page) || 1;
				render();
			}),
		);
		previous?.addEventListener("click", () => {
			currentPage = Math.max(1, currentPage - 1);
			render();
		});
		next?.addEventListener("click", () => {
			currentPage += 1;
			render();
		});
		render();
	});
