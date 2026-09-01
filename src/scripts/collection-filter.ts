import { parseFacetData } from "@/scripts/facet-data";
import {
	getPaginationControls,
	syncPaginationControls,
} from "@/scripts/pagination-controls";

export function initCollectionFilter(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>("[data-collection-filter-root]")
		.forEach((root) => {
			const collections = Array.from(
				root.querySelectorAll<HTMLElement>("[data-card-collection]"),
			).filter((collection) => collection.querySelector("[data-facet-card]"));
			const cardsByCollection = new Map(
				collections.map((collection) => [
					collection,
					Array.from(
						collection.querySelectorAll<HTMLElement>("[data-facet-card]"),
					),
				]),
			);
			const search = root.querySelector<HTMLInputElement>("[data-archive-search]");
			const sort = root.querySelector<HTMLSelectElement>("[data-archive-sort]");
			const paginatedCollection = root.querySelector<HTMLElement>(
				"[data-pagination-collection]",
			);
			const paginationControls = getPaginationControls(root);
			const { pageButtons, previousButton, nextButton } = paginationControls;
			const pageSize = Number(paginatedCollection?.dataset.paginationPageSize) || 1;
			let activePage = 1;

			const selectedFacets = (): Record<string, string> =>
				Object.fromEntries(
					Array.from(
						root.querySelectorAll<HTMLSelectElement>("[data-facet-select]"),
					)
						.filter((control) => control.value && control.value !== "all")
						.flatMap((control) => {
							const key = control.dataset.facetKey;
							return key ? [[key, control.value] as const] : [];
						}),
				);

			const render = (): void => {
				const term = search?.value.trim().toLowerCase() ?? "";
				const selected = selectedFacets();
				let paginatedMatchCount = 0;

				cardsByCollection.forEach((cards, collection) => {
					const ordered = [...cards].sort((first, second) => {
						const direction = sort?.value === "oldest" ? -1 : 1;
						return (
							direction *
							(Number(first.dataset.sortIndex) - Number(second.dataset.sortIndex))
						);
					});
					const matching = ordered.filter((card) => {
						const facets = parseFacetData(card);
						const matchesSearch =
							!term || (card.dataset.searchValue ?? "").includes(term);
						const matchesFacets = Object.entries(selected).every(
							([key, value]) => facets[key]?.includes(value),
						);
						return matchesSearch && matchesFacets;
					});

					if (collection === paginatedCollection) {
						paginatedMatchCount = matching.length;
						const totalPages = Math.max(1, Math.ceil(matching.length / pageSize));
						activePage = Math.min(activePage, totalPages);
						const start = (activePage - 1) * pageSize;
						const visible = new Set(matching.slice(start, start + pageSize));
						ordered.forEach((card) => {
							card.hidden = !visible.has(card);
							collection.append(card);
						});
						return;
					}

					const visible = new Set(matching);
					ordered.forEach((card) => {
						card.hidden = !visible.has(card);
						collection.append(card);
					});
				});

				if (paginatedCollection) {
					const totalPages = Math.max(1, Math.ceil(paginatedMatchCount / pageSize));
					syncPaginationControls(
						paginationControls,
						activePage,
						totalPages,
						paginatedMatchCount,
					);
				}
			};

			root
				.querySelectorAll<HTMLSelectElement>("[data-facet-select], [data-archive-sort]")
				.forEach((control) =>
					control.addEventListener("change", () => {
						activePage = 1;
						render();
					}),
				);
			search?.addEventListener("input", () => {
				activePage = 1;
				render();
			});
			root
				.querySelectorAll<HTMLButtonElement>("[data-view-control]")
				.forEach((button) => {
					button.addEventListener("click", () => {
						collections.forEach((collection) => {
							collection.dataset.view = button.dataset.viewControl ?? "grid";
						});
						root
							.querySelectorAll<HTMLElement>("[data-view-control]")
							.forEach((control) =>
								control.setAttribute("aria-pressed", String(control === button)),
							);
					});
				});

			pageButtons.forEach((button) => {
				button.addEventListener("click", () => {
					activePage = Number(button.dataset.page) || 1;
					render();
				});
			});
			previousButton?.addEventListener("click", () => {
				activePage = Math.max(1, activePage - 1);
				render();
			});
			nextButton?.addEventListener("click", () => {
				activePage += 1;
				render();
			});

			const genre = new URLSearchParams(window.location.search).get("genre");
			if (genre) {
				const control = root.querySelector<HTMLSelectElement>(
					'[data-facet-key="genre"]',
				);
				if (control) control.value = genre;
			}
			render();
		});
}
