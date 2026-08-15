import { cardCollectionViewClasses } from "@/variants/components/object/project/card/PCard.variants";
import { parseFacetData } from "@/scripts/facet-data";

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
			const viewButtons = Array.from(
				root.querySelectorAll<HTMLButtonElement>("[data-view-control]"),
			);

			const selectedFacets = (): Record<string, string[]> => {
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
						(selected[key] ??= []).push(control.value);
					});

				return selected;
			};

			const applyView = (view: "grid" | "list"): void => {
				const isList = view === "list";
				collections.forEach((collection) => {
					collection.dataset.view = view;
					collection.classList.toggle(
						cardCollectionViewClasses.list.collection,
						isList,
					);
					cardsByCollection.get(collection)?.forEach((card) => {
						card.classList.toggle(cardCollectionViewClasses.list.item, isList);
					});
				});
				viewButtons.forEach((button) => {
					button.setAttribute(
						"aria-pressed",
						String(button.dataset.viewControl === view),
					);
				});
			};

			const render = (): void => {
				const term = search?.value.trim().toLowerCase() ?? "";
				const selected = selectedFacets();
				cardsByCollection.forEach((cards, collection) => {
					const ordered = [...cards].sort((first, second) => {
						const direction = sort?.value === "oldest" ? -1 : 1;
						return (
							direction *
							(Number(first.dataset.sortIndex) - Number(second.dataset.sortIndex))
						);
					});
					ordered.forEach((card) => {
						const facets = parseFacetData(card);
						const matchesSearch =
							!term || (card.dataset.searchValue ?? "").includes(term);
						const matchesFacets = Object.entries(selected).every(
							([key, values]) =>
								!values.length || values.some((value) => facets[key]?.includes(value)),
						);
						card.hidden = !(matchesSearch && matchesFacets);
						collection.append(card);
					});
				});
			};

			const syncFacetControls = (key: string, value: string): void => {
				root
					.querySelectorAll<HTMLSelectElement>(`[data-facet-select][data-facet-key="${key}"]`)
					.forEach((control) => {
						control.value = value;
					});
				root
					.querySelectorAll<HTMLInputElement>(`[data-facet-filter][data-facet-key="${key}"]`)
					.forEach((control) => {
						if (control.type === "radio") control.checked = control.value === value;
					});
			};

			root
				.querySelectorAll<HTMLSelectElement>("[data-facet-select]")
				.forEach((control) => {
					control.addEventListener("change", () => {
						const key = control.dataset.facetKey;
						if (key) syncFacetControls(key, control.value);
						render();
					});
				});
			root
				.querySelectorAll<HTMLInputElement>("[data-facet-filter]")
				.forEach((control) => {
					control.addEventListener("change", () => {
						const key = control.dataset.facetKey;
						if (key && control.checked && control.type === "radio") {
							syncFacetControls(key, control.value);
						}
						render();
					});
				});
			sort?.addEventListener("change", render);
			search?.addEventListener("input", render);
			viewButtons.forEach((button) => {
				button.addEventListener("click", () => {
					applyView(button.dataset.viewControl === "list" ? "list" : "grid");
				});
			});

			const genre = new URLSearchParams(window.location.search).get("genre");
			if (genre) syncFacetControls("genre", genre);

			applyView(
				collections.some((collection) => collection.dataset.view === "list")
					? "list"
					: "grid",
			);
			render();
		});
}
