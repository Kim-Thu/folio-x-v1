import { renderWithFilterLoading } from "@/scripts/filter-loading";
import {
	getPaginationControls,
	syncPaginationControls,
} from "@/scripts/pagination-controls";

export function initArchiveFilter(): void {
	document.querySelectorAll<HTMLElement>("[data-filter-root]").forEach((root) => {
		const filterButtons = Array.from(
			root.querySelectorAll<HTMLButtonElement>("[data-filter-value]"),
		);
		const cards = Array.from(
			root.querySelectorAll<HTMLElement>("[data-filter-category]"),
		);
		const emptyState = root.querySelector<HTMLElement>("[data-filter-empty]");
		const sortControl =
			root.querySelector<HTMLSelectElement>("[data-sort-control]");
		const collection =
			root.querySelector<HTMLElement>("[data-card-collection]");
		const viewButtons = Array.from(
			root.querySelectorAll<HTMLButtonElement>("[data-view-control]"),
		);
		const paginationControls = getPaginationControls(root);
		const { pageButtons, previousButton, nextButton } = paginationControls;
		const pageSize = Number(root.dataset.paginationPageSize) || cards.length || 1;

		if (!filterButtons.length || !cards.length || !collection) return;
		const entries = cards.map((card) => {
			const parent = card.parentElement;
			return {
				card,
				item: parent?.parentElement === collection ? parent : card,
			};
		});

		let activeFilter = "all";
		let activePage = 1;

		const getOrderedCards = () => {
			const direction = sortControl?.value === "oldest" ? 1 : -1;

			return [...entries].sort(({ card: first }, { card: second }) => {
				if (!sortControl || sortControl.value === "featured") {
					return Number(first.dataset.sortIndex) - Number(second.dataset.sortIndex);
				}

				return (
					(Number.parseInt(first.dataset.sortValue ?? "0", 10) -
						Number.parseInt(second.dataset.sortValue ?? "0", 10)) *
					direction
				);
			});
		};

		const render = (): void => {
			const orderedCards = getOrderedCards();
			orderedCards.forEach(({ item }) => collection.append(item));

			const matchingCards = orderedCards.filter(
				({ card }) =>
					activeFilter === "all" ||
					card.dataset.filterCategory === activeFilter,
			);
			const totalPages = Math.max(1, Math.ceil(matchingCards.length / pageSize));
			activePage = Math.min(activePage, totalPages);
			const pageStart = (activePage - 1) * pageSize;
			const visibleCards = new Set(
				matchingCards.slice(pageStart, pageStart + pageSize),
			);

			entries.forEach((entry) => {
				entry.item.hidden = !visibleCards.has(entry);
				if (entry.item !== entry.card) entry.card.hidden = false;
			});

			if (emptyState) emptyState.hidden = matchingCards.length > 0;
			syncPaginationControls(
				paginationControls,
				activePage,
				totalPages,
				matchingCards.length,
			);
		};

		const renderLoading = (): void => {
			renderWithFilterLoading(root, render);
		};

		filterButtons.forEach((button) => {
			button.addEventListener("click", () => {
				activeFilter = button.dataset.filterValue ?? "all";
				activePage = 1;
				filterButtons.forEach((item) =>
					item.setAttribute("aria-pressed", String(item === button)),
				);
				renderLoading();
			});
		});

		sortControl?.addEventListener("change", () => {
			activePage = 1;
			renderLoading();
		});

		viewButtons.forEach((button) => {
			button.addEventListener("click", () => {
				collection.dataset.view = button.dataset.viewControl ?? "grid";
				viewButtons.forEach((item) =>
					item.setAttribute("aria-pressed", String(item === button)),
				);
			});
		});

		pageButtons.forEach((button) => {
			button.addEventListener("click", () => {
				activePage = Number(button.dataset.page) || 1;
				renderLoading();
			});
		});

		previousButton?.addEventListener("click", () => {
			activePage = Math.max(1, activePage - 1);
			renderLoading();
		});

		nextButton?.addEventListener("click", () => {
			activePage += 1;
			renderLoading();
		});

		render();
	});
}
