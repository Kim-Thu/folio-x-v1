import { cardCollectionViewClasses } from "@/variants/components/object/project/card/PCard.variants";
import { parseFacetData } from "@/scripts/facet-data";

function initArchiveFacetsRoot(root: HTMLElement): void {
	const results = root.querySelector<HTMLElement>("[data-archive-results]");
	const cards = Array.from(
		results?.querySelectorAll<HTMLElement>("[data-facet-card]") ?? [],
	);
	const collection =
		results?.querySelector<HTMLElement>("[data-card-collection]") ?? null;
	const search = root.querySelector<HTMLInputElement>("[data-archive-search]");
	const sort = root.querySelector<HTMLSelectElement>("[data-archive-sort]");
	const count = results?.querySelector<HTMLElement>("[data-result-count]") ?? null;
	const empty = results?.querySelector<HTMLElement>("[data-facet-empty]") ?? null;
	const pagination =
		results?.querySelector<HTMLElement>("[data-pagination]") ?? null;
	const pageButtons = Array.from(
		results?.querySelectorAll<HTMLButtonElement>("[data-page]") ?? [],
	);
	const previous =
		results?.querySelector<HTMLButtonElement>("[data-page-previous]") ?? null;
	const next =
		results?.querySelector<HTMLButtonElement>("[data-page-next]") ?? null;
	const pageSize = Number(root.dataset.paginationPageSize) || cards.length || 1;
	let currentPage = 1;

	if (!cards.length || !collection) return;

	const applyView = (view: "grid" | "list"): void => {
		collection.dataset.view = view;
		const isList = view === "list";
		collection.classList.toggle(
			cardCollectionViewClasses.list.collection,
			isList,
		);
		cards.forEach((card) => {
			card.classList.toggle(cardCollectionViewClasses.list.item, isList);
		});
		root.querySelectorAll<HTMLButtonElement>("[data-view-control]").forEach((item) => {
			item.setAttribute(
				"aria-pressed",
				String(item.dataset.viewControl === view),
			);
		});
	};

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
			const facets = parseFacetData(card);
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

	const resetAndRender = (): void => {
		currentPage = 1;
		render();
	};

	root
		.querySelectorAll<HTMLInputElement>("[data-facet-filter]")
		.forEach((control) => control.addEventListener("change", resetAndRender));
	root
		.querySelectorAll<HTMLSelectElement>(
			"[data-facet-select], [data-archive-sort]",
		)
		.forEach((control) => control.addEventListener("change", resetAndRender));
	search?.addEventListener("input", resetAndRender);

	root
		.querySelectorAll<HTMLButtonElement>("[data-view-control]")
		.forEach((button) => {
			button.addEventListener("click", () => {
				applyView(button.dataset.viewControl === "list" ? "list" : "grid");
			});
		});

	pageButtons.forEach((button) => {
		button.addEventListener("click", () => {
			currentPage = Number(button.dataset.page) || 1;
			render();
		});
	});
	previous?.addEventListener("click", () => {
		currentPage = Math.max(1, currentPage - 1);
		render();
	});
	next?.addEventListener("click", () => {
		currentPage += 1;
		render();
	});

	applyView(collection.dataset.view === "list" ? "list" : "grid");
	render();
}

export function initArchiveFacets(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach(initArchiveFacetsRoot);
}
