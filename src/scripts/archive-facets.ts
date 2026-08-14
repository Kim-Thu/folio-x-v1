import { parseFacetData } from "@/scripts/facet-data";

class ArchiveFacetsController {
	private readonly results: HTMLElement | null;
	private readonly cards: HTMLElement[];
	private readonly collection: HTMLElement | null;
	private readonly search: HTMLInputElement | null;
	private readonly sort: HTMLSelectElement | null;
	private readonly count: HTMLElement | null;
	private readonly empty: HTMLElement | null;
	private readonly pagination: HTMLElement | null;
	private readonly pageButtons: HTMLButtonElement[];
	private readonly previous: HTMLButtonElement | null;
	private readonly next: HTMLButtonElement | null;
	private readonly pageSize: number;
	private currentPage = 1;

	constructor(private readonly root: HTMLElement) {
		this.results = root.querySelector<HTMLElement>("[data-archive-results]");
		this.cards = Array.from(
			this.results?.querySelectorAll<HTMLElement>("[data-facet-card]") ?? [],
		);
		this.collection = this.results?.querySelector<HTMLElement>("[data-card-collection]") ?? null;
		this.search = root.querySelector<HTMLInputElement>("[data-archive-search]");
		this.sort = root.querySelector<HTMLSelectElement>("[data-archive-sort]");
		this.count = this.results?.querySelector<HTMLElement>("[data-result-count]") ?? null;
		this.empty = this.results?.querySelector<HTMLElement>("[data-facet-empty]") ?? null;
		this.pagination = this.results?.querySelector<HTMLElement>("[data-pagination]") ?? null;
		this.pageButtons = Array.from(
			this.results?.querySelectorAll<HTMLButtonElement>("[data-page]") ?? [],
		);
		this.previous = this.results?.querySelector<HTMLButtonElement>("[data-page-previous]") ?? null;
		this.next = this.results?.querySelector<HTMLButtonElement>("[data-page-next]") ?? null;
		this.pageSize = Number(root.dataset.paginationPageSize) || this.cards.length || 1;
	}

	mount(): void {
		if (!this.cards.length || !this.collection) return;

		this.root
			.querySelectorAll<HTMLInputElement>("[data-facet-filter]")
			.forEach((control) => control.addEventListener("change", this.resetAndRender));
		this.root
			.querySelectorAll<HTMLSelectElement>("[data-facet-select], [data-archive-sort]")
			.forEach((control) => control.addEventListener("change", this.resetAndRender));
		this.search?.addEventListener("input", this.resetAndRender);

		this.root
			.querySelectorAll<HTMLButtonElement>("[data-view-control]")
			.forEach((button) => {
				button.addEventListener("click", () => this.setView(button));
			});

		this.pageButtons.forEach((button) => {
			button.addEventListener("click", () => {
				this.currentPage = Number(button.dataset.page) || 1;
				this.render();
			});
		});
		this.previous?.addEventListener("click", () => {
			this.currentPage = Math.max(1, this.currentPage - 1);
			this.render();
		});
		this.next?.addEventListener("click", () => {
			this.currentPage += 1;
			this.render();
		});

		this.render();
	}

	private readonly resetAndRender = (): void => {
		this.currentPage = 1;
		this.render();
	};

	private selectedByKey(): Record<string, string[]> {
		const selected: Record<string, string[]> = {};

		this.root
			.querySelectorAll<HTMLInputElement>("[data-facet-filter]:checked")
			.forEach((control) => {
				const key = control.dataset.facetKey;
				if (!key || control.value === "all") return;
				(selected[key] ??= []).push(control.value);
			});
		this.root
			.querySelectorAll<HTMLSelectElement>("[data-facet-select]")
			.forEach((control) => {
				const key = control.dataset.facetKey;
				if (!key || !control.value || control.value === "all") return;
				selected[key] = [control.value];
			});

		return selected;
	}

	private setView(button: HTMLButtonElement): void {
		if (!this.collection) return;
		this.collection.dataset.view = button.dataset.viewControl ?? "grid";
		this.root.querySelectorAll("[data-view-control]").forEach((item) => {
			item.setAttribute("aria-pressed", String(item === button));
		});
	}

	private render(): void {
		if (!this.collection) return;

		const term = this.search?.value.trim().toLowerCase() ?? "";
		const selected = this.selectedByKey();
		const visible = this.cards.filter((card) => {
			const facets = parseFacetData(card);
			const matchesTerm = !term || (card.dataset.searchValue ?? "").includes(term);
			const matchesFacets = Object.entries(selected).every(
				([key, values]) =>
					!values.length || values.some((value) => facets[key]?.includes(value)),
			);
			return matchesTerm && matchesFacets;
		});

		visible.sort((first, second) => {
			if (this.sort?.value === "oldest") {
				return Number(second.dataset.sortIndex) - Number(first.dataset.sortIndex);
			}
			return Number(first.dataset.sortIndex) - Number(second.dataset.sortIndex);
		});
		visible.forEach((card) => this.collection?.append(card));

		const totalPages = Math.max(1, Math.ceil(visible.length / this.pageSize));
		this.currentPage = Math.min(this.currentPage, totalPages);
		const start = (this.currentPage - 1) * this.pageSize;
		const currentCards = new Set(visible.slice(start, start + this.pageSize));
		this.cards.forEach((card) => {
			card.hidden = !currentCards.has(card);
		});

		if (this.count) this.count.textContent = String(visible.length);
		if (this.empty) this.empty.hidden = visible.length > 0;
		if (this.pagination) this.pagination.hidden = visible.length === 0;
		this.pageButtons.forEach((button) => {
			const page = Number(button.dataset.page);
			button.parentElement?.toggleAttribute("hidden", page > totalPages);
			if (page === this.currentPage) button.setAttribute("aria-current", "page");
			else button.removeAttribute("aria-current");
		});
		if (this.previous) this.previous.disabled = this.currentPage === 1;
		if (this.next) this.next.disabled = this.currentPage === totalPages;
	}
}

export function initArchiveFacets(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach((root) => new ArchiveFacetsController(root).mount());
}
