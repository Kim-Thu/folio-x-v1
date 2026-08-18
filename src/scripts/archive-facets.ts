import { parseFacetData } from "@/scripts/facet-data";
import {
	buildUrlWithSearchParams,
	readCommaSeparatedParam,
	writeCommaSeparatedParam,
} from "@/utils/search-params";

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
	const reset = root.querySelector<HTMLButtonElement>("[data-filter-reset]");
	const facetInputs = Array.from(
		root.querySelectorAll<HTMLInputElement>("[data-facet-filter]"),
	);
	const facetSelects = Array.from(
		root.querySelectorAll<HTMLSelectElement>("[data-facet-select]"),
	);
	const navigationChoices = Array.from(
		root.querySelectorAll<HTMLElement>("[data-choice-link], [data-choice-filter]"),
	);
	const pageSize = Number(root.dataset.paginationPageSize) || cards.length || 1;
	let currentPage = 1;

	if (!cards.length || !collection) return;

	const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
	const isTaxonomyRoute = /\/(category|tag|technology)\/[^/]+$/.test(normalizedPath);

	const isChoiceActive = (choice: HTMLElement): boolean =>
		choice.matches("[data-choice-link]")
			? Boolean(choice.getAttribute("aria-current"))
			: choice.getAttribute("aria-pressed") === "true";

	const setChoiceActive = (choice: HTMLElement, active: boolean): void => {
		if (choice.matches("[data-choice-link]")) {
			if (active) choice.setAttribute("aria-current", "page");
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

		facetInputs
			.filter((control) => control.checked)
			.forEach((control) => {
				const key = control.dataset.facetKey;
				if (!key || control.value === "all") return;
				(selected[key] ??= []).push(control.value);
			});

		facetSelects.forEach((control) => {
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

	const syncLocation = (): void => {
		if (isTaxonomyRoute) return;

		const params = new URLSearchParams(window.location.search);
		const selected = selectedByKey();
		const keys = new Set<string>();

		facetInputs.forEach((control) => {
			if (control.dataset.facetKey) keys.add(control.dataset.facetKey);
		});
		facetSelects.forEach((control) => {
			if (control.dataset.facetKey) keys.add(control.dataset.facetKey);
		});
		navigationChoices.forEach((choice) => {
			if (choice.dataset.choiceControl) keys.add(choice.dataset.choiceControl);
		});

		keys.forEach((key) => {
			writeCommaSeparatedParam(params, key, selected[key] ?? []);
		});

		window.history.replaceState(
			{},
			"",
			buildUrlWithSearchParams(
				window.location.pathname,
				params,
				window.location.hash,
			),
		);
	};

	const syncFromLocation = (): void => {
		if (isTaxonomyRoute) return;

		const params = new URLSearchParams(window.location.search);

		facetInputs.forEach((control) => {
			const key = control.dataset.facetKey;
			if (!key) return;
			const values = readCommaSeparatedParam(params, key);
			control.checked = control.value === "all"
				? values.length === 0
				: values.includes(control.value);
		});

		facetSelects.forEach((control) => {
			const key = control.dataset.facetKey;
			if (!key) return;
			const values = readCommaSeparatedParam(params, key);
			control.value = values[0] ?? "all";
		});

		const controls = new Set(
			navigationChoices
				.map((choice) => choice.dataset.choiceControl)
				.filter((control): control is string => Boolean(control)),
		);
		controls.forEach((control) => {
			const values = readCommaSeparatedParam(params, control);
			choicesForControl(control).forEach((choice) => {
				const value = choice.dataset.choiceValue;
				setChoiceActive(
					choice,
					value === "all" ? values.length === 0 : Boolean(value && values.includes(value)),
				);
			});
		});
	};

	const rewriteRootNavigationHrefs = (): void => {
		if (isTaxonomyRoute) return;

		navigationChoices.forEach((choice) => {
			if (!(choice instanceof HTMLAnchorElement)) return;
			const control = choice.dataset.choiceControl;
			const value = choice.dataset.choiceValue;
			if (!control || !value) return;

			const params = new URLSearchParams(window.location.search);
			if (value === "all") params.delete(control);
			else params.set(control, value);
			choice.href = buildUrlWithSearchParams(window.location.pathname, params);
		});
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

	const resetAndRender = (syncUrl = true): void => {
		currentPage = 1;
		if (syncUrl) syncLocation();
		render();
	};

	facetInputs.forEach((control) => {
		control.addEventListener("change", () => resetAndRender());
	});

	facetSelects.forEach((control) => {
		control.addEventListener("change", () => resetAndRender());
	});

	sort?.addEventListener("change", () => resetAndRender(false));
	search?.addEventListener("input", () => resetAndRender(false));

	navigationChoices.forEach((choice) => {
		choice.addEventListener("click", (event) => {
			if (isTaxonomyRoute && choice instanceof HTMLAnchorElement) return;

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

			rewriteRootNavigationHrefs();
			resetAndRender();
		});
	});

	reset?.addEventListener("click", () => {
		facetInputs.forEach((control) => {
			control.checked = control.value === "all";
		});

		facetSelects.forEach((control) => {
			if (Array.from(control.options).some((option) => option.value === "all")) {
				control.value = "all";
			}
		});

		navigationChoices.forEach((choice) => {
			setChoiceActive(choice, choice.dataset.choiceValue === "all");
		});

		if (search) search.value = "";
		rewriteRootNavigationHrefs();
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

	window.addEventListener("popstate", () => {
		syncFromLocation();
		rewriteRootNavigationHrefs();
		resetAndRender(false);
	});

	syncFromLocation();
	rewriteRootNavigationHrefs();
	render();
}

export function initArchiveFacets(scope: ParentNode = document): void {
	scope
		.querySelectorAll<HTMLElement>('[data-filter-mode="faceted"]')
		.forEach(initArchiveFacetsRoot);
}
