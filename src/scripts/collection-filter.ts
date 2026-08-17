import { parseFacetData } from "@/scripts/facet-data";

export function initCollectionFilter(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>("[data-collection-filter-root]")
		.forEach((root) => {
			const collections = Array.from(
				root.querySelectorAll<HTMLElement>("[data-card-collection]"),
			).filter((collection) => collection.querySelector("[data-facet-card]"));
			const cardsByCollection = new Map(
				collections.map((collection) => {
					const sliderContainer = collection.matches("[data-slider]")
						? collection.querySelector<HTMLElement>("[data-slider-container]")
						: null;
					const cards = Array.from(
						collection.querySelectorAll<HTMLElement>("[data-facet-card]"),
					);
					const entries = cards.map((card) => ({
						card,
						item: sliderContainer
							? (card.closest<HTMLElement>("[data-slide]") ?? card)
							: card,
					}));

					return [
						collection,
						{ entries, target: sliderContainer ?? collection },
					] as const;
				}),
			);
			const search = root.querySelector<HTMLInputElement>("[data-archive-search]");
			const sort = root.querySelector<HTMLSelectElement>("[data-archive-sort]");

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
				cardsByCollection.forEach(({ entries, target }, collection) => {
					const ordered = [...entries].sort(({ card: first }, { card: second }) => {
						const direction = sort?.value === "oldest" ? -1 : 1;
						return (
							direction *
							(Number(first.dataset.sortIndex) - Number(second.dataset.sortIndex))
						);
					});
					ordered.forEach(({ card, item }) => {
						const facets = parseFacetData(card);
						const matchesSearch =
							!term || (card.dataset.searchValue ?? "").includes(term);
						const matchesFacets = Object.entries(selected).every(
							([key, value]) => facets[key]?.includes(value),
						);
						item.hidden = !(matchesSearch && matchesFacets);
						if (item !== card) card.hidden = false;
						target.append(item);
					});

					if (target !== collection) {
						collection.dispatchEvent(new CustomEvent("slider:reinit"));
					}
				});
			};

			root
				.querySelectorAll<HTMLSelectElement>("[data-facet-select], [data-archive-sort]")
				.forEach((control) => control.addEventListener("change", render));
			search?.addEventListener("input", render);
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
