import { parseFacetData } from "@/scripts/facet-data";
import { renderWithFilterLoading } from "@/scripts/filter-loading";
import {
	getPaginationControls,
	syncPaginationControls,
} from "@/scripts/pagination-controls";

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
	const paginationControls = getPaginationControls(results ?? root);
	const { pageButtons, previousButton: previous, nextButton: next } = paginationControls;
	const reset = root.querySelector<HTMLButtonElement>("[data-filter-reset]");
	const navigationChoices = Array.from(
		root.querySelectorAll<HTMLElement>("[data-choice-link], [data-choice-filter]"),
	);
	const pageSize = Number(root.dataset.paginationPageSize) || cards.length || 1;
	let currentPage = 1;

	if (!cards.length || !collection) return;

	const isChoiceActive = (choice: HTMLElement): boolean =>
		choice.matches("[data-choice-link]")
			? choice.getAttribute("aria-current") === "true"
			: choice.getAttribute("aria-pressed") === "true";

	const setChoiceActive = (choice: HTMLElement, active: boolean): void => {
		if (choice.matches("[data-choice-link]")) {
			if (active) choice.setAttribute("aria-current", "true");
			else choice.removeAttribute("aria-current");
			return;
		}

		choice.setAttribute("aria-pressed", String(active));
	};

	const choicesForControl = (control: string): HTMLElement[] =>
		navigationChoices.filter(
			(choice) => choice.dataset.choiceControl === control,
		);

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

		navigationChoices.forEach((choice) => {
			if (!isChoiceActive(choice)) return;
			const key = choice.dataset.choiceControl;
			const value = choice.dataset.choiceValue;
			if (!key || !value || value === "all") return;
			(selected[key] ??= []).push(value);
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
		syncPaginationControls(
			paginationControls,
			currentPage,
			totalPages,
			visible.length,
		);
	};

	const renderLoading = (): void => {
		renderWithFilterLoading(root, render);
	};

	const resetAndRender = (): void => {
		currentPage = 1;
		renderLoading();
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

	navigationChoices.forEach((choice) => {
		choice.addEventListener("click", (event) => {
			event.preventDefault();

			const control = choice.dataset.choiceControl;
			const value = choice.dataset.choiceValue;
			const navigation = choice.closest<HTMLElement>("[data-choice-navigation]");
			const type = navigation?.dataset.choiceType ?? "checkbox";
			if (!control || !value) return;

			const related = choicesForControl(control);
			if (type === "radio" || value === "all") {
				related.forEach((item) => setChoiceActive(item, item === choice));
			} else {
				const allChoice = related.find(
					(item) => item.dataset.choiceValue === "all",
				);
				if (allChoice) setChoiceActive(allChoice, false);
				setChoiceActive(choice, !isChoiceActive(choice));
			}

			resetAndRender();
		});
	});

	reset?.addEventListener("click", () => {
		root
			.querySelectorAll<HTMLInputElement>("[data-facet-filter]")
			.forEach((control) => {
				control.checked = control.value === "all";
			});

		root
			.querySelectorAll<HTMLSelectElement>("[data-facet-select]")
			.forEach((control) => {
				if (Array.from(control.options).some((option) => option.value === "all")) {
					control.value = "all";
				}
			});

		navigationChoices.forEach((choice) => {
			setChoiceActive(choice, choice.dataset.choiceValue === "all");
		});

		if (search) search.value = "";
		resetAndRender();
	});

	root
		.querySelectorAll<HTMLButtonElement>("[data-view-control]")
		.forEach((button) => {
			button.addEventListener("click", () => {
				collection.dataset.view = button.dataset.viewControl ?? "grid";
				root.querySelectorAll("[data-view-control]").forEach((item) => {
					item.setAttribute("aria-pressed", String(item === button));
				});
			});
		});

	pageButtons.forEach((button) => {
		button.addEventListener("click", () => {
			currentPage = Number(button.dataset.page) || 1;
			renderLoading();
		});
	});

	previous?.addEventListener("click", () => {
		currentPage = Math.max(1, currentPage - 1);
		renderLoading();
	});

	next?.addEventListener("click", () => {
		currentPage += 1;
		renderLoading();
	});

	render();
}

export function initArchiveFacets(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach(initArchiveFacetsRoot);
}
